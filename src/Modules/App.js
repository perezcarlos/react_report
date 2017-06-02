import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import _ from 'lodash'
import loading from '../Images/loading.gif'
import AppHeader from './AppHeader'
import SuiteSelectorPane from './SuiteSelector/index';
import database from '../database';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suite_loaded: null,
      suites: null,
      buildSelection: this.props.params || {},
      failedSpecs: ''
    };
    this.onSelect = this.onSelect.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    database.ref('suites/').on('value', (snapshot) => {
      this.setState ({suites: snapshot.val()});
    })
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/') {
      this.setState({
        suite_loaded: true,
        suites: {},
        buildSelection: this.props.params || {}
      }, () => {
          this.loadData()
        }
      )
    } else {
      hashHistory.push('/noSuite');
      this.loadData()
    }
  }

  componentDidUpdate(prevProps) {
      if (prevProps.params !== this.props.params) {
          this.setState({
              buildSelection: this.props.params || {}
          })
      }
  }

  onSelect(buildSelection) {
    if (this.state.buildSelection && !_.isEmpty(this.state.buildSelection) ) {
      database.ref(`builds/${this.state.buildSelection.selectedSuite.replace(/[-\s]/g, "_")}_${this.state.buildSelection.selectedBuild}/`).off()
    }

    this.setState ({
      buildSelection: buildSelection,
      suite_loaded: true
    }, () => {
      const filter = this.props.location.query.filter || 'status';
      const path = `/suite/${this.state.buildSelection.selectedSuite}/build/${this.state.buildSelection.selectedBuild}?filter=${filter}`;
      hashHistory.push(path);
    });
  }

  render() {
    if(!this.state.suites){
      return(
        <div className="App">
          <AppHeader onNavigate={this.onHeaderNavigation}/>
          <div className="App-body">
            <div className="no-suites-found">
              <img src={loading} alt=""/>
              <h1>Looking for saved executions</h1>
            </div>
          </div>
        </div>
      );
    } else {
        return(
          <div className='App'>
            <AppHeader onNavigate={this.onHeaderNavigation}/>
            <div className="App-body">
              <SuiteSelectorPane suites={this.state.suites} onSelect={this.onSelect} buildSelection={this.state.buildSelection}/>
                {this.props.children}
            </div>
          </div>
        );
    }
  }
}

export default App;
