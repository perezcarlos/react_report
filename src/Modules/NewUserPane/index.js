import React, { Component } from 'react';
import UserPane from './UserFieldsPane/index';
import OrganizationPane from './OrganizationFieldsPane/index';
import SubscriptionPane from './SubscriptionFieldsPane/index';
import Siringa from '../../siringa'


class NewUserPane extends Component {

    constructor (props) {
        super(props);

        this.state = {
            userData: {},
            subscriptionData: {},
            organizationData: {},
            environment: 'release',
            buttonText: 'Create',
            isAvailable: true
        };

        this.renderTextFields=this.renderTextFields.bind(this);
        this.onEnvironmentFilled=this.onEnvironmentFilled.bind(this);
        this.onUserFilled=this.onUserFilled.bind(this);
        this.onOrganizationFilled=this.onOrganizationFilled.bind(this);
        this.onSubscriptionFilled=this.onSubscriptionFilled.bind(this);
        this.isButtonEnabled=this.isButtonEnabled.bind(this);
        this.onSend=this.onSend.bind(this);
        this.responseHandle=this.responseHandle.bind(this);
    }


    onEnvironmentFilled (event) {
        this.setState (
            {
                environment: event.currentTarget.value
            }
        )
    }

    onSubscriptionFilled (subscriptionData) {
        this.setState (
            {
                subscriptionData: subscriptionData
            }
        )
    }

    onOrganizationFilled (organizationData) {
        this.setState (
            {
                organizationData: organizationData
            }
        )
    }

    onUserFilled (userData) {
        this.setState({
            userData: userData
        })
    }

    onSend () {
        this.setState({
            buttonText: 'Creating',
            isAvailable: false
        });

        Siringa.create_user( this.state, (response, error) => {
            this.responseHandle(response, error)
        });
    }

    responseHandle (response, error) {
        if (error) {
            this.setState({
                buttonText: 'Error',
                isAvailable: false
            }, () => {
                if(error.response.data.error) {
                    console.error(error.response.data.error);
                } else {
                    console.error(error);
                }
            });
        } else {
            this.setState({
                buttonText: 'Created',
                isAvailable: false
            });
        }

        setTimeout( () => {
            this.setState({
                buttonText: 'Create',
                isAvailable: true
            });
        }, 5000);
    }

    renderTextFields () {
        return (
            <div>
                <div className="environment">
                    <label >{`Environment: `}</label>
                    <input className="environment-input"
                           value={this.state.environment}
                           onChange={this.onEnvironmentFilled}
                           type="textField"
                           {...{disabled: !this.state.isAvailable}}
                    />
                </div>
                <div className="new-user-fields">
                    <UserPane onFilled={this.onUserFilled} isAvailable={this.state.isAvailable}/>
                    <OrganizationPane onFilled={this.onOrganizationFilled} isAvailable={this.state.isAvailable}/>
                    <SubscriptionPane onFilled={this.onSubscriptionFilled} isAvailable={this.state.isAvailable}/>
                </div>
            </div>
        )
    }

    isButtonEnabled (){
        const empty = JSON.stringify(this.state).includes(':""');

        if (empty || !this.state.isAvailable) {
            return {
                disabled: true
            }
        } else {
            return {
                disabled: false
            }
        }
    }

    render () {
        return (
            <div className="suite-pane col-md-12">
                <div className="no-suite-loaded panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <h1>Create new user</h1>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="create-new-user">
                            <div>
                                {this.renderTextFields()}
                                <button
                                    className="sendButton btn btn-default"
                                    {...this.isButtonEnabled()}
                                    onClick={this.onSend}
                                >
                                    {this.state.buttonText}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default NewUserPane;
