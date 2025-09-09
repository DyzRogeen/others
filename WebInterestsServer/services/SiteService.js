import {pool} from "../config/DbConfig.js"
import { ActivityService } from "./ActivityService.js";
import { AlerteService } from "./AlerteService.js";

export class SiteService {

    static async getAll() {
        return await pool.query("SELECT * FROM site");
    }

    static async getSitesByUserId(user_id) {
        const [sites] = await pool.query("SELECT * FROM site WHERE user_id = ? ORDER BY time_spent DESC", [user_id]);
        for (let site of sites) {
            if (site.alerte_id) site.alerte = await AlerteService.getAlerteById(site.alerte_id);
        }
        return sites;
    }

    static async createSite(site) {
        const date = new Date().toISOString().split('.')[0].replace("T", " ");
        const query = "INSERT INTO site (domain_name, domain_ip, times_visited, time_spent, last_time_visited, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        await pool.query(query, [site.domain_name, site.domain_ip, 1, 0, date, site.user_id]);
    }

    static async updateSite(site_id) {
        const date = new Date().toISOString().split('.')[0].replace("T", " ");
        const query = "UPDATE site SET times_visited = times_visited + 1, last_time_visited = ? WHERE site_id = ?";
        await pool.query(query, [date, site_id]);
    }

    static async updateTimeSpent(user_id, domain_name, time_spent) {
        const date = new Date().toISOString().split('.')[0].replace("T", " ");
        const query = "UPDATE site SET time_spent = time_spent + ?, last_time_visited = ? WHERE user_id = ? AND domain_name = ?";
        await pool.query(query, [time_spent, date, user_id, domain_name]);

        const [site] = await pool.query("SELECT site_id FROM site WHERE domain_name = ?", [domain_name]);
        await ActivityService.createOrUpdateActivity(site[0].site_id, time_spent);
        await AlerteService.updateTimeSpent(site[0].site_id, time_spent);
    }

}