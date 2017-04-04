import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import SuitePane from './SuitePane/index';
import database from '../../database';
import loading from '../../Images/loading.gif'


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
            additional_info: null,
            filter: filter
        };
        this.onFilterChange = this.onFilterChange.bind(this);
        this.getBuildData = this.getBuildData.bind(this);
        this.onValidate = this.onValidate.bind(this);
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
        database.ref(`builds/${this.props.params.selectedSuite}_${this.props.params.selectedBuild}/`).on('value', (snapshot) => {
            this.setState ({
                suite: snapshot.val() ? snapshot.val().executions : {},
                additional_info: snapshot.val() ? snapshot.val().additional_info : {}
            });
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

    render() {
        if (this.state.suite) {
            return (
                <SuitePane
                    suite={{suite: this.state.suite}}
                    additionalInfo={this.state.additional_info}
                    onFilterChange={this.onFilterChange}
                    onValidate={this.onValidate}
                    filter={this.state.filter}
                />
            )
        }
        else{
            return(
                <div className="no-suites-found">
                    <img src={loading} alt=""/>
                    <h1>Looking for build</h1>
                </div>
            )
        }
    }
};

export default SuitePaneRoute;
