import React, { Component } from 'react';
import { Button, Collapse, Well } from 'react-bootstrap'

class ConsoleOutputPane extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.isOpenToggle=this.isOpenToggle.bind(this);
    }

    isOpenToggle () {
        if (this.state === true) {
            this.setState({
                isOpen: false
            })
        } else {
            this.setState({
                isOpen: true
            })
        }
    }

    render () {
        if (!this.props.consoleOutput) {
            return (
                <div className="console-output">
                    <Button bsStyle="link" disabled>Console output</Button>
                </div>
            );
        } else  {
            return (
                <div className="console-output">
                    <Button bsStyle="link" onClick={this.isOpenToggle}>Console output</Button>
                    <Collapse in={this.state.isOpen} className="console-output">
                        <Well>
                            {
                                this.props.consoleOutput.map((output) => {
                                    return (
                                        Object.keys(output).map((key) => {
                                            return (
                                                <p key={key}>
                                                    <b>{key}</b>{`:\n${JSON.stringify(output[key])}`}
                                                </p>
                                            )
                                        })
                                    )
                                })
                            }
                        </Well>
                    </Collapse>
                </div>
            )
        }
    }
};

export default ConsoleOutputPane;
