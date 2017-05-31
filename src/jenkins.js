import jsonp from 'jsonp';
//import $ from 'jquery';

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
        const url = `https://server2.qa.redbooth.com:8446/job/${params.suite}`;
        var rebuild_url = '';

        if (params.features_list){
            const environment = params.environment.split('.staging')[0].split('//')[1] || '';
            const parameters = `branch=${params.branch}&environment=${environment}&features=${params.features_list.join()}`;
            rebuild_url = `${url}/buildWithParameters?${parameters}`
        } else {
            rebuild_url = `${url}/${params.build}/retry`;
        }

        jsonp(`${rebuild_url}`, {timeout: 5000}, function (error, response) {callback(error, response)})
    };

    rebuildFailed = function(params, callback) {
        const environment = params.environment.split('.staging')[0].split('//')[1] || '';

        const url = `https://server2.qa.redbooth.com:8446/job/${params.suite}`;
        const parameters = `branch=${params.branch}&environment=${environment}&FAILED_SPECS=${params.failedSpecs}`;
        const rebuild_url = `${url}/buildWithParameters?${parameters}`;

        jsonp(`${rebuild_url}`, {timeout: 5000}, function (error, response) {callback(error, response)})
    };
};

export default new Jenkins();
