import React from 'react';
import { Container} from 'react-bootstrap';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <Container className="custom-h1">
        <h1>
          Account :
          &nbsp;
          {authUser.email}
        </h1>
        <PasswordChangeForm />
      </Container>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
