import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Container, Button, Col, Form, Row} from 'react-bootstrap'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <Container className="custom-h1">
    <h1>
    Créer un compte : 
    </h1>
    <SignUpForm />
  </Container>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <>
      <Form 
        onSubmit={this.onSubmit}
        >
        <Form.Row>
          <Col className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Pseudonyme" />
          </Col>
          <Col  className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email" />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col  className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Mot de passe"/>
         </Col>
         <Col  className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirmer le mdp" />
         </Col>
        </Form.Row>
          <Row className="margin-top-bot justify-content-md-center">
            <Button 
            disabled={isInvalid}
            className="custom-button"
            size="lg"
            type="submit">
            Inscription
            </Button>
            {error && <p>{error.message}</p>}
          </Row>
        </Form>

      </>
    );
  }
}

const SignUpLink = () => (
  <p>
    Pas de compte ? <Link to={ROUTES.SIGN_UP}>Créer un compte</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
