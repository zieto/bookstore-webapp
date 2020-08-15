import React from 'react';
import './App.css';

import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import WelcomeMsg from "./components/WelcomeMsg";
import Footer from "./components/Footer";
import BookAdd from "./components/BookAdd";
import BookList from "./components/BookList";
import BookEdit from "./components/BookEdit";
import Login from "./components/Login";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Logout from "./components/Logout";
import NotAuthenticatedRoute from "./components/NotAuthenticatedRoute";


function App() {
    const marginTop = {
        marginTop:"20px"
    };


    return (
    <BrowserRouter>
       <NavigationBar/>
       <Container>
            <Row>
                <Col lg={12} style={marginTop}>
                    <Switch>
                        <Route path="/" exact component={WelcomeMsg}/>
                        <AuthenticatedRoute path="/add" exact component={BookAdd}/>
                        <AuthenticatedRoute path="/edit/:id/" exact component={BookEdit}/>
                        <Route path="/list" exact component={BookList}/>
                        <NotAuthenticatedRoute path="/login" exact component={Login}/>
                        <Route path="/logout" exact component={Logout}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
