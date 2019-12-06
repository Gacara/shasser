import data from '../../data.json';
import {Image, Container, Row, Col, Table} from 'react-bootstrap'
import Bouton from '../Bouton';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Proba from '../Table';
import WithChroma from '../Calcul/WithChroma';
import WithoutChroma from '../Calcul/WithoutChroma';

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
      compteur: 0,
      capture: false,
      chroma: false,
      error: '', 
      user: null,
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
      const chr= data.val().capture;
      const cap= data.val().chroma;
      path.setState({
      compteur: cpt,
      capture: cap,
      chroma: chr,
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
  const { name, num, compteur, img, capture, chroma} = this.state;
  const {firebase} = this.props;

  firebase
  .pokemon(firebase.auth.W,name)
  .set({
    num,
    img,
    compteur,
    chroma,
    capture,
  })
  event.preventDefault();
};

routeChange(){
  const path = `/`;
  this.props.history.push(path);
}

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
      const {num, name, img, error, compteur, chroma} = this.state;

      return (
       
        <div className="Landing">
        <div className="Landing-header">
        <Container>
          <Row className="justify-content-md-center">
            <Col sm={4}>
            </Col>
          <Col className="d-flex justify-content-center align-items-center" sm={4}>
            <h2>
              {`${num} - ${name}`}
            </h2>
          </Col>
          <Col sm={4}>
            <AuthUserContext.Consumer>
              {
              (authUser) =>
              !authUser ? (<SignInLink/>) : (<SubmitPokemon  onChange={this.onChange} onSubmit={this.onSubmit} name={name} num={num} error={error} />)  
              }
            </AuthUserContext.Consumer>
          </Col>
          </Row>
          
          <Row className="justify-content-md-center">
          <Col sm={4}>
              <Proba/>
          </Col>
          <Col sm={4}>
            <Image className="info" src={img} alt={name}/>
            <h2>Vu :</h2>
              <input
              className="custom-input"
              name="compteur"
              value={this.state.compteur}
              onChange={this.onChange}
              type="number"
              />
          </Col>
          <Col sm={4}>
          <Table className="custom-table" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Masuda </th>
                <th>Sans Chroma</th>
                <th>Avec Chroma</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Oeuf</td>
                <td>1/683</td>
                <td>1/512</td>
              </tr>
            </tbody>
          </Table>
          <Bouton
              title = { "+" }
              task = { () => this.incrementCount() }
              />
          </Col>
          </Row>
          <Row className="justify-content-md-center">
          
          <Col sm={12}>
          </Col>
  
          </Row>
          <Row className="justify-content-md-center">
          <Col sm={4}>
            <button onClick={this.routeChange.bind(this)} className="custom-refresh-button">
              Retour
            </button>
          </Col>
          <Col sm={4}>    
            {
              !{chroma} ? (<WithChroma compteur={compteur} />) : (<WithoutChroma  compteur={compteur} />)  
            }
          </Col>
          <Col sm={4}>
          </Col>
          </Row>
        </Container>  
        </div>
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

  <button className="custom-upload-button" type="submit">
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