import data from '../../data.json';
import {Image, Container, Row, Col} from 'react-bootstrap'
import Bouton from '../Bouton';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const ShassePage = () => (
  <div>
    <Shasse />
  </div>
);

class ShasseBase extends React.Component{

  constructor(props) {
    super(props);
    
    this.state = {  
      img : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().includes(this.props.match.params.name),)[0].img,
      name : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().includes(this.props.match.params.name),)[0].name,
      num : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().includes(this.props.match.params.name),)[0].num,
      compteur : 0,
      error: '', 
      user: null
    };
  }

componentDidMount(){

  const {firebase} = this.props;
  firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    this.setState({user})
    
    const userId = this.state.user.uid;
    const pokeName = this.state.name;
    const path = this;

    firebase.pokemon(userId,pokeName).once("value", function(data) {
      if (data.val()){
      const cpt= data.val().compteur;
      path.setState({
      compteur: cpt,
        }); 
      }
    }); 
   }
  })
};

componentWillUnmount() {
  this.props.firebase.pokemon().off();
};

onSubmit = (event) => {
  const {  name, num, compteur, img} = this.state;
  const {firebase} = this.props;

  firebase
  .pokemon(firebase.auth.W,name)
  .set({
    num,
    img,
    compteur,
  })
  event.preventDefault();
};

onChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};

incrementCount= () => {
  this.setState({
    compteur: +this.state.compteur +1,
  })
}

decrementCount= () => {
  this.setState({
    compteur:this.state.compteur-1,
  })
  if (this.state.compteur <= 0 ){
    this.setState({
      compteur:0,
    })
  }
}

handleSubmit(ev){
  ev.preventDefault();
  this.setState({
      compteur: new FormData(ev.currentTarget).get('compteur'),
  });
}

    render(){
      const {num, name, img, error} = this.state;

      return (
       
        
    <div className="Landing">
      <header className="Landing-header">
      <Container>
      
  <Row>
    <Col xs={12} md={12}>
    <h2>{num} - {name}</h2>
      <Image  className="info" src={img} alt={name}/>
    </Col>
    <Col xs={6} md={4}>
    <Bouton
        title = { "-" }
        task = { () => this.decrementCount() }
      />
      </Col>
      <Col xs={4} md={4}>
    <h2>Vu :</h2>
    <input
    className="custom-input"
    name="compteur"
    value={this.state.compteur}
    onChange={this.onChange}
    type="number"
  />
   
    </Col>
    <Col xs={4} md={4}>
      <Bouton
        title = { "+" }
        task = { () => this.incrementCount() }
      />
      </Col>
      
  </Row>
</Container>

<AuthUserContext.Consumer>
      {authUser =>
        !authUser ? (<SignInLink/>) : (<SubmitPokemon  onChange={this.onChange}onSubmit={this.onSubmit} name={name} num={num} error={error} />)  
      }
    </AuthUserContext.Consumer>
        </header>
        <a className="custom-a custom-a-bis" href={ROUTES.LANDING}>Retour</a>
    </div>
  );
}
}

const SubmitPokemon = (props) => (

  <form onSubmit={props.onSubmit}>
  <input
  hidden
    name="name"
    value={props.name}
    onChange={props.onChange}
    type="text"
    placeholder="Name"
  />
  <input
  hidden
    name="num"
    value={props.num}
    onChange={props.onChange}
    type="text"
    placeholder="pid"
  />

  <button className="custom-a custom-a-bis" type="submit">
    Mettre à jour {props.name}
  </button>
  {props.error && <p>{props.error.message}</p>}
</form>
);

const SignInLink = () => (
  <p>
    Pour ajouter des Pokémons à votre dashboard, veuillez vous connecter 
    <Link to={ROUTES.SIGN_IN}>Se connecter</Link>
  </p>
);

const Shasse = withRouter(withFirebase(ShasseBase));

export default ShassePage;

export { Shasse, SignInLink};