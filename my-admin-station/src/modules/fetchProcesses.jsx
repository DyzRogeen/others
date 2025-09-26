import {useState, useEffect} from 'react';
import axios from "axios";

function useFetchProcesses(url, interval = 7000) {
    const [processes, setProcesses] = useState([]);

    useEffect(() => {

        const fetchData = () => {
            axios.get(url)
            .then((res) => (setProcesses(res.data)))
        }

        fetchData();

        const id = setInterval(fetchData, interval);

        return () => {clearInterval(id);}

    }, [url, interval]);

    return processes;
}
export default useFetchProcesses