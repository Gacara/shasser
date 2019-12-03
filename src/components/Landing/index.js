import React from 'react';
import Liste from '../List';
import data from '../../data.json';

const Landing = () => {
  
  /*const filteredPokemons = data.pokemons.filter(pokemons=>
    pokemons.name.toLowerCase().includes(this.state.value.toLowerCase()),
    )*/
  
  return (
  
    <div className="Landing">
    <header className="Landing-header">
      <div className="container">
      <Liste data={data} />
      </div>
      </header>
    </div>
);
}

export default Landing;
