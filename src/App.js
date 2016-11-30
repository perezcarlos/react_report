import React, { Component } from 'react';
// import logo from './logo.svg';
import SuitePane from './SuitePane';
import SuiteSelectorPane from './SuiteSelector';
import './App.css';


const suites = {
  suite1: {
    a: {
      name: 'a testing'
    },
    b: {
      name: 'b testing'
    }
  },
  suite2: {
    z: {
      name: 'z testing'
    },
    y: {
      name: 'y testing'
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suite: {}
    };
  }

  componentDidMount() {
    this.props.database_reference.on('value', (snapshot) => {
      this.setState ({suite: snapshot.val()});
    });
  }

  render() {
    if(!this.state.suite){
      return(
        <div className='App'>
          <h1>No data found</h1>
        </div>
      )
    }
    return (
      <div className='App'>
        <SuiteSelectorPane suites={suites} onSelect={(selected) => console.log(selected)} />
        <SuitePane suite={{suite: this.state.suite}} />
      </div>
    );
  }
}

export default App;
