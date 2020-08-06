import React from 'react';

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSave, faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons"
import ToastSuccess from "./ToastSuccess"

import axios from "axios"

class Book extends React.Component {

    initialState = {
        title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:''
    };

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language
        };

        axios.post("http://localhost:8080/rest/books",book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    }


    resetBook = () => {
       this.setState(()=> this.initialState);
    };

    bookChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };




    render() {
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <ToastSuccess children={{show: this.state.show, message:"Pomyślnie dodano książkę!"}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Dodaj książkę</Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.submitBook} id="bookFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Tytuł</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="title"
                                                  value={this.state.title}
                                                  onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Podaj tytuł książki" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="author"
                                                  className={"bg-dark text-white"}
                                                  placeholder="Podaj autora książki"
                                                  value={this.state.author}
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Cena</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="price"
                                                  className={"bg-dark text-white"}
                                                  placeholder="Podaj cenę książki"
                                                  value={this.state.price}
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Język</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="language"
                                                  className={"bg-dark text-white"}
                                                  placeholder="Podaj język książki"
                                                  value={this.state.language}
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Okładka</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="coverPhotoURL"
                                                  className={"bg-dark text-white"}
                                                  placeholder="Podaj link URL do zdjęcia okładki książki"
                                                  value={this.state.coverPhotoURL}
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridIsbnNumber">
                                    <Form.Label>Nr ISBN</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="isbnNumber"
                                                  className={"bg-dark text-white"}
                                                  placeholder="Podaj numer ISBN książki"
                                                  value={this.state.isbnNumber}
                                                  onChange={this.bookChange}/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{'  '}
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> Zapisz
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>


        );
    }
}

export default Book;