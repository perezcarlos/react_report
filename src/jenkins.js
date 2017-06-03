const axios = require('axios');

var Jenkins = class {
    constructor() {
        this.defaultJobName = 'qa-test-job';
    }

    constructJobName = function (params) {
        const jobName = params.jobName || params.suite || this.defaultJobName;

        return jobName
    };

    constructParameters = function (params) {
        var environment = '';
        if (params.environment.includes('.staging')) {

            environment = params.environment.split('.staging')[0].split('//')[1] || ''

        } else {
            environment = params.environment
        }

        var parameters = {
            environment: environment,
            branch: params.branch
        };

        if (params.features) {
            parameters = Object.assign({}, parameters, {features: params.features});
        } else if (params.features_list) {
            parameters = Object.assign({}, parameters, {features: params.features_list.join()});
        }

        if (params.failedSpecs){
            parameters = Object.assign({}, parameters, {FAILED_SPECS: params.failedSpecs.join()});
        }

        return parameters
    };

    launch = function(params, callback) {
        const usedJobName = this.constructJobName(params);
        const parameters = this.constructParameters(params);

        axios({
            url: `/jenkins/job/${usedJobName}/buildWithParameters`,
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            params: parameters
        })
            .then(() => {
                this.getSuiteData(usedJobName, (response, error) => {
                    callback(
                        {
                            suiteData: response.data,
                            suiteName: usedJobName,
                            nextBuildId: response.data.nextBuildNumber
                        },
                        error
                    )
                })

            })
            .catch(function(error){
                callback(null, error)
            });
    };

    getSuiteData = function(suiteName, callback) {
        axios({
            url: `/jenkins/job/${suiteName}/api/json`,
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(function(response){
                callback(response, null)
            })
            .catch(function(error){
                callback(null, error)
            });
    };

    getBuildData = function(suiteName, buildNumber, callback) {
        axios({
            url: `/jenkins/job/${suiteName}/${buildNumber}/api/json`,
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(function(response){
                callback(response, null)
            })
            .catch(function(error){
                callback(null, error)
            });
    }
};

export default new Jenkins();
