import React from 'react';

import {Card, Table, Image, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faList, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import axios from "axios";


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


    render() {
        return(
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
                                                <Button variant="outline-primary"><FontAwesomeIcon icon={faEdit}/></Button>
                                                {' '}
                                                <Button variant="outline-danger"><FontAwesomeIcon icon={faTrash}/></Button>
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
        );
    }
}

export default BookList;