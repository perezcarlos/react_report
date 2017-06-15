import React, {Component} from 'react';
import { ListGroupItem, Glyphicon, Button } from 'react-bootstrap'
import Validate from '../../../../SpecDetailPane/ValidatedPane'
import AdditionalSpecInfo from '../../../../SpecDetailPane/AdditionalSpecInfoPane'


class SpecPane extends Component {
    constructor (props) {
        super(props);

        this.state = {
            icon_class: '',
            class_name: '',
        };

        this.onSelectSpec=this.onSelectSpec.bind(this);
        this.isSpecDisabled=this.isSpecDisabled.bind(this);
        this.isSelectedClass=this.isSelectedClass.bind(this);
        this.renderListView=this.renderListView.bind(this);
    }

    componentDidMount () {
        if(this.props.spec) {
            switch (this.props.spec.status) {
                case "failed":
                    this.setState({
                        icon_class: "remove",
                        class_name: "failed"
                    });
                    break;
                case "passed":
                    this.setState({
                        icon_class: "ok",
                        class_name: "success"
                    });
                    break;
                case "pending":
                    this.setState({
                        icon_class: "time",
                        class_name: "pending"
                    });
                    break;
                default:
                    this.setState({
                        icon_class: "alert",
                        class_name: "warning"
                    })
            }
        }
    }

    onSelectSpec () {
        this.props.onSelectedSpec(this.props.spec);
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

    isSelectedClass () {
        if (this.props.selectedSpec && this.props.selectedSpec.name === this.props.spec.name) {
            return "spec spec-name active"
        } else {
            return "spec spec-name"
        }
    }

    renderListView () {
        return (
            <tr>
                <td className="validated">
                    <Validate spec={this.props.spec} onValidate={this.props.onValidate}/>
                </td>
                <td className={`status status-${this.state.class_name} text-center`}>
                    <Glyphicon glyph={this.state.icon_class} className={this.state.icon_class}></Glyphicon>
                </td>
                <td className="spec">
                    <Button
                        href={`#${this.props.spec.id}`}
                        bsStyle="link"
                        className="spec spec-name"
                        data-toggle="collapse"
                        value={this.props.spec.name}
                        {...this.isSpecDisabled()}
                    >
                        {this.props.spec.name}
                    </Button>
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

    render () {
        if (this.props.spec) {
            if (this.props.selectedView === 'list') {
                return this.renderListView()
            }

            return (
                <ListGroupItem
                    className={this.isSelectedClass()}
                    value={this.props.spec.name}
                    {...this.isSpecDisabled()}
                >
                    <Validate spec={this.props.spec} onValidate={this.props.onValidate}/>
                    <span className="spec-name-button" onClick={this.onSelectSpec}>
                        <label>{this.props.spec.name.replace(/[_-]/g, ' ')}</label>
                        {' '}
                        <Glyphicon className={`icon ${this.state.class_name}`} glyph={this.state.icon_class}/>
                    </span>
                </ListGroupItem>
            )
        }
    }
};

export default SpecPane;
