import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" className="custom-signout" onClick={firebase.doSignOut}>
    Se déconnecter
  </button>
);

export default withFirebase(SignOutButton);
