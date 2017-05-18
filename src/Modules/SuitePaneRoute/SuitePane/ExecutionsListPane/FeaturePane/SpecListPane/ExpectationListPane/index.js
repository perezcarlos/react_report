import React, {Component} from 'react';
import Expectation from './Expectation';
import uuid from 'uuid';


class ExpectationListPane extends Component {
    constructor(props){
        super(props);

        this.state={
          selected: false
        };

        this.isSelected=this.isSelected.bind(this);
        this.isCollapsedClass=this.isCollapsedClass.bind(this);
    }

    componentDidMount () {
        this.setState({
            selected: this.isSelected()
        })
    }

    isSelected () {
        return (this.props.selectedSpecs.some( (selSpec) => selSpec === this.props.spec.name ))
    }

    isCollapsedClass () {
        if (this.state.selected) {
            return 'collapse in'
        } else {
            return 'collapse'
        }
    }

    render () {
        if (this.props.expectations) {
            return (
                <tr className={this.isCollapsedClass()} id={this.props.id}>
                    <td colSpan="5">
                        {
                            this.props.expectations.map((expectation) => {
                                var key = uuid();
                                return (
                                    <Expectation key={key} expectation={expectation}/>
                                );
                            })
                        }
                    </td>
                </tr>
            )
        }
        else {
            return null
        }
    }
}

export default ExpectationListPane;
