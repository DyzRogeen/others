import {pool} from "../config/DbConfig.js"

export class ActivityService {

    static async getAll() {
        return await pool.query("SELECT * FROM activity");
    }

    static async getActivitiesBySiteId(site_id) {
        const [res] = await pool.query("SELECT * FROM activity WHERE site_id = ?", [site_id]);
        return res;
    }

    static async createOrUpdateActivity(site_id, time_spent) {
        const date = new Date().toISOString().split('T')[0];
        let query = "SELECT activity_id FROM activity where site_id = ? AND date = ?";
        let [activity_id] = await pool.query(query, [site_id, date]);

        if (activity_id.length === 0) {
            query = "INSERT INTO activity (site_id, time_spent) VALUES (?, ?)";
            await pool.query(query, [site_id, time_spent]);
        } else {
            query = "UPDATE activity SET time_spent = time_spent + ? WHERE activity_id = ?";
            await pool.query(query, [time_spent, activity_id[0].activity_id]);
        }
    }
}