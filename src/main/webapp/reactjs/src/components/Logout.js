import React from 'react'
import {Jumbotron} from "react-bootstrap";

class Logout extends React.Component{
    render() {
        return(
        <Jumbotron className="bg-dark text-white">
            <h1>Użytkownik został wylogowany</h1>
            <p>
                Dziękujemy za przeglądanie naszej księgarni.
            </p>
        </Jumbotron>
        )
    }
}

export default Logout