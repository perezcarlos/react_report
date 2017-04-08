import credentials from './credentials.json';

var Jenkins = class {
    constructor() {
        this.jenkins_credentials = credentials.jenkins;
    }

    send = function(params) {
        const xhttp = new XMLHttpRequest();
        const parameters = `branch=${params.branch}&environment=${params.environment}&features=${params.features}`;
        const host = "https://server2.qa.redbooth.com:8446/job/caper/buildWithParameters?";

        xhttp.open("POST", `${host}${parameters}`, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Authorization", this.jenkins_credentials.authorization);
        xhttp.send();

        return JSON.parse(xhttp.responseText);
    }
};

export default new Jenkins;
