import React, { Component } from 'react';
// import logo from './logo.svg';
import SuitePane from './SuitePane';
import SuiteSelectorPane from './SuiteSelector';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suites: null,
      suite: null,
      buildSelection: null,
      additional_info: null
    };
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount() {
    this.props.database.ref('/').once('value', (snapshot) => {
      this.setState ({suites: snapshot.val()});
    });
  }

  onSelect(buildSelection) {
    if (this.state.buildSelection) {
      this.props.database.ref(`/${this.state.buildSelection.selectedSuite}/${this.state.buildSelection.selectedBuild}`).off()
    }

    this.props.database.ref(`/${buildSelection.selectedSuite}/${buildSelection.selectedBuild}/executions`).on('value', (snapshot) => {
      this.setState ({
        suite: snapshot.val(),
        buildSelection: buildSelection
      });
    });

    this.props.database.ref(`/${buildSelection.selectedSuite}/${buildSelection.selectedBuild}/additional_info`).once('value', (snapshot) => {
      this.setState ({
        additional_info: snapshot.val()
      });
    });
  }

  render() {
    if(!this.state.suites){
      return(
        <div className="no-suites-found">
          <h1>Looking for saved executions</h1>
        </div>
      );
    } else {
      if (!this.state.suite) {
        return(
            <div className='App'>
              <div className="no-suite-loaded">
                <h1>Select suite and build</h1>
                <SuiteSelectorPane suites={this.state.suites} onSelect={this.onSelect} />
              </div>
            </div>
        );
      } else {
        return (
            <div className='App'>
              <SuiteSelectorPane suites={this.state.suites} onSelect={this.onSelect} />
              <SuitePane suite={{suite: this.state.suite}} additionalInfo={this.state.additional_info} />
            </div>
        );
      }
    }
  }
}

export default App;
