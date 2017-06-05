import React , { Component } from 'react';
import { Button, Modal, Collapse } from 'react-bootstrap'


class AttachmentPane extends Component {
    constructor ( props ) {
        super (props);

        this.state = {
            isOpen: false
        };

        this.isOpenToggle=this.isOpenToggle.bind(this);
    }

    isOpenToggle () {
        if (this.state.isOpen === true ) {
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
        return (
            <Collapse in={this.props.isOpen}>
                <div>
                    <Button className="thumbnail" onClick={this.isOpenToggle}>
                        <img alt="No attachment found" src={this.props.attachment}/>
                    </Button>
                    <Modal show={this.state.isOpen} onHide={this.isOpenToggle}>
                        <Modal.Body>
                            <img alt="No attachment found" src={this.props.attachment}/>
                        </Modal.Body>
                    </Modal>
                </div>
            </Collapse>
        );
    }
};

export default AttachmentPane;
