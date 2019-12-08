import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Col, Form } from 'react-bootstrap';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <Container className="custom-h1">
    <h1>Mot de passe oublié :</h1>
    <PasswordForgetForm />
    </Container>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <>
      <Form 
        onSubmit={this.onSubmit}
        >
        <Form.Row>
          <Col className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email"
            />
          </Col>
          <Col  className="margin-top-bot">
            <Button 
              disabled={isInvalid}
              className="custom-button"
              size="lg"
              type="submit">
              Reset mon mot de passe
            </Button>
            {error && <p>{error.message}</p>}
          </Col>
        </Form.Row>
      </Form>
      </>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Mot de passe oublié ?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
