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
      buildSelection: null
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

    this.props.database.ref(`/${buildSelection.selectedSuite}/${buildSelection.selectedBuild}`).on('value', (snapshot) => {
      this.setState ({
        suite: snapshot.val(),
        buildSelection: buildSelection
      });
    });
  }

  render() {
    if(!this.state.suites){
      return(
        <div>
          <h1>Loading</h1>
        </div>
      );
    } else {
      if (!this.state.suite) {
        return(
            <div className='App'>
              <SuiteSelectorPane suites={this.state.suites} onSelect={this.onSelect} />
              <h1>Select suite and build</h1>
            </div>
        );
      } else {
        return (
            <div className='App'>
              <SuiteSelectorPane suites={this.state.suites} onSelect={this.onSelect} />
              <SuitePane suite={{suite: this.state.suite}} />
            </div>
        );
      }
    }
  }
}

export default App;
