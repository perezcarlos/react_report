import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import SuitePane from './SuitePane/index';
import database from '../../database';
import jenkins from '../../jenkins';


class SuitePaneRoute extends Component {
    constructor(props){
        super(props);

        const fullFilter = this.props.location.query.filter ? this.props.location.query.filter.split("-") : [null, null];
        const filter = {
            filter: fullFilter[0] || 'status',
            subFilter: fullFilter[1] || 'all'
        };

        this.state = {
            suite: null,
            jenkinsBuildInfo: null,
            selectedSpec: null,
            waitForTime: 1000,
            additional_info: null,
            filter: filter
        };
        this.onFilterChange = this.onFilterChange.bind(this);
        this.getBuildData = this.getBuildData.bind(this);
        this.getJenkinsBuildData = this.getJenkinsBuildData.bind(this);
        this.onValidate = this.onValidate.bind(this);
        this.onSelectedSpec = this.onSelectedSpec.bind(this);
        this.getSelectedSpecByName = this.getSelectedSpecByName.bind(this);
    }

    componentDidMount() {
        this.getBuildData()
    }

    componentDidUpdate(prevProps) {
        const prevSelectedSuite = prevProps.params.selectedSuite;
        const prevSelectedBuild = prevProps.params.selectedBuild;

        const newSelectedSuite = this.props.params.selectedSuite;
        const newSelectedBuild = this.props.params.selectedBuild;

        if (prevSelectedSuite !== newSelectedSuite || prevSelectedBuild !== newSelectedBuild) {
            this.getBuildData()
        }
    }

    onFilterChange(value) {
        this.setState ({
            filter: value
        }, () => {
            const path = `${this.props.location.pathname}?filter=${value.filter}-${value.subFilter}`;
            hashHistory.push(path);
        })
    }

    getBuildData() {
        database.ref(`builds/${this.props.params.selectedSuite.replace(/[-\s]/g, "_").toLowerCase()}_${this.props.params.selectedBuild}/`).on('value', (snapshot) => {
            this.setState ({
                suite: snapshot.val() ? snapshot.val().executions : {},
                additional_info: snapshot.val() ? snapshot.val().additional_info : {},
                selectedSpec: this.state.selectedSpec ? this.getSelectedSpecByName(this.state.selectedSpec.name) : null
            }, this.getJenkinsBuildData());
        });
    }

    getSelectedSpecByName(specName) {
        var spec = null;
        database.ref(`builds/${this.props.params.selectedSuite}_${this.props.params.selectedBuild}/executions/${specName}`).once('value', (snapshot) => {
            spec = snapshot.val()
        });
        return spec
    }

    getJenkinsBuildData() {
        const retryIfEmpty = function () {
            if (this.state.waitForTime > 20000) {
                return null
            }
            this.setState({waitForTime: (this.state.waitForTime * 2) }, () => {
                setTimeout(this.getJenkinsBuildData, this.state.waitForTime);
            });
        };

        const { selectedSuite, selectedBuild } = this.props.params;

        jenkins.getBuildData(selectedSuite, selectedBuild, (response, error) => {
            if (response) {
                this.setState({jenkinsBuildInfo: {data: response.data}})
            }
            else if (error && error.response && error.response.data && error.response.data.error) {
                this.setState({jenkinsBuildInfo: {error: error.response.data.error}}, retryIfEmpty)
            } else {
                this.setState({jenkinsBuildInfo: {error: error}}, retryIfEmpty)
            }
        });
    }


    onValidate(value) {
        var spec_found = null;

        database.ref(`builds/${this.props.params.selectedSuite}_${this.props.params.selectedBuild}/executions/${value.specName}`).once('value', (snapshot) => {
            spec_found = snapshot.val();
        });

        if (spec_found) {
            const status = value.validated ? 'warning' : 'failed';
            database.ref(`builds/${this.props.params.selectedSuite}_${this.props.params.selectedBuild}/executions/${value.specName}`).update({
                validated: value.validated,
                status: status
            })
        }
        else {
            return null
        }
    }

    onSelectedSpec (selectedSpec) {
        this.setState({
            selectedSpec: selectedSpec
        })
    }

    render() {
        return (
            <SuitePane
                suite={this.state.suite}
                additionalInfo={this.state.additional_info}
                locationParams={this.props.params}
                onFilterChange={this.onFilterChange}
                onValidate={this.onValidate}
                jenkinsInfo={this.state.jenkinsBuildInfo}
                filter={this.state.filter}
                selectedSpec={this.state.selectedSpec}
                onSelectedSpec={this.onSelectedSpec}
            />
        )
    }
}

export default SuitePaneRoute;
