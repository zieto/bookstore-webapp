import React from 'react';

import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";


class NavigationBar extends React.Component{
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Symbol_book_class2.svg/180px-Symbol_book_class2.svg.png" width="50" height="50" alt="brand"/> BookStore
                </Link>
                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Dodaj książkę</Link>
                    <Link to={"list"} className="nav-link">Lista książek</Link>
                </Nav>
                <Nav.Item className="ml-auto">
                    <Button href="login" variant="success" type="submit">
                       Zaloguj się
                    </Button>
                </Nav.Item>
            </Navbar>
            );
    }

}

export default NavigationBar;