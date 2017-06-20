import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';


class GeneralAlert extends Component {
    constructor(props){
        super(props);

        this.state = {
            alert: {}
        };

        this.hideAlert = this.hideAlert.bind(this);
    }

    componentDidMount () {
        this.setState({
            alert: this.props.alert || {}
        })
    }

    componentDidUpdate (prevProps) {
        if (prevProps.alert !== this.props.alert) {
            this.setState({
                alert: this.props.alert || {}
            })
        }
    }

    hideAlert () {
        this.setState({
            alert: {shown: false}
        })
    }

    render() {
        if (this.state.alert.shown === true) {
            return (
                <div>
                    <Alert className="general-alert" bsStyle={this.state.alert.type} onDismiss={this.hideAlert}>
                        <h4>{this.state.alert.header}</h4>
                        <p>{this.state.alert.message}</p>
                    </Alert>
                </div>
            )
        } else {
            return null
        }
    }
}

export default GeneralAlert;
