import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Checkbox
} from 'react-bootstrap';

class SubscriptionFieldsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            states: ['active', 'trialing', 'expired', 'canceled'],
            product: '',
            state: null,
            date: '',
            zuora: false
        };

        this.renderFields=this.renderFields.bind(this);
        this.renderStates=this.renderStates.bind(this);
        this.onProductChange=this.onProductChange.bind(this);
        this.onStateChange=this.onStateChange.bind(this);
        this.onDateChange=this.onDateChange.bind(this);
        this.onZuoraChange=this.onZuoraChange.bind(this);
        this.isSelected=this.isSelected.bind(this);
        this.onFilledField=this.onFilledField.bind(this);
    }

    componentDidMount () {
        this.setState({
            product: localStorage.getItem('product') || '',
            state: localStorage.getItem('state') || 'active',
            date: localStorage.getItem('date') || new Date().toISOString().slice(0,10),
            zuora: localStorage.getItem('zuora') === 'true' ? true : false
        }, () => this.props.onFilled(this.state));
    }

    onProductChange (event) {
        this.setState({
            product: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});

    }

    onStateChange (event) {
        this.setState({
            state: event.target.value
        }, () => {this.props.onFilled(this.state)});
    }

    onDateChange (event) {
        this.setState({
            date: event.currentTarget.value
        }, () => {this.props.onFilled(this.state)});
    }

    onZuoraChange (event) {
        this.setState({
            zuora: event.currentTarget.checked
        }, () => {
            localStorage.setItem('zuora', this.state.zuora);
            this.props.onFilled(this.state)
        });
    }

    onFilledField (event) {
        localStorage.setItem(event.currentTarget.id, event.currentTarget.value)
    }

    isSelected (state) {
        if (this.state.state === state) {
            return {selected: true}
        } else {
            return null
        }
    }

    renderStates () {
        return (
            <FormGroup>
                <ControlLabel className="state" >{`State: `}</ControlLabel>
                <FormControl
                    componentClass="select"
                    id="state"
                    onChange={this.onStateChange}
                    onBlur={this.onFilledField}
                    {...{disabled: !this.props.isAvailable}}
                >
                    {
                        this.state.states.map((state) => {
                            return(
                                <option key={state} value={state} {...this.isSelected(state)}>{state}</option>
                            )
                        })
                    }
                </FormControl>
            </FormGroup>
        )
    }

    renderFields () {
        return(
            <Form className="fields">
                <FormGroup>
                    <ControlLabel id="product" >{`Product: `}</ControlLabel>
                    <FormControl
                        id="product"
                        value={this.state.product}
                        onChange={this.onProductChange}
                        onBlur={this.onFilledField}
                        type="text"
                        placeholder="ex: business-1y"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>

                {this.renderStates()}

                <FormGroup>
                    <ControlLabel className="date" >{`Creation date: `}</ControlLabel>
                    <FormControl
                        id="date"
                        value={this.state.date}
                        onChange={this.onDateChange}
                        onBlur={this.onFilledField}
                        type="date"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel className="zuora" >{`Create zuora subscription: `}</ControlLabel>
                    <Checkbox
                        id="zuora"
                        onChange={this.onZuoraChange}
                        onBlur={this.onFilledField}
                        type="checkbox"
                        {...{checked: this.state.zuora}}
                        {...{disabled: !this.props.isAvailable}}
                    />
                </FormGroup>
            </Form>
        )
    }

    render () {
        return (
            <div className="subscription-fields-pane fields-pane">
                <p>Insert subscription data: </p>
                {this.renderFields()}
            </div>
        )
    }
};

export default SubscriptionFieldsPane;
