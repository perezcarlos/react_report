import React, {Component} from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap'


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

    render () {
        if (this.props.spec) {
            return (
                <ListGroupItem
                    header={this.props.spec.name.replace(/[_-]/g, ' ')}
                    className={this.isSelectedClass()}
                    value={this.props.spec.name}
                    onClick={this.onSelectSpec}
                    {...this.isSpecDisabled()}
                >
                    <Glyphicon className={this.state.class_name} glyph={this.state.icon_class}/>
                </ListGroupItem>
            )
        }
    }
};

export default SpecPane;
