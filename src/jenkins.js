import jsonp from 'jsonp'

var Jenkins = class {
    constructor(jobName = null) {
        this.defaultJobName = 'qa-test-job';
    }

    launchByFeatures = function(params, callback) {
        const host = `https://server2.qa.redbooth.com:8446/job/${this.defaultJobName}/buildWithParameters?`;
        const parameters = `branch=${params.branch}&environment=${params.environment}&features=${params.features}`;

        jsonp(`${host}${parameters}`, {timeout: 5000}, function (error, response) {
            callback(error, response)
        })
    };

    launchBySuite = function(params, callback) {
        const host = `https://server2.qa.redbooth.com:8446/job/${params.jobName}/buildWithParameters?`;
        const parameters = `branch=${params.branch}&environment=${params.environment}`;

        jsonp(`${host}${parameters}`, {timeout: 5000}, function (error, response) {
            callback(error, response)
        })
    };

    rebuild = function(params, callback) {
        const url = `https://server2.qa.redbooth.com:8446/job/${params.suite}/${params.build}/retry`;

        jsonp(`${url}`, {timeout: 5000}, function (error, response) {callback(error, response)})
    }
};

export default new Jenkins();
