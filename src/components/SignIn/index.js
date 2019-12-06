import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {Container, Button, Col, Form, Row} from 'react-bootstrap'
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <Container className="custom-h1">
    <h1>
    Se connecter : 
    </h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </Container>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <>
      <Form onSubmit={this.onSubmit}>
        <Form.Row>
        <Col  className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email"
            />
          </Col>
          <Col  className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Mot de passe"
            />
         </Col>
        </Form.Row>
          <Row className="margin-top-bot justify-content-md-center">
            <Button 
            disabled={isInvalid}
            className="custom-button"
            size="lg"
            type="submit">
            Connexion
            </Button>
            {error && <p>{error.message}</p>}
          </Row>
        </Form>
      </>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
