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
import chromaoff from '../../img/chromaoff.png';
import chromaon from '../../img/chromaon.png';
import pokeballopen from '../../img/pokeball.png';

const ShassePage = () => (
  <div>
    <Shasse />
  </div>
);

class ShasseBase extends React.Component{

  constructor(props) {
    super(props);
    this.state = {  
      img : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().replace(/[. ]/g, '').includes(this.props.match.params.name),)[0].img,
      name : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().replace(/[. ]/g, '').includes(this.props.match.params.name),)[0].name,
      num : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().replace(/[. ]/g, '').includes(this.props.match.params.name),)[0].num,
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
    const pokeName = this.state.name.replace(/[. ]/g, '');
    const path = this;
    
    firebase.pokemon(userId,pokeName).once("value", function(data) {
      if (data.val()){
      const cpt= data.val().compteur;
      const chr= data.val().chroma;
      const cap= data.val().capture;
      path.setState({
      chroma: chr,
      compteur: cpt,
      capture: cap,
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
  .pokemon(firebase.auth.W,name.replace(/[. ]/g, ''))
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
  if ( !event.target.value){
    this.setState({ [event.target.name]: 0 });
    event.target.value = 0;
  }
    this.setState({ [event.target.name]: Math.abs(parseInt(event.target.value, 10))});
};

incrementCount = () => {
  this.setState({
    compteur: +this.state.compteur +1,
  })
}

decrementCount = () => {
  this.setState({
    compteur:this.state.compteur-1,
  })
  if (this.state.compteur <= 0){
    this.setState({
      compteur:0,
    })
  }
}

handleSubmit(ev){
  this.setState({
    compteur: new FormData(ev.currentTarget).get('compteur'),
});
  ev.preventDefault();
}

onToggleChroma = () => {
  this.setState({
    chroma: !this.state.chroma,
  })
}

onToggleCapture = () => {
  this.setState({
    capture: !this.state.capture,
  })
}

    render(){
      const {num, name, img, error, compteur, chroma, capture} = this.state;

      return (
       
        <div className="Landing">
        <div className="Landing-header">
        <Container>
          <Row className="justify-content-md-center">
            <Col sm={4}>
            {
              chroma ? 
              (<Bouton
                className ="custom-toggle-chroma"
                title = { "Enlever le Charme Chroma" }
                task = { () => this.onToggleChroma() }
                />) 
              : 
              (<Bouton
                className ="custom-toggle-chroma"
                title = { "Mettre le Charme Chroma" }
                task = { () => this.onToggleChroma() }
                />)  
            }
            {
              chroma ? (<Image rounded className="chroma-img" src={chromaon} alt="chroma-ON"/>) : (<Image rounded className="chroma-img" src={chromaoff} alt="chroma-OFF"/>)
            }
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
            <h2>Rencontres :</h2>
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
              className="round-button"
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
          <Col className="d-flex justify-content-center align-items-center" sm={4}>    
          <p>Proba Shiny : </p>
          <p>&nbsp;</p>
            {
              chroma ? <WithChroma compteur={compteur} /> : <WithoutChroma  compteur={compteur} />   
            }
          </Col>
          
          <AuthUserContext.Consumer>
              {
              (authUser) =>
              !authUser ? (<Col className="d-flex justify-content-center align-items-center" sm={4}><p>Capture impossible sans compte</p></Col>) : 
              (<Col className="d-flex justify-content-center align-items-center" sm={4}>
          {
              capture ? 
              (<Bouton
                className ="custom-toggle-capture"
                title = { "Libérer le Shiny" }
                task = { () => this.onToggleCapture() }
                />) 
              : 
              (<Bouton
                className ="custom-toggle-capture"
                title = { "Capturer le Shiny" }
                task = { () => this.onToggleCapture() }
                />)  
            }
            {
              capture ? (<Image className="capture-img" src={pokeballopen} alt="pokeball-OPEN"/>) : (<Image roundedCircle className="capture-img" src={img} alt="pokemon-libre"/>)
            }
          </Col>)  
              }
            </AuthUserContext.Consumer>
            
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
    value={props.name.replace(/[. ]/g,'')}
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
    Pour ajouter des Pokémons à votre dashboard, veuillez vous 
    <Link to={ROUTES.SIGN_IN}> connecter</Link>
  </p>
);

const Shasse = withRouter(withFirebase(ShasseBase));

export default ShassePage;

export { Shasse, SignInLink};