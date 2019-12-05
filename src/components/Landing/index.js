import React from 'react';
import Liste from '../List';
import data from '../../data.json';

const Landing = () => (

  <div className="Landing">
    <header className="Landing-header">
      <h1>
          Chasse
        <code> au </code>
          Shiny
        <code> = </code>
          Shasser
      </h1>
      <p>
          Shasser les
        <code> TOUS </code>
      </p>
      <div className="container">
        <Liste data={data} />
      </div>
    </header>
  </div>
);

export default Landing;
