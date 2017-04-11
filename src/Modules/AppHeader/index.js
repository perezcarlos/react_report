import React, { Component } from 'react';


class AppHeader extends Component {

    constructor (props) {
        super(props);

        this.state = {
            section: '#/'
        }
    }

    render () {
        return (
            <div className="App-header">
                <ul className="nav nav-tabs">
                    <li role="presentation">
                        <a href="#/noSuite" className="glyphicon glyphicon-home title home">
                            <span>
                                QA-Report
                            </span>
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#/newSuite" className="new-suite glyphicon glyphicon-plus-sign"/>
                    </li>
                </ul>
            </div>
        )
    }
};

export default AppHeader;
