import React from 'react';
import Info from '../Info';

const List = ({ data }) => (
  <div className="row">
    {data.pokemons.map((pokemons, index) => (
      <Info key={`pokemons`+ index} {...pokemons} />
    ))}
  </div>
);

export default List;
