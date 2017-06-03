import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';


class AppHeader extends Component {
    render () {
        return (
            <Navbar staticTop className="App-header">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/noSuite" className="title home">
                            <Glyphicon glyph="home"/>
                            <span className="title-text">
                                {" QA-Report"}
                            </span>
                        </a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem className="new-suite" href="#/newSuite" >
                        <Glyphicon glyph="plus-sign"/>
                    </NavItem>
                </Nav>
                <Nav>
                    <NavItem className="new-user" href="#/newUser" >
                        <Glyphicon glyph="user">
                            <Glyphicon glyph="plus-sign"/>
                        </Glyphicon>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
};

export default AppHeader;