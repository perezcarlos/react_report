import React, { Component } from 'react';

class SuiteSelectorPane extends Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedSuite: '',
            selectedBuild: ''
        };

        this.renderSuites=this.renderSuites.bind(this);
        this.renderBuilds=this.renderBuilds.bind(this);
        this.onSelectSuite=this.onSelectSuite.bind(this);
        this.onSelectBuild=this.onSelectBuild.bind(this);
    }

    render () {
        const suite = this.props.suites[this.state.selectedSuite] || {};
        const executions = suite || {};
        return (
            <div className="selectors">
                {this.renderSuites(Object.keys(this.props.suites))}
                {this.renderBuilds(executions)}
            </div>
        )
    }

    onSelectSuite (event){
        this.setState({selectedSuite: event.target.value, selectedBuild: ''})
    }

    onSelectBuild (event){
        this.setState({selectedBuild: event.target.value}, () => {
            this.props.onSelect({selectedSuite: this.state.selectedSuite, selectedBuild: this.state.selectedBuild})
        })
    }

    renderSuites (suites) {
        return (
            <select defaultValue={-1} onChange={this.onSelectSuite}>
                <option disabled={true} value={-1}> -- select a suite -- </option>
                {
                    suites.map((suiteName, index)=>{
                        return(
                            <option key={index} name={suiteName}>
                                {suiteName}
                            </option>
                        )
                    })
                }
            </select>
        )
    }

    renderBuilds (suites) {
        if (!suites) {
            return (
                <select disabled={true}>
                </select>
            )
        }
        return(
            <select value={this.state.selectedBuild} onChange={this.onSelectBuild}>
                <option disabled={true} value={-1}> -- select a build --</option>
                {
                    Object.keys(suites).reverse().map((key) => {
                        var option_string = '';
                        if (suites[key].additional_info.environment) {
                            const environment = suites[key].additional_info.environment.split('.staging')[0].split('//')[1] || '';
                            option_string = `${key} => ${environment}`
                        }
                        else {
                            option_string = key
                        }
                        return (
                            <option key={key} name={key} value={key}>
                                {option_string}
                            </option>
                        )
                    })
                }
            )
            </select>
        )
    }
}

export default SuiteSelectorPane;