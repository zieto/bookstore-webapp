import React from 'react';

import {Card, Table, Image, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faList, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import ToastSuccess from "./ToastSuccess";


class BookList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            books : []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/rest/books")
            .then(response => response.data)
            .then((data) =>{
                this.setState({books: data});
            });
    }

    deleteBook = (bookId) => {
        axios.delete("http://localhost:8080/rest/books/"+bookId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        books: this.state.books.filter(book => book.id !== bookId)
                    });
                } else {
                    this.setState({"show":false});
                }
            })
    };


    render() {
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <ToastSuccess children={{show:this.state.show, message:"Pomyślnie usunięto książkę", type:"danger"}}/>
                </div>
            <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header><FontAwesomeIcon icon={faList} /> Lista książek</Card.Header>
                <Card.Body>
                    <Table>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Tytuł</th>
                                <th>Autor</th>
                                <th>Cena</th>
                                <th>Język</th>
                                <th>Nr ISBN</th>
                                <th>Opcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.books.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">Brak dostępnych książek.</td>
                                </tr> :
                                    this.state.books.map((book) =>(
                                        <tr key={book.id}>
                                            <td>
                                                <Image src={book.coverPhotoURL} roundedCircle width="25" height="25"/>
                                                {' '}{book.title}
                                            </td>
                                            <td>{book.author}</td>
                                            <td>{book.price}</td>
                                            <td>{book.language}</td>
                                            <td>{book.isbnNumber}</td>
                                            <td>
                                                <Button href={"edit/"+book.id} variant="outline-primary"><FontAwesomeIcon icon={faEdit}/></Button>
                                                {' '}
                                                <Button variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                            </td>
                                        </tr>
                                        )
                                    )
                            }
                            </tbody>
                        </Table>
                    </Table>
                </Card.Body>
            </Card>
            </div>
        );
    }
}

export default BookList;