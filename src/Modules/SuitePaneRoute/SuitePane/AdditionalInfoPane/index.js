import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { Button, Collapse, Well } from 'react-bootstrap'

class AdditionalInfoPane extends Component {

    constructor (props) {
        super (props);

        this.state = {
            info: {},
            isOpen: false
        };

        this.isOpenToggle=this.isOpenToggle.bind(this);
    }

    componentDidMount () {
        var info = {};

        if (this.props.additionalInfo && !isEmpty(this.props.additionalInfo)) {
            info = {...this.props.additionalInfo, ...{date: (new Date(this.props.additionalInfo.date))}}
        }
        this.setState({
            info: info
        })
    }

    componentDidUpdate (prevProps) {
        if (prevProps !== this.props) {
            var info = {};

            if (this.props.additionalInfo && !isEmpty(this.props.additionalInfo)) {
                info = {...this.props.additionalInfo, ...{date: (new Date(this.props.additionalInfo.date))}}
            }
            this.setState({
                info: info
            })
        }
    }

    isOpenToggle () {
        if ( this.state.isOpen === true ) {
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
        if (!this.state.info || isEmpty(this.state.info)) {
            return (
                <div className="additional-build-info">
                    <Button bsStyle="link" disabled>Show more info</Button>
                </div>
            )
        }

        return (
            <div className="additional-build-info">
                <Button bsStyle="link" onClick={this.isOpenToggle}>
                    Show more info
                </Button>
                <Collapse className="additional-info" in={this.state.isOpen}>
                    <Well>
                        {
                            Object.keys(this.state.info).map((key) => {
                                return (
                                    <div key={key} id={key}>
                                        <p>
                                            <b>{key}</b>
                                            {`: ${this.state.info[key]}`}
                                        </p>
                                    </div>
                                );
                            })
                        }
                    </Well>
                </Collapse>
            </div>
        )
    }
};

AdditionalInfoPane.defaultProps = {
    additionalInfo: {}
};

export default AdditionalInfoPane;

