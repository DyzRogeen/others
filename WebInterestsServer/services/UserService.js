import {pool} from "../config/DbConfig.js"

export class UserService {

    static async getAll() {
        return await pool.query("SELECT * FROM user");
    }

    static async getUserByGoogleId(googleId) {
        const [user] = await pool.query("SELECT * FROM user WHERE google_id = ?", [googleId]);
        return user[0];
    }
}