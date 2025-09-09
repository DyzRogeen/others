import {UserService} from "./services/UserService.js";
import {SiteService} from "./services/SiteService.js";

import {Site} from "./objects/site.js"
import {Alerte} from "./objects/alerte.js"

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import https from "https";
import fs from "fs";
import { AlerteService } from "./services/AlerteService.js";
import { ActivityService } from "./services/ActivityService.js";

const app = express();
app.use(cors());
app.use(express.json());

// DataBase Setup
const db = mysql.createConnection({
    host: "localhost",
    user: "db_user",
    password: "OzKeTn!6",
    database: "web_interests_db"
});

db.connect(err => {
    if (err) console.log("Database Connection ERROR : ", err);
    else console.log("Connected to Database.\n");
})

// EndPoint Setup
app.get("/", (req, res) => {
    res.send("API ON.");
});

const options = {
  key: fs.readFileSync("./certs/web-interests-key.pem"),
  cert: fs.readFileSync("./certs/web-interests-cert.pem")
};

https.createServer(options, app).listen(3001, () => {
  console.log("Serveur HTTPS sur https://localhost:3001");
});

// API REST

// USER
app.get("/users", async (rq, rs) => {

    console.log("\nSTART getAll USERS");
    try {
        const res = await UserService.getAll()
        console.log(res[0]);
        rs.json(res[0]);
    } catch(err) {
        console.log("ERR : ", err);
        return rs.status(500).json({ error: err.message });
    }
});

app.post("/users", async (rq, rs) => {
    const {googleId, name} = rq.body

    console.log("\nStart POST USER ", name);

    let user = null;
    
    try {
        user = await UserService.getUserByGoogleId(googleId);
    } catch(err) {
        return rs.status(500).json({ error: err.message });
    }

    if (user) return rs.status(201).json({id : user.user_id});

    // If user doesn't exist, a new one is created
    db.query("INSERT INTO user (google_id, name) VALUES (?, ?)", [googleId, name], (err, res) => {
        if (err) return rs.status(500).json({ error: err.message });
        rs.json({id: res.insertId});
    });
});

// SITE
app.get("/sites/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    console.log("\nStart Site GET for ", user_id);

    const result = await SiteService.getSitesByUserId(user_id);
    res.json(result);
});

app.post("/sites", async (req, res) => {
    console.log("\nStart Site POST");

    const site = new Site(req.body);

    const sites = await SiteService.getSitesByUserId(site.user_id);

    let site_id;
    for (let s of sites) {
        if (s.domain_name === site.domain_name) {
            site_id = s.site_id;
            break;
        }
    }

    if (site_id !== undefined) {
        console.log("Updating site ", site.domain_name);
        await SiteService.updateSite(site_id); 
    } else {
        console.log("Creating site ", site.domain_name);
        await SiteService.createSite(site);
    }
});

app.post("/sites/updateStats/:user_id", async (req, res) => {
    console.log("\nStart UpdateStats");

    const user_id = req.params.user_id;

    console.log(user_id, req.body);

    for (const [key, value] of Object.entries(req.body)) {
        await SiteService.updateTimeSpent(user_id, key, Math.round(value));
    }

    res.status(200).json({});
});

app.post("/alertes", async (req, res) => {
    console.log("\nStart POST Alerte");

    let alerte = new Alerte(req.body);

    alerte = await AlerteService.createAlerte(alerte);

    res.status(200).json(alerte);
})

app.get("/activities/:site_id", async (req, res) => {
    const site_id = req.params.site_id;

    console.log("\nStart Activities GET for", site_id);

    res.json(await ActivityService.getActivitiesBySiteId(site_id));
});