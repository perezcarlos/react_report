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
        this.suiteOptionClass=this.suiteOptionClass.bind(this);
        this.buildOptionClass=this.buildOptionClass.bind(this);
    }

    render () {
        const suite = this.props.suites[this.state.selectedSuite] || {};
        const executions = suite || {};
        return (
            <div className="selectors">
                <p className="h3">Select a suite: </p>
                {this.renderSuites(Object.keys(this.props.suites))}

                <p className="h3">Select a build: </p>
                {this.renderBuilds(executions)}
            </div>
        )
    }

    onSelectSuite (event) {
        this.setState({selectedSuite: event.target.value, selectedBuild: ''})
    }

    onSelectBuild (event) {
        this.setState({selectedBuild: event.target.value}, () => {
            this.props.onSelect({selectedSuite: this.state.selectedSuite, selectedBuild: this.state.selectedBuild})
        })
    }

    suiteOptionClass(option) {
        if(this.state.selectedSuite === option ){
            return (`suite-selector option ${option} selected`)
        }else {
            return(`suite-selector option ${option}`)
        }
    }

    buildOptionClass(option) {
        if(this.state.selectedBuild === option ){
            return (`suite-selector option ${option} selected`)
        }else {
            return(`suite-selector option ${option}`)
        }
    }

    renderSuites (suites) {
        return (
            <div className="suite-selector">
                {
                    suites.map((suiteName, index)=>{
                        return(
                            <button
                                className={this.suiteOptionClass(suiteName)}
                                key={index}
                                value={suiteName}
                                onClick={this.onSelectSuite}
                            >
                                {suiteName}
                            </button>
                        )
                    })
                }
            </div>
        )
    }

    renderBuilds (suite) {
        if (!suite.builds) {
            return (
                <button disabled={true}>
                    First select a suite
                </button>
            )
        }
        return(
            <div className="build-selector">
                {
                    Object.keys(suite.builds).reverse().map((key) => {
                        var option_string = '';
                        if (suite.builds[key].environment) {
                            const environment = suite.builds[key].environment.split('.staging')[0].split('//')[1] || '';
                            option_string = `${key} => ${environment}`
                        }
                        else {
                            option_string = key
                        }
                        return (
                            <button key={key} value={key} onClick={this.onSelectBuild}>
                                {option_string}
                            </button>
                        )
                    })
                }
            </div>
        )
    }
}

export default SuiteSelectorPane;
