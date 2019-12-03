import React from 'react';
import data from '../../data.json';
import {Image, Container, Row, Col} from 'react-bootstrap'
import Bouton from '../Bouton';

class Shasse extends React.Component{

  state = {
    img : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().includes(this.props.match.params.name),)[0].img,
    name : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().includes(this.props.match.params.name),)[0].name,
    num : data.pokemons.filter(pokemons=>pokemons.name.toLowerCase().includes(this.props.match.params.name),)[0].num,
    compteur : 0,
};

incrementCount= () => {
  this.setState({
    compteur:this.state.compteur+1
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
      const {num, name, img, compteur} = this.state;

      return (
       
        
    <div className="Landing">
      <header className="Landing-header">
      <Container>
      
  <Row>
    <Col xs={12} md={12}>
    <h2>{num} - {name}</h2>
      <Image  rounded  src={img} alt={name}/>
    </Col>
    <Col xs={6} md={4}>
    <Bouton
        title = { "-" }
        task = { () => this.decrementCount() }
      />
      </Col>
      <Col xs={6} md={4}>
    <h2>Compteur: { compteur } </h2>
    
   
    </Col>
    <Col xs={6} md={4}>
      <Bouton
        title = { "+" }
        task = { () => this.incrementCount() }
      />
      </Col>
      
  </Row>
</Container>
        </header>
        <a className="custom-a custom-a-bis" href="/">Retour</a>
    </div>
  );
}
}

export default Shasse;

