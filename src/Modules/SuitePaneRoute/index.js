import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import SuitePane from './SuitePane/index';
import database from '../../database';
import loading from '../../Images/loading.gif'


class SuitePaneRoute extends Component {
    constructor(props){
        super(props);

        this.state = {
            suite: null,
            additional_info: null,
            filter: this.props.location.query.filter
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
            const path = `${this.props.location.pathname}?filter=${value}`;
            hashHistory.push(path);
        })
    }

    getBuildData() {
        database.ref(`/${this.props.params.selectedSuite}/${this.props.params.selectedBuild}/`).on('value', (snapshot) => {
            this.setState ({
                suite: snapshot.val().executions || {},
                additional_info: snapshot.val().additional_info
            });
        });
    }

    onValidate(value) {
        const status = value.validated ? 'warning' : 'failed';
        database.ref(`/${this.props.params.selectedSuite}/${this.props.params.selectedBuild}/executions/${value.specName}`).update({
            validated: value.validated,
            status: status
        })
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
