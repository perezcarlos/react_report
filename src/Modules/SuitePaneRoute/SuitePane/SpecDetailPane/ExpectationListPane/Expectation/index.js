import React, { Component } from 'react';
import uuid from 'uuid';
import { Button } from 'react-bootstrap'
import Exception from './Exception/index';
import Backtrace from './Bactrace/index';
import Attachment from './Attachment/index';
import ConsoleOutput from './ConsoleOutputPane/index'


class ExpectationPane extends Component {
    constructor ( props ) {
        super(props);

        this.state = {
            expectationClass: 'error',
            isAttachmentOpen: false,
            isBacktraceOpen: false
        };

        this.getExpectationClass=this.getExpectationClass.bind(this);
        this.isAttachmentOpenToggle=this.isAttachmentOpenToggle.bind(this);
        this.isBacktraceOpenToggle=this.isBacktraceOpenToggle.bind(this);
    }

    componentDidMount () {
        this.getExpectationClass()
    }

    getExpectationClass () {
        if (!this.props.expectation) {
            return null
        };

        var expectation_class;
        switch (this.props.expectation.status) {
            case 'failed':
                expectation_class = "warning";
                break;
            case "passed":
                expectation_class = "success";
                break;
            default :
                expectation_class = "error";

        }

        this.setState({
            expectationClass: expectation_class
        })
    }

    isAttachmentOpenToggle () {
        if (this.state.isAttachmentOpen === true) {
            this.setState({
                isAttachmentOpen: false
            })
        } else {
            this.setState({
                isAttachmentOpen: true
            })
        }
    }

    isBacktraceOpenToggle () {
        if (this.state.isBacktraceOpen === true) {
            this.setState({
                isBacktraceOpen: false
            })
        } else {
            this.setState({
                isBacktraceOpen: true
            })
        }
    }

    render () {
        if (!this.props.expectation.exception) {
            const attachmentId = `attachment-${uuid()}`;
            return (
                <div className={`alert alert-${this.state.expectationClass} expectation`}>
                    <Button
                        bsStyle="link"
                        onClick={this.isAttachmentOpenToggle}
                    >
                        <label>
                            {this.props.expectation.description}
                        </label>
                    </Button>
                    <ConsoleOutput consoleOutput={this.props.expectation.console_output}/>
                    <Attachment
                        key={attachmentId}
                        attachment={this.props.expectation.remote_attachment}
                        isOpen={this.state.isAttachmentOpen}
                    />
                </div>
            );
        } else {
            const attachmentId = `attachment-${uuid()}`;
            const backtraceId = `backtrace-${uuid()}`;
            return (
                <div className={`alert alert-${this.state.expectationClass} expectation`}>
                    <Button
                        bsStyle="link"
                        onClick={this.isAttachmentOpenToggle}
                    >
                        <label>
                            {this.props.expectation.description}
                        </label>
                    </Button>
                    <ConsoleOutput consoleOutput={this.props.expectation.console_output}/>
                    <Exception
                        key={backtraceId}
                        exception={this.props.expectation.exception}
                        isBacktraceOpenToggle={this.isBacktraceOpenToggle}
                    />
                    <Backtrace
                        key={`${backtraceId}-2`}
                        backtrace={this.props.expectation.exception_backtrace}
                        id={backtraceId}
                        isOpen={this.state.isBacktraceOpen}
                    />
                    <Attachment
                        key={attachmentId}
                        attachment={this.props.expectation.remote_attachment}
                        id={attachmentId}
                        isOpen={this.state.isAttachmentOpen}
                    />
                </div>
            )
        }
    }
};

export default ExpectationPane;
