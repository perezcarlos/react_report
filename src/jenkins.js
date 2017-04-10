import jsonp from 'jsonp'

var Jenkins = class {
    constructor(jobName = null) {
        this.jobName = jobName || 'caper';
    }

    send = function(params, callback) {
        const host = `https://server2.qa.redbooth.com:8446/job/${this.jobName}/buildWithParameters?`;
        const parameters = `branch=${params.branch}&environment=${params.environment}&features=${params.features}`;

        jsonp(`${host}${parameters}`, callback)
    }
};

export default new Jenkins();
