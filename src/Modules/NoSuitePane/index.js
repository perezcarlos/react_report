import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Button } from 'react-bootstrap'


class NoSuitePane extends Component {

    constructor (props) {
        super(props);

        this.goToNewCreation=this.goToNewCreation.bind(this);
    }

    goToNewCreation () {
        hashHistory.push('newSuite');
    }

    render () {
        return (
            <div className="suite-pane col-md-12">
                <div className="no-suite-loaded panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <h1>No suite has been selected</h1>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="new-suite">
                            <h3>If you wish you can launch a new one</h3>
                            <Button className="launch btn btn-default" onClick={this.goToNewCreation}>Launch</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default NoSuitePane;
