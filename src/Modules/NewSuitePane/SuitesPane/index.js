import React, { Component } from 'react';


class SuitesPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suites:
                [
                    {name: 'run all jobs', jobName: 'run-all-jobs'},
                    {name: 'collaboration', jobName: 'collaboration'},
                    {name: 'communication', jobName: 'comms'},
                    {name: 'core', jobName: 'core'},
                    {name: 'emails', jobName: 'email_notifications'},
                    {name: 'integrations', jobName: 'integrations'},
                    {name: 'legacy features', jobName: 'legacy_specs'},
                    {name: 'trackless specs', jobName: 'out_of_tracks_specs'},
                    {name: 'salesforce & zuora', jobName: 'salesforce_zuora'}
                ]
        };
        this.onSelectedSuites=this.onSelectedSuites.bind(this);
        this.renderSuitesBox=this.renderSuitesBox.bind(this);
        this.buttonClass=this.buttonClass.bind(this);
        this.isSelected=this.isSelected.bind(this);
        this.isDisabled=this.isDisabled.bind(this);
        this.onFilter=this.onFilter.bind(this);
    }

    onSelectedSuites (event) {
        const position = this.props.selectedSuites.indexOf(event.currentTarget.value);

        if (!~position){
            this.props.selectedSuites.push(event.currentTarget.value)
        } else if (~position) {
            this.props.selectedSuites.splice(position, 1);
        }

        this.props.onSelectedSuites(this.props.selectedSuites);
    }

    isSelected (suite) {
        return (this.props.selectedSuites.some( (feat) => feat === suite ))
    }

    isDisabled (suite) {
        if (suite !== 'run-all-jobs' && this.isSelected('run-all-jobs')){
            return {
                disabled: true
            }
        } else if (suite === 'run-all-jobs' && JSON.stringify(this.props.selectedSuites) !== "[]" && !this.isSelected(suite) ) {
            return {
                disabled: true
            }
        } else {
            return {
                disabled: false
            }
        }
    }

    buttonClass (suite) {
        const base_class = `btn btn-default suite-select-option ${suite}`;
        if(this.isSelected(suite)) {
            return(
                `${base_class} selected`
            )
        } else {
            return(
                base_class
            )
        }
    }

    onFilter (event) {
        this.props.onFilter(event.currentTarget.value)
    }

    renderSuitesBox () {
        const filter = this.props.filter;
        const filterMatcher = new RegExp(`^${filter}| ${filter}`, 'g');

        return(
            this.state.suites.map((suite) => {
                if(this.props.filter === '') {
                    return (
                        <button
                            className={this.buttonClass(suite.jobName)}
                            key={suite.jobName}
                            value={suite.jobName}
                            onClick={this.onSelectedSuites}
                            {...this.isDisabled(suite.jobName)}
                        >
                            {suite.name}
                        </button>
                    )
                } else if (suite.name.match(filterMatcher)){
                    return (
                        <button
                            className={this.buttonClass(suite.jobName)}
                            key={suite.jobName}
                            value={suite.jobName}
                            onClick={this.onSelectedSuites}
                            {...this.isDisabled(suite.jobName)}
                        >
                            {suite.name}
                        </button>
                    )
                } else {
                    return null;
                }
            })
        )
    }

    render () {
        console.log(this.state.suites)
        if(!this.state.suites){
            return(
                <div className="suite-features-pane">
                    <p>No suites found check data</p>
                    <div className="features-selection no-suites-found">
                    </div>
                </div>
            )
        }
        return (
            <div className="suite-features-pane">
                <p>Select the suites you want to launch: </p>
                <input
                    className="features-filter"
                    type="text" placeholder="Search"
                    onChange={this.onFilter}
                    value={this.props.filter}
                />
                <div className="features-selection">
                    {this.renderSuitesBox()}
                </div>
            </div>
        )
    }
};

export default SuitesPane;
