import React from 'react';

import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import AuthenticationService from '../AuthenticationService'

class NavigationBar extends React.Component{

    logout = () =>{
        AuthenticationService.logout();
    };

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return(
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Symbol_book_class2.svg/180px-Symbol_book_class2.svg.png" width="50" height="50" alt="brand"/> eBookStore
                </Link>
                <Nav className="mr-auto">
                    {isUserLoggedIn && <Link to={"add"} className="nav-link">Dodaj książkę</Link>}
                    <Link to={"list"} className="nav-link">Lista książek</Link>
                </Nav>
                <Nav.Item className="ml-auto">
                    {!isUserLoggedIn && <Link to="/login"><Button variant="success" type="submit">
                       Zaloguj się
                    </Button>
                    </Link>}
                    {isUserLoggedIn && <Button onClick={this.logout} href="logout" variant="danger" type="submit">
                        Wyloguj się
                    </Button>}
                </Nav.Item>
            </Navbar>
            );
    }

}

export default NavigationBar;