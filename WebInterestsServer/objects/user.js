export class User {

    constructor(data) {
        this.user_id = data.user_id;
        this.name = data.name;
        this.googleId = data.google_id;
        this.nbPageVisited = data.page_visited;
    }

}