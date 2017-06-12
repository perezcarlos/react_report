import React, { Component } from 'react';


class ValidatedPane extends Component{
    constructor(props){
        super(props);

        this.state = {
            status: this.props.spec.status,
            specName: this.props.spec.name,
            validated: this.props.spec.validated || false
        };

        this.onValidate=this.onValidate.bind(this);
        this.checkboxProperties=this.checkboxProperties.bind(this);
        this.isChecked=this.isChecked.bind(this);
        this.isDisabled=this.isDisabled.bind(this);
    }

    componentDidUpdate (prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                status: this.props.spec.status,
                specName: this.props.spec.name,
                validated: this.props.spec.validated || false
            });
        }
    }

    onValidate (event){
        this.setState({validated: event.target.checked}, () => {
            this.props.onValidate(this.state)
        });
    }

    isChecked() {
        return(
            this.state.status === 'passed' || this.state.validated
        )
    }

    isDisabled() {
        return(
            !(this.state.status === 'failed' || this.state.status === 'warning')
        )
    }

    checkboxProperties() {
        return {
            checked: this.isChecked(),
            disabled: this.isDisabled()
        };
    }

    render() {
        return (
            <div className="validated-pane" >
                <label>Validated:</label>
                {' '}
                <input type="checkbox" onChange={this.onValidate} {...this.checkboxProperties()}/>
            </div>
        )
    }
};

export default ValidatedPane;
