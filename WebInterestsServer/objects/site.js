export class Site {

    constructor(data) {
        this.site_id = data.site_id;
        this.domain_name = data.domain_name;
        this.domain_ip = data.domain_ip;
        this.times_visited = data.times_visited;
        this.time_spent = data.time_spent;
        this.user_id = data.user_id;
        this.last_time_visited = data.last_time_visited;
    }

}