import React, { Component } from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';

class SelectViewTabPane extends Component {
    constructor(props) {
        super (props);

        this.state = {
            tabs: {
                1: 'list',
                2: 'detail'
            }
        };

        this.tabClass = this.tabClass.bind(this);
        this.onSelectedView = this.onSelectedView.bind(this);
    }

    tabClass (view) {
        if (this.props.selectedView === view) {
            return `${view} active`
        } else {
            return view
        }
    }

    onSelectedView (key) {
        this.props.onSelectedView(this.state.tabs[key])
    }

    render () {
        return (
            <Nav bsStyle="tabs" onSelect={this.onSelectedView}>
                <NavItem
                    value="list"
                    className={this.tabClass('list')}
                    eventKey={1}
                >
                    <Glyphicon glyph="align-justify"/>
                    {' '}
                    <span>List view</span>
                </NavItem>
                <NavItem
                    value="detail"
                    className={this.tabClass('detail')}
                    eventKey={2}
                >
                    <Glyphicon glyph="th-list"/>
                    <Glyphicon glyph="object-align-left"/>
                    {' '}
                    <span>Detail view</span>
                </NavItem>
            </Nav>
        )
    }
};

export default SelectViewTabPane;