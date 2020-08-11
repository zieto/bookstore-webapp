import React from 'react';

import {Card, Table, Image, Button, FormControl, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faList, faEdit, faTrash, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import ToastSuccess from "./ToastSuccess";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";


class BookList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            books : [],
            search : ''
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

    icon(tf){
        if (tf === "true"){
            return <FontAwesomeIcon icon={faCheck}/>
        }
        else if (tf === "false"){
            return <FontAwesomeIcon icon={faTimes}/>
        }
    }

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
    };

    searchData = () => {
        axios.get("http://localhost:8080/rest/books/search/"+this.state.search+"?")
            .then(response => response.data)
            .then((data) =>{
                this.setState({books: data});
            });
    };



    render() {

        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <ToastSuccess children={{show:this.state.show, message:"Pomyślnie usunięto książkę", type:"danger"}}/>
                </div>
            <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
                <div style={{"float":"left"}}>
                <FontAwesomeIcon icon={faList} /> Lista książek
                </div>
                <div style={{"float":"right"}}>
                    <InputGroup>
                        <FormControl placeholder="Szukaj" name="search" value={this.state.search} className={"bg-dark text-white"}
                            onChange={this.searchChange}
                            />
                            <Button variant="outline-info" type="button" onClick={this.searchData}>
                                <FontAwesomeIcon icon={faSearch}/>
                            </Button>
                            <Button variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Button>
                    </InputGroup>
                </div>
            </Card.Header>
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
                                <th>Dostępna</th>
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
                                            <td>{this.icon(book.available.toString())}</td>
                                            <td>
                                                <Button href={"edit/"+book.id} variant="outline-primary"><FontAwesomeIcon icon={faEdit}/></Button>
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