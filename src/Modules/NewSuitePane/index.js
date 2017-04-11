import React, { Component } from 'react';
import database from '../../database';
import jenkins from '../../jenkins'
import SuiteFeatures from './SuiteFeaturesPane'


class NewSuitePane extends Component {

    constructor (props) {
        super(props);

        this.state = {
            features: null,
            environment: 'release',
            branch: 'master',
            selectedFeatures: [],
            maxSelectedFeatures: 30
        };

        this.renderTextFields=this.renderTextFields.bind(this);
        this.onFilledBranch=this.onFilledBranch.bind(this);
        this.onFilledEnvironment=this.onFilledEnvironment.bind(this);
        this.onSelectedFeatures=this.onSelectedFeatures.bind(this);
        this.isButtonEnabled=this.isButtonEnabled.bind(this);
        this.onSend=this.onSend.bind(this);
    }

    componentDidMount () {
        database.ref('features').on('value', (snapshot) => {
            this.setState ({
                features: snapshot.val()
            });
        });
    }

    onFilledBranch (event) {
        this.setState (
            {
                branch: event.currentTarget.value
            }
        )
    }

    onFilledEnvironment (event) {
        this.setState (
            {
                environment: event.currentTarget.value
            }
        )
    }

    onSelectedFeatures (selectedFeatures) {
        this.setState({
            selectedFeatures: selectedFeatures
        })
    }

    onSend () {
        jenkins.send({
            features: this.state.selectedFeatures.join(),
            environment: this.state.environment,
            branch: this.state.branch
        }, (response) => {
            this.setState({
                selectedFeatures: []
            });
            alert('The suite has been launched look for it in "Qa Test Job" suite');
        });

    }

    renderTextFields () {
        return (
            <div className="text-fields">
                <div className="branch">
                    <label id='branch'>{'Branch: '}</label>
                    <input
                        label='#branch'
                        type="text"
                        value={this.state.branch}
                        onChange={this.onFilledBranch}
                    />
                </div>

                <div className="environment">
                    <label id='environment'>{'Environment: '}</label>
                    <input
                        label='#environment'
                        type="text"
                        value={this.state.environment}
                        onChange={this.onFilledEnvironment}
                    />
                </div>
            </div>
        )
    }

    isButtonEnabled (){
        if(!this.state.selectedFeatures.length > 0) {
            return{disabled: true}
        } else {
            return null
        }
    }

    render () {
        return (
            <div className="suite-pane col-md-12">
                <div className="no-suite-loaded panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <h1>Launch new suite</h1>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="launch-new-suite">
                            <div>
                                {this.renderTextFields()}
                                <SuiteFeatures
                                    features={this.state.features}
                                    onSelectedFeatures={this.onSelectedFeatures}
                                    maxSelectedFeatures={this.state.maxSelectedFeatures}
                                    selectedFeatures={this.state.selectedFeatures}
                                />
                                <button className="sendButton btn btn-default" {...this.isButtonEnabled()} onClick={this.onSend}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default NewSuitePane;
