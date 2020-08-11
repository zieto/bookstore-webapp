import React from 'react';

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Redirect} from 'react-router-dom'
import {faEdit, faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons"
import ToastSuccess from "./ToastSuccess"

import axios from "axios"

class BookEdit extends React.Component {

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', available: true
    };

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if (bookId) {
            axios.get("http://localhost:8080/rest/books/" + bookId)
                .then(response => {
                    if (response.data != null) {
                        this.setState({
                            id: response.data.id,
                            title: response.data.title,
                            author: response.data.author,
                            coverPhotoURL: response.data.coverPhotoURL,
                            isbnNumber: response.data.isbnNumber,
                            price: response.data.price,
                            language: response.data.language,
                            available: response.data.available
                        });
                    }

                }).catch((error) => {
                console.error(error);
            });

        }
    }

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.edited = false;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    submitBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            available: this.state.available
        };

        axios.put("http://localhost:8080/rest/books",book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.setState({"edited":true}), 1500);
                } else {
                    this.setState({"show":false});
                    this.setState({"edited":false});
                }
            });
    };


    resetBook = () => {
        this.setState(()=> this.initialState);
    };

    bookChange = event => {

        const target = event.target;
        const value = target.name === "available" ? target.checked : target.value;

        this.setState({
            [target.name] : value
        });
    };



    render() {
        if (this.state.edited === true){
            return (
                <Redirect to = {{ pathname: "/list" }} />
            )
        }
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <ToastSuccess children={{show: this.state.show, message:"Pomyślnie edytowano książkę!"}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Edytuj książkę</Card.Header>
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
                            <Form.Row>
                                <Form.Group controlId="formGridAvailable">
                                    <Form.Label>
                                        Dostępna:
                                    </Form.Label>
                                    {' '}
                                    <input
                                        name="available"
                                        type="checkbox"
                                        checked={this.state.available}
                                        onChange={this.bookChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{'  '}
                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faEdit} /> Zapisz
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>


        );
    }
}

export default BookEdit;