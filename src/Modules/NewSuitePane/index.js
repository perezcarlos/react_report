import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import database from '../../database';
import jenkins from '../../jenkins';
import SuiteFeatures from './SuiteFeaturesPane';
import TabSelector from './TabSelectorPane';
import Suites from './SuitesPane';


class NewSuitePane extends Component {

    constructor (props) {
        super(props);

        this.state = {
            features: null,
            environment: 'release',
            branch: 'master',
            selectedFeatures: [],
            selectedSuites: [],
            filter: '',
            maxSelectedFeatures: 30,
            selectedTab: 'features'
        };

        this.renderTextFields=this.renderTextFields.bind(this);
        this.onFilledBranch=this.onFilledBranch.bind(this);
        this.onFilledEnvironment=this.onFilledEnvironment.bind(this);
        this.onSelectedFeatures=this.onSelectedFeatures.bind(this);
        this.onSelectedSuites=this.onSelectedSuites.bind(this);
        this.onSelectTab=this.onSelectTab.bind(this);
        this.isButtonEnabled=this.isButtonEnabled.bind(this);
        this.onFilter=this.onFilter.bind(this);
        this.onSend=this.onSend.bind(this);
        this.responseHandle=this.responseHandle.bind(this);
        this.renderSelectedTab=this.renderSelectedTab.bind(this);
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

    onSelectedSuites (selectedSuites) {
        this.setState({
            selectedSuites: selectedSuites
        })
    }

    onFilter (filter){
        this.setState({
            filter: filter
        })
    }

    onSelectTab (tab){
        this.setState({
            selectedTab: tab
        })
    }

    renderSelectedTab () {
        if (this.state.selectedTab === 'features') {
            return (
                <SuiteFeatures
                    features={this.state.features}
                    onSelectedFeatures={this.onSelectedFeatures}
                    maxSelectedFeatures={this.state.maxSelectedFeatures}
                    selectedFeatures={this.state.selectedFeatures}
                    onFilter={this.onFilter}
                    filter={this.state.filter}
                />
            )
        } else {
            return (
                <Suites
                    onSelectedSuites={this.onSelectedSuites}
                    selectedSuites={this.state.selectedSuites}
                    onFilter={this.onFilter}
                    filter={this.state.filter}
                />
            )
        }
    }

    responseHandle (__, error) {
        if (error) {
                if(error.response.data.error) {
                    console.error(error.response.data.error);
                } else {
                    console.error(error);
                }
        } else {
            this.setState({
                selectedFeatures: [],
                selectedSuites: [],
                filter: ''
            });
        }
    }

    onSend () {
        if (this.state.selectedTab === 'features') {
            return (
                jenkins.launch({
                    features: this.state.selectedFeatures.join(),
                    environment: this.state.environment,
                    branch: this.state.branch
                }, (response, error) => {
                    this.setState({
                        selectedFeatures: [],
                        filter: ''
                    }, () => {
                        this.responseHandle(response, error);
                        const path = `suite/${response.suiteName}/build/${response.nextBuildId}`;
                        setTimeout(hashHistory.push(path), 5000);
                    });
                })
            )
        } else if (this.state.selectedTab === 'suites') {
            return (
                this.state.selectedSuites.map( (suite) => {
                    return (
                        jenkins.launch({
                            jobName: suite,
                            environment: this.state.environment,
                            branch: this.state.branch
                        }, (response, error) => {
                            this.setState({
                                selectedSuites: [],
                                filter: ''
                            }, this.responseHandle(response, error));

                            alert('The suites have been launched look for results in each selected suite');
                        })
                    )
                })
            )
        } else {
            return null;
        }
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
        if (this.state.selectedTab === 'features' && !this.state.selectedFeatures.length > 0) {
            return {disabled: true}
        } else if (this.state.selectedTab === 'suites' && !this.state.selectedSuites.length > 0) {
            return {disabled: true}
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
                                <div className={`selected-tab ${this.state.selectedTab}`}>
                                    <TabSelector
                                        selectedTab={this.state.selectedTab}
                                        onSelectTab={this.onSelectTab}
                                    />
                                    {this.renderSelectedTab()}
                                </div>
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
