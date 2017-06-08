import React, {Component} from 'react';
import AdditionalSpecInfo from './AdditionalSpecInfoPane';
import Validated from './ValidatedPane'


class SpecPane extends Component {
    constructor (props) {
        super(props);

        this.state = {
            icon_class: '',
            class_name: ''
        };

        this.onSelectSpec=this.onSelectSpec.bind(this);
        this.isSpecDisabled=this.isSpecDisabled.bind(this);
    }

    componentDidMount () {
        if(this.props.spec) {
            switch (this.props.spec.status) {
                case "failed":
                    this.setState({
                        icon_class: "glyphicon-remove",
                        class_name: "failed"
                    });
                    break;
                case "passed":
                    this.setState({
                        icon_class: "glyphicon-ok",
                        class_name: "success"
                    });
                    break;
                case "pending":
                    this.setState({
                        icon_class: "glyphicon-time",
                        class_name: "pending"
                    });
                    break;
                default:
                    this.setState({
                        icon_class: "glyphicon-alert",
                        class_name: "warning"
                    })
            }
        }
    }

    onSelectSpec (event) {
        const position = this.props.selectedSpecs.indexOf(event.currentTarget.value);

        if (!~position){
            this.props.selectedSpecs.push(event.currentTarget.value)
        } else if (~position) {
            this.props.selectedSpecs.splice(position, 1);
        }

        this.props.onSelectedSpecs(this.props.selectedSpecs);
    }

    isSpecDisabled () {
        if (this.props.spec.expectations){
            return {
                disabled: false
            }
        } else {
            return {
                disabled: true
            }
        }
    }

    render () {
        return (
            <tr>
                <td className="validated">
                    <Validated spec={this.props.spec} onValidate={this.props.onValidate}/>
                </td>
                <td className={`status status-${this.state.class_name} text-center`}>
                    <i className={`glyphicon ${this.state.icon_class}`}></i>
                </td>
                <td className="spec">
                    <button
                        href={`#${this.props.spec.id}`}
                        className="spec spec-name"
                        data-toggle="collapse"
                        value={this.props.spec.name}
                        onClick={this.onSelectSpec}
                        {...this.isSpecDisabled()}
                    >
                        {this.props.spec.name}
                    </button>
                </td>
                <td className="describe">
                    <div>
                        {this.props.spec.description}
                        <AdditionalSpecInfo additionalInfo={this.props.spec.additional_spec_info}/>
                    </div>
                </td>
                <td className="run-time">{this.props.spec.run_time}</td>
            </tr>
        );
    }
};

export default SpecPane;
