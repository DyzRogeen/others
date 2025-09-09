export class Alerte {

    constructor(data) {
        this.alerte_id = data.alerte_id;
        this.site_id = data.site_id;
        this.credit = data.credit;
        this.time_spent = data.time_spent;
        this.renew = data.renew;
        this.renew_freq = data.renew_freq;
        this.block = data.block;
    }

}