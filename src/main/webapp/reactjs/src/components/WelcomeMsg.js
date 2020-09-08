import React from 'react';
import {Jumbotron} from "react-bootstrap";

class WelcomeMsg extends React.Component{
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Witamy w eBookStore!</h1>
                <p>
                </p>
                <p>
                </p>
                <p>
                    Ta strona jest prostą aplikacją webową przedstawiającą dostępne książki w księgarni.
                </p>
                <p>
                    Użytkownik może przeglądać i wyszukiwać interesujące go książki, a po zalogowaniu ma możliwość edytowania, dodawania nowych i usuwania książek.
                </p>
            </Jumbotron>
        )
    }
}

export default WelcomeMsg;