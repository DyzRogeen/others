import {pool} from "../config/DbConfig.js"

export class AlerteService {

    static async getAlerteById(alerte_id) {
        const [res] = await pool.query("SELECT * FROM alerte WHERE alerte_id = ?", [alerte_id]);
        return res;
    }

    static async createAlerte(alerte) {
        let query;
        let res;
        if (alerte.renew) {
            query = "INSERT INTO alerte (site_id, credit, renew, renew_frequency, block) VALUES (?, ?, ?, ?, ?)";
            [res] = await pool.query(query, [alerte.site_id, alerte.credit, true, alerte.renew_freq, alerte.block]);
            updateSiteAlerteId(alerte.site_id, res.insertId)
        } else {
            query = "INSERT INTO alerte (site_id, credit, block) VALUES (?, ?, ?)";
            [res] = await pool.query(query, [alerte.site_id, alerte.credit, alerte.block]);
            updateSiteAlerteId(alerte.site_id, res.insertId);
        }
        return alerte;
    }

    static async updateTimeSpent(site_id, time_spent) {
        if (!site_id) return;
        const query = "UPDATE alerte SET time_spent = time_spent + ? WHERE site_id = ?";
        await pool.query(query, [time_spent, site_id]);
    }

}

function updateSiteAlerteId(site_id, alerte_id) {
    const query = "UPDATE site SET alerte_id = ? WHERE site_id = ?";
    pool.query(query, [alerte_id, site_id]);
}