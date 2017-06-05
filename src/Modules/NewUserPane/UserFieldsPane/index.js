import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'


class UserFieldsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            login: '',
            email: '',
        };
        this.renderFields=this.renderFields.bind(this);
        this.onFirstNameChange=this.onFirstNameChange.bind(this);
        this.onLastNameChange=this.onLastNameChange.bind(this);
        this.onLoginChange=this.onLoginChange.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
        this.onFilledField=this.onFilledField.bind(this);
    }

    componentDidMount () {
        this.setState({
            firstName: localStorage.getItem('firstName') || '',
            lastName: localStorage.getItem('lastName') || '',
            login: localStorage.getItem('login') || '',
            email: localStorage.getItem('email') || ''
        }, () => this.props.onFilled(this.state));
    }

    onFirstNameChange (event) {
        this.setState({
            firstName: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onLastNameChange (event) {
        this.setState({
            lastName: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onLoginChange (event) {
        this.setState({
            login: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onEmailChange (event) {
        this.setState({
            email: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onFilledField (event) {
        localStorage.setItem(event.currentTarget.id, event.currentTarget.value)
    }

    renderFields () {
        return(
            <Form className="fields">
                <FormGroup>
                    <ControlLabel
                        className="firstName"
                    >
                        {`First name: `}
                    </ControlLabel>
                    <FormControl
                        id="firstName"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                        onBlur={this.onFilledField}
                        type="text"
                        placeholder="ex: Carlos"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel
                        className="lastName"
                    >
                        {`Last name: `}
                    </ControlLabel>
                    <FormControl
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                        onBlur={this.onFilledField}
                        type="text"
                        placeholder="ex: Perez"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel
                        className="login"
                    >
                        {`Login: `}
                    </ControlLabel>
                    <FormControl
                        id="login"
                        value={this.state.login}
                        onChange={this.onLoginChange}
                        onBlur={this.onFilledField}
                        type="text"
                        placeholder="ex: caper"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel
                        className="email"
                    >
                        {`Email: `}
                    </ControlLabel>
                    <FormControl
                        id="email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                        onBlur={this.onFilledField}
                        type="email"
                        placeholder="ex: example@example.com"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>
            </Form>
        )
    }

    render () {
        return (
            <div className="user-fields-pane fields-pane">
                <p>Insert user data: </p>
                    {this.renderFields()}
            </div>
        )
    }
};

export default UserFieldsPane;
