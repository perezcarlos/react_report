import React, { Component } from 'react';
import _ from 'lodash'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class SuiteSelectorPane extends Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedSuite: this.props.buildSelection.selectedSuite || '',
            selectedBuild: this.props.buildSelection.selectedBuild || ''
        };

        this.renderSuites=this.renderSuites.bind(this);
        this.renderBuilds=this.renderBuilds.bind(this);
        this.onSelectSuite=this.onSelectSuite.bind(this);
        this.onSelectBuild=this.onSelectBuild.bind(this);
        this.suiteOptionClass=this.suiteOptionClass.bind(this);
        this.buildOptionClass=this.buildOptionClass.bind(this);
    }

    componentDidUpdate (prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                selectedSuite: this.props.buildSelection.selectedSuite || '',
                selectedBuild: this.props.buildSelection.selectedBuild || ''
            })
        }
    }

    render () {
        const suite = this.props.suites[this.state.selectedSuite.replace(/[-\s]/g, "_").toLowerCase()] || {};
        const executions = suite || {};
        return (
            <div className="selectors">
                <Panel header="Select a suite">
                    {this.renderSuites(this.props.suites)}
                </Panel>

                <Panel header="Select a build">
                    {this.renderBuilds(executions)}
                </Panel>
            </div>
        )
    }

    onSelectSuite (event) {
        this.setState({selectedSuite: event.currentTarget.value, selectedBuild: ''})
    }

    onSelectBuild (event) {
        this.setState({selectedBuild: event.currentTarget.value}, () => {
            this.props.onSelect(this.state)
        })
    }

    suiteOptionClass(option) {
        if(this.state.selectedSuite === option ){
            return (`suite-selector-option ${option} active`)
        }else {
            return(`suite-selector-option ${option}`)
        }
    }

    buildOptionClass(option) {
        if(this.state.selectedBuild === option ){
            return (`build-selector-option ${option} active`)
        }else {
            return(`build-selector-option ${option}`)
        }
    }

    renderSuites (suites) {
        return (
            <ListGroup className="suite-selector">
                {
                    Object.keys(suites).map((key, index)=>{
                        return(
                            <ListGroupItem
                                className={this.suiteOptionClass(suites[key].job_name || key)}
                                key={index}
                                value={suites[key].job_name || key}
                                onClick={this.onSelectSuite}
                            >
                                {key.replace(/[_-]/g, " ")}
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        )
    }

    renderBuilds (suite) {
        if (!suite.builds) {
            return (
                <ListGroupItem disabled className="active">
                    <h5 className="list-group-item-heading">First select a suite</h5>
                </ListGroupItem>
            )
        }
        return(
            <ListGroup className="build-selector">
                {
                    Object.keys(suite.builds).reverse().map((key) => {
                        var option_string = '';
                        const date = new Date(suite.builds[key].date);
                        if (suite.builds[key].environment) {
                            const environment = suite.builds[key].environment.split('.staging')[0].split('//')[1] || '';
                            option_string = `${key} => ${environment}`
                        }
                        else {
                            option_string = key
                        }
                        return (
                            <ListGroupItem
                                key={key}
                                value={key}
                                onClick={this.onSelectBuild}
                                className={this.buildOptionClass(key)}
                            >
                                <b className="list-group-item-heading">{option_string}</b>
                                <p className="list-group-item-text">{`date: ${date}`}</p>
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        )
    }
}

export default SuiteSelectorPane;
