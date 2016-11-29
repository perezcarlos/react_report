import React, { Component } from 'react';
// import logo from './logo.svg';
import SuitePane from './SuitePane'
import './App.css';


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
        <SuitePane suite={{suite: this.state.suite}} />
      </div>
    );
  }
}

export default App;
