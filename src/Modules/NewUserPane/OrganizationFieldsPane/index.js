import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap'

class OrganizationFieldsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organizationName: '',
            enableFeatures: true,
        };
        this.renderFields=this.renderFields.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onEnabledChange=this.onEnabledChange.bind(this);
        this.onOrganizationNameFilled=this.onOrganizationNameFilled.bind(this);
    }

    componentDidMount () {
        this.setState({
            organizationName: localStorage.getItem('organizationName') || '',
            enableFeatures: localStorage.getItem('enableFeatures') === 'true' ? true : false
        }, () => {this.props.onFilled(this.state)});
    }

    onNameChange (event) {
        this.setState({
            organizationName: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onEnabledChange (event) {
        this.setState({
            enableFeatures: event.currentTarget.checked
        }, () => {
            localStorage.setItem('enableFeatures', this.state.enableFeatures);
            this.props.onFilled(this.state);
        });
    }

    onOrganizationNameFilled (event) {
        localStorage.setItem(event.currentTarget.id, event.currentTarget.value)
    }

    renderFields () {
        return(
            <Form className="fields">
                <FormGroup>
                    <ControlLabel className="organizationName" >{`Name: `}</ControlLabel>
                    <FormControl
                        id="organizationName"
                        value={this.state.organizationName}
                        onChange={this.onNameChange}
                        onBlur={this.onOrganizationNameFilled}
                        type="text"
                        placeholder="ex: Redbooth BCN"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel className="enableFeatures" >{`Enable all features: `}</ControlLabel>
                    <Checkbox
                        id="enableFeatures"
                        onChange={this.onEnabledChange}
                        type="checkbox"
                        {...{checked: this.state.enableFeatures}}
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>
            </Form>
        )
    }

    render () {
        return (
            <div className="subscription-fields-pane fields-pane">
                <p>Insert organization data: </p>
                {this.renderFields()}
            </div>
        )
    }
};

export default OrganizationFieldsPane;
