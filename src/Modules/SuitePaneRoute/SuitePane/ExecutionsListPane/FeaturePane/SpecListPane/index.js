import React, {Component} from 'react';
import { ListGroup } from 'react-bootstrap'
import Spec from './SpecPane/index';

class SpecListPane extends Component {
    constructor (props) {
        super(props);

        this.state = {
            specRows: [],
        };
    }

    render () {
        return (
            <ListGroup>
                {
                    this.props.specs.map((item, index) => {
                        return (
                            <Spec
                                key={index}
                                spec={item}
                                selectedSpec={this.props.selectedSpec}
                                onSelectedSpec={this.props.onSelectedSpec}
                            />
                        )
                    })
                }
            </ListGroup>
        )
    }
};

export default SpecListPane;
