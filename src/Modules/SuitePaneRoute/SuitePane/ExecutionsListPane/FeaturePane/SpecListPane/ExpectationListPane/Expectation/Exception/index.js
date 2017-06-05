import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class ExceptionPane extends Component {

    render () {
        return (
            <div>
                <Button
                    className="exception"
                    bsStyle="link"
                    onClick={this.props.isBacktraceOpenToggle}
                >
                    {this.props.exception}
                </Button>
            </div>
        );
    }
};

export default ExceptionPane;
