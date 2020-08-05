import React from 'react';

import {Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faList} from "@fortawesome/free-solid-svg-icons"


class BookList extends React.Component {
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
                            <tr align="center">
                                <td colSpan="6">Brak dostępnych książek.</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

export default BookList;