const axios = require('axios');

var Siringa = class {
    constructor(definition = null) {
        this.definition = definition || 'create_user_with_org';
    }

    create_user = function(params, callback) {
        const parameters = {
            siringa_args: {
                //user data
                first_name: params.userData.firstName,
                last_name: params.userData.lastName,
                login: params.userData.login,
                email: params.userData.email,
                password: 'papapa22',
                //Subscription data
                product: params.subscriptionData.product,
                state: params.subscriptionData.state,
                subscription_date: params.subscriptionData.date,
                zuora_susbcription_creation: params.subscriptionData.zuora,
                //Organization data
                org_name: params.organizationData.organizationName,
                enable_all_features: params.organizationData.enableFeatures
            }
        };

        axios({
            url: '/siringa/pb_create_user_with_subscription',
            method: 'post',
            headers: {
                'x-target-environment': params.environment,
                'Content-type': 'application/json'
            },
            data: parameters
        })
            .then(function(response){
                callback(response, null)
            })
            .catch(function(error){
                callback(null, error)
            });
    }
};

export default new Siringa();
