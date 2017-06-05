import React, {Component} from 'react';
import { Button, Collapse, Well } from 'react-bootstrap'
import DataRow from "./DataRowPane/index";


class AdditionalSpecInfoPane extends Component {
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
        if (!this.props.additionalInfo) {
            return (
                <div className="spec-additional-info">
                    <Button bsStyle="link" disabled>More info</Button>
                </div>
            )
        }
        return (
            <div className="spec-additional-info">
                <Button bsStyle="link" onClick={this.isOpenToggle}>
                    More info
                </Button>
                <Collapse className="additional-info" in={this.state.isOpen}>
                    <Well>
                        {
                            Object.keys(this.props.additionalInfo).map((key) => {
                                return (
                                    <DataRow
                                        key={key}
                                        dataKey={key}
                                        dataValue={this.props.additionalInfo[key]}
                                    />
                                );
                            })
                        }
                    </Well>
                </Collapse>
            </div>
        );
    }
};

export default AdditionalSpecInfoPane;
