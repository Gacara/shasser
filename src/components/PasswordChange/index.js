import React, { Component } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <>
      <Form 
        onSubmit={this.onSubmit}
        >
        <Form.Row>
          <Col className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Nouveau mot de passe"
            />
          </Col>
          <Col className="margin-top-bot">
            <Form.Control 
              size="lg"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirmer le mot de passe"
            />
          </Col>
          <Col className="margin-top-bot">
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

export default withFirebase(PasswordChangeForm);
