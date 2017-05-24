import React, { Component } from 'react';


class SubscriptionFieldsPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            states: ['active', 'trialing', 'expired', 'canceled'],
            product: null,
            state: null,
            date: null,
            zuora: null
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
            <div>
                <label className="state" >{`State: `}</label>
                <select
                    selected="selected"
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
                </select>
            </div>
        )
    }

    renderFields () {
        return(
            <div className="fields">
                <div>
                    <label id="product" >{`Product: `}</label>
                    <input
                        id="product"
                        value={this.state.product}
                        onChange={this.onProductChange}
                        onBlur={this.onFilledField}
                        type="textField"
                        placeholder="ex: business-1y"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </div>

                {this.renderStates()}

                <div>
                    <label className="date" >{`Creation date: `}</label>
                    <input
                        id="date"
                        value={this.state.date}
                        onChange={this.onDateChange}
                        onBlur={this.onFilledField}
                        type="date"
                        {...{disabled: !this.props.isAvailable}}
                    />
                </div>

                <div>
                    <label className="zuora" >{`Create zuora subscription: `}</label>
                    <input
                        id="zuora"
                        onChange={this.onZuoraChange}
                        onBlur={this.onFilledField}
                        type="checkbox"
                        {...{checked: this.state.zuora}}
                        {...{disabled: !this.props.isAvailable}}
                    />
                </div>
            </div>
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
