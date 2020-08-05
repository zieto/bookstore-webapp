import React from 'react';
import './App.css';

import {Container, Row, Jumbotron, Col} from "react-bootstrap";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import WelcomeMsg from "./components/WelcomeMsg";
import Footer from "./components/Footer";
import Book from "./components/Book";
import BookList from "./components/BookList";

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
                        <Route path="/add" exact component={Book}/>
                        <Route path="/list" exact component={BookList}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
