import React from 'react';

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSave, faPlusSquare} from "@fortawesome/free-solid-svg-icons"

class Book extends React.Component {

    constructor(props){
        super(props);
        this.state = {title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:''};
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    submitBook(event){
        alert('Tytuł: '+this.state.title+' Autor: '+this.state.author+' Cena: '+this.state.price+' Język: '+this.state.language+' Nr ISBN: '+this.state.isbnNumber+' URL: '+this.state.coverPhotoURL);
        event.preventDefault();
    }

    bookChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Dodaj książkę</Card.Header>
                <Form onSubmit={this.submitBook} id="bookFormId">
                <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Tytuł</Form.Label>
                                <Form.Control required
                                    type="text" name="title"
                                    value={this.state.title}
                                    onChange={this.bookChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Podaj tytuł książki" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAuthor">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control required
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
                            <Form.Control required
                                type="text" name="price"
                                className={"bg-dark text-white"}
                                placeholder="Podaj cenę książki"
                                value={this.state.price}
                                onChange={this.bookChange}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLanguage">
                            <Form.Label>Język</Form.Label>
                            <Form.Control required
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
                            <Form.Control required
                                type="text" name="coverPhotoURL"
                                className={"bg-dark text-white"}
                                placeholder="Podaj link URL do zdjęcia okładki książki"
                                value={this.state.coverPhotoURL}
                                onChange={this.bookChange}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridIsbnNumber">
                            <Form.Label>Nr ISBN</Form.Label>
                            <Form.Control required
                                type="text" name="isbnNumber"
                                className={"bg-dark text-white"}
                                placeholder="Podaj numer ISBN książki"
                                value={this.state.isbnNumber}
                                onChange={this.bookChange}/>
                        </Form.Group>
                    </Form.Row>
                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                    <Button variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} /> Zapisz
                    </Button>
                </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default Book;