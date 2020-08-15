import React from 'react'
import {Card, Button, Form} from "react-bootstrap";
import AuthenticationService from '../AuthenticationService'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons/faSignInAlt";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
    loginClicked() {
        if(this.state.username==='admin' && this.state.password==='dummy'){
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
            this.setState({showSuccessMessage:true});
            this.setState({hasLoginFailed:false});
            window.location.reload();
        }
        else {
            this.setState({showSuccessMessage:false});
            this.setState({hasLoginFailed:true});
        }
    }
    render() {
        return (
            <Card style={{width: '30rem'}} className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faSignInAlt} /> Logowanie</Card.Header>
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Nieprawidłowe dane</div>}
                    {this.state.showSuccessMessage && <div>Logowanie zakończone powodzeniem!</div>}
                    <Card.Body>
                <Form.Row>
                    <Form.Label>użytkownik: </Form.Label>
                    <Form.Control required autoComplete="off"
                                  type="text" name="username"
                                  value={this.state.username}
                                  placeholder="podaj nazwę użytkownika"
                                  onChange={this.handleChange} />
                </Form.Row>
                <Form.Row>
                    <Form.Label>hasło: </Form.Label>
                    <Form.Control required autoComplete="off"
                                  type="password" name="password"
                                  value={this.state.password}
                                  placeholder="podaj hasło użytkownika"
                                  onChange={this.handleChange} />
                </Form.Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" onClick={this.loginClicked} type="submit">Zaloguj</Button>
                    </Card.Footer>
            </Card>
        )
    }
}
export default Login