import React, {Component} from 'react';
import { Button, Collapse } from 'react-bootstrap'


class DataRowPane extends Component {
    constructor (props)  {
        super(props);

        this.state = {
            isOpen: false
        };

        this.isOpenToggle=this.isOpenToggle.bind(this);
    }

    isOpenToggle () {
        if ( this.state.isOpen === true ) {
            this.setState({
                isOpen: false
            })
        } else {
            this.setState({
                isOpen: true
            })
        }
    }

    render () {
        if (!this.props.dataKey) {
            return (
                null
            )
        }
        if (typeof this.props.dataValue === 'object') {
            return (
                <div className={`data-key ${this.props.dataKey}`}>
                    <Button bsStyle="link" onClick={this.isOpenToggle}>
                        {this.props.dataKey}
                    </Button>
                    <Collapse className="data-value" in={this.state.isOpen}>
                        <div>
                            {
                                JSON.stringify(this.props.dataValue)
                            }
                        </div>
                    </Collapse>
                </div>
            )
        } else {
            return (
                <div>
                    <label>{this.props.dataKey}</label>
                    <p>{this.props.dataValue}</p>
                </div>

            );
        }
    }
};

export default DataRowPane;
