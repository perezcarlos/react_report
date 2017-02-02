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
    }

    componentDidMount() {
        database.ref(`/${this.props.params.selectedSuite}/${this.props.params.selectedBuild}/executions`).on('value', (snapshot) => {
            this.setState ({
                suite: snapshot.val() || {}
            });
        });

        database.ref(`/${this.props.params.selectedSuite}/${this.props.params.selectedBuild}/additional_info`).once('value', (snapshot) => {
            this.setState ({
                additional_info: snapshot.val() || {}
            });
        });
    }

    onFilterChange(value) {
        this.setState ({
            filter: value
        }, () => {
            const path = `${this.props.location.pathname}?filter=${value}`;
            hashHistory.push(path);
        })
    }

    render() {
        if (this.state.suite) {
            console.log(this.state.suite);
            return (
                <SuitePane
                    suite={{suite: this.state.suite}}
                    additionalInfo={this.state.additional_info}
                    onFilterChange={this.onFilterChange}
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
