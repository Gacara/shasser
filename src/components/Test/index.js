import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const AddPokemonPage = () => (
  <div>
    <h1>Ajouter un pokemon</h1>

    <AddPokemon />
  </div>
);




const INITIAL_STATE = {
  name: 'Sobble',
  pid: '7',
  uid: '',
  img: "https://www.serebii.net//swordshield/pokemon/small/738.png",
  error: '',

};




class AddPokemonBase extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };
  }
  
 

  onSubmit = event => {
    const {  name, pid, uid, img} = this.state;
    const firebaseTemp = this.props.firebase;
    console.log(firebaseTemp.auth.W);

    this.props.firebase

    .pokemon(firebaseTemp.auth.W)
    .push({
      name,
      pid,
      img,
    })


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
    const {
      name,
      img,
      pid,
      error,
    } = this.state;

  

    return (

      <>
      <div className="card-header">

      <p className="custom-name">{pid} - {name}</p>
      <img className="" src={img} alt ={name}/> 
      
      </div>
      
      <AuthUserContext.Consumer>
      {authUser =>
        !authUser ? (<SignInLink/>) : (<SubmitPokemon  onChange={this.onChange}onSubmit={this.onSubmit} name={name} pid={pid} error={error} />)  
      }
    </AuthUserContext.Consumer>
     
      </>
    );
  }
}

const SignInLink = () => (
  <p>
    Pour ajouter des Pokémons à votre dashboard, veuillez vous connecter <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const SubmitPokemon = (props) => (

  
  <form onSubmit={props.onSubmit}>
  <input
    name="name"
    value={props.name}
    onChange={props.onChange}
    type="text"
    placeholder="Name"
  />
  <input
    name="pid"
    value={props.pid}
    onChange={props.onChange}
    type="text"
    placeholder="pid"
  />

  <button  type="submit">
    Ajouter {props.name}
  </button>

  {props.error && <p>{props.error.message}</p>}
</form>

);



const AddPokemon = withRouter(withFirebase(AddPokemonBase));

export default AddPokemonPage;

export { AddPokemon, SignInLink};


