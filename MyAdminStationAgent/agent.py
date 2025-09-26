import psutil
import threading
import time
import socket
from flask import Flask, jsonify
import platform
import psycopg2

URL_API = "http://localhost:5000/api/metrics/system"

app = Flask(__name__)

def collect_main_system_infos():
    metrics = {
        "hostname": socket.gethostname(),
        "os": platform.system(),
        "release": platform.release(),
        "version":  platform.version(),
        "architecture": platform.machine(),
        "processor": platform.processor(),
        "ram": psutil.virtual_memory().total
    }

    parts = []
    partitions = psutil.disk_partitions()
    for p in partitions:
        part = {}
        part["device"] = p.device
        part["mountpoint"] = p.mountpoint
        part["fs"] = p.fstype

        try:
            part_usg = psutil.disk_usage(p.mountpoint)
        except PermissionError:
            continue

        part["size"] = part_usg.total
        part["used"] = part_usg.used
        
        part_io = psutil.disk_io_counters()
        part["total_read"] = part_io.read_bytes
        part["total_write"] = part_io.write_bytes

        parts.append(part)

    metrics["partitions"] = parts

    return metrics

def collect_consumption_metrics():
    metrics = {
        "cpuUsage": psutil.cpu_percent(interval=1),
        "memoryUsage": psutil.virtual_memory().percent,
    }

    return metrics

def collect_process_infos(pid):
    p = psutil.Process(pid)

    process = {
        "pid": p.pid,
        "name": p.name(),
        "exe": p.exe(),
#        "cwd": p.cwd(),
        "cmd": p.cmdline(),
        "status": p.status(),
        "started": p.create_time(),
        "memory": p.memory_percent(),
        "cpu": p.cpu_percent(),
        "user": p.username()
    }

    parents = []
    for pp in p.parents():
        parents.append(collect_process_relative_infos(pp))

    children = []
    for pc in p.children():
        children.append(collect_process_relative_infos(pc))

    process["parents"] = parents
    process["children"] = children

    return process

def collect_process_relative_infos(p):
    if not isinstance(p, psutil.Process):
        return {}
    
    return {
            "pid": p.pid,
            "name": p.name(),
            "status": p.status(),
            "started": p.create_time()
        }

def collect_network_metrics():

    network = {}
    # Stats réseau
    net_io = psutil.net_io_counters(pernic=True)
    for interface, stats in net_io.items():
        network[interface] = {
            "bytes_sent": stats.bytes_sent,
            "bytes_recv": stats.bytes_recv
        }

    metrics = {
        "network": network
    }

    return metrics

def sendBatteryData():
    conn = psycopg2.connect(
        dbname="my-admin-station_db",
        user="db_user",
        password="OzKeTn!6",
        host="localhost",
        port=5432
    )
    
    battery = psutil.sensors_battery()


    cur = conn.cursor()
    cur.execute("DELETE FROM battery WHERE record_time < NOW() - INTERVAL '8 hours';")
    cur.execute("INSERT INTO battery (percents, charging) VALUES (%s, %s)", (battery.percent, battery.power_plugged))
    conn.commit()
    cur.close()
    conn.close()

    print(f"{battery} sent")


@app.route("/system", methods=["GET"])
def getMainSystemInfos():
    return jsonify(collect_main_system_infos())    

@app.route("/processes", methods=["GET"])
def getProcesses():
    return jsonify([p.info for p in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent'])]);

@app.route("/processes/metrics", methods=["GET"])
def getMetrics():
    return jsonify(collect_consumption_metrics())

@app.route("/processes/info/<pid>", methods=["GET"])
def infoProcess(pid):
    return jsonify(collect_process_infos(int(pid)))

@app.route("/processes/delete/<pid>", methods=["DELETE"])
def killProcess(pid):
    psutil.Process(int(pid)).terminate()
    return jsonify({})


def background_job():
    while True:
        sendBatteryData()
        time.sleep(120)    

if __name__ == "__main__":
    threading.Thread(target=background_job, daemon=True).start()
    app.run(host="0.0.0.0", port=5001)

    