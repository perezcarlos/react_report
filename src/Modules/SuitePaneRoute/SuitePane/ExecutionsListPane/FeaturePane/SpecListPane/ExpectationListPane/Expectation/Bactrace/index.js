import React, { Component } from 'react';
import { Collapse, Well } from 'react-bootstrap';

class BacktracePane extends Component {

    render () {
        return (
            <Collapse in={this.props.isOpen}>
                <Well>
                    {
                        this.props.backtrace.map((backtrc, index) => {
                            return (
                                <p key={index}>{backtrc}</p>
                            )
                        })
                    }
                </Well>
            </Collapse>
        );
    }
};

export default BacktracePane;
