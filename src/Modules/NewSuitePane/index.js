import React, { Component } from 'react';
import database from '../../database';
import jenkins from '../../jenkins'
import SuiteFeatures from './SuiteFeaturesPane'
//import { hashHistory } from 'react-router'


class NewSuitePane extends Component {

    constructor (props) {
        super(props);

        this.state = {
            features: null,
            environment: 'release',
            branch: 'master',
            selectedFeatures: []
        };

        this.renderTextFields=this.renderTextFields.bind(this);
        this.onFilledBranch=this.onFilledBranch.bind(this);
        this.onFilledEnvironment=this.onFilledEnvironment.bind(this);
        this.onSelectedFeatures=this.onSelectedFeatures.bind(this);
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
        const response = jenkins.send({
            features: this.state.selectedFeatures.join(),
            environment: this.state.environment,
            branch: this.state.branch
        });
        console.log(response);
    }

    renderTextFields () {
        return (
            <div>
                <label id='branch'>{'Branch: '}</label>
                <input
                    label={'#branch'}
                    type="text"
                    value={this.state.branch}
                    onChange={this.onFilledBranch}
                />

                <label id='environment'>{'Environment: '}</label>
                <input
                    label={'#environment'}
                    type="text"
                    value={this.state.environment}
                    onChange={this.onFilledEnvironment}
                />
            </div>
        )
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
                            <pre>
                                {this.renderTextFields()}
                                <SuiteFeatures features={this.state.features} onSelectedFeatures={this.onSelectedFeatures}/>
                                <button className="send" onClick={this.onSend}>Send</button>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default NewSuitePane;
