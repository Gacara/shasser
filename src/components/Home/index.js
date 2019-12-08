import React, { Component } from 'react';
import pokeball from '../../img/pokeball.png';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empty: false,
      loading: false,
      pokemons: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const { firebase } = this.props;

    firebase
      .pokemons(firebase.auth.W).on('value', (snapshot) => {
        const pokemonsObject = snapshot.val();
        if (pokemonsObject) {
          const pokemonsList = Object.keys(pokemonsObject).map((key) => ({
            ...pokemonsObject[key],
            name: key,
          }));

          this.setState({
            pokemons: pokemonsList,
            loading: false,
            empty: false,
          });
        } else {
          this.setState({
            loading: true,
            empty: true,
          });
        }
      });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.pokemons(firebase.auth.W).off();
  }

  render() {
    const { pokemons, loading, empty } = this.state;

    return (
      <div className="Landing">
        <header className="Landing-header">
          <div className="container">
            <h1>Tableau de chasse</h1>

            {loading && <div>Chargement ...</div>}
            {empty && <div>Vous n'avez croisé aucun Pokemon !</div>}
            <PokemonList pokemons={pokemons} />
          </div>
        </header>
      </div>
    );
  }
}

const PokemonList = ({ pokemons }) => (

  <div className="row">
    {pokemons.map((pokemon) => (
      <div key={pokemon.num} className="col-md-3 col-sm-6 mb-5">
        <a href={`/pokemon/${pokemon.name.toLowerCase()}`} className="card">
          <div className="custom-card-header card-header">
            <p className="custom-name">
              {pokemon.num}
  -
              {pokemon.name}
            </p>
            {
                pokemon.capture
                  ?
                  (<img className="icon" src={pokeball} alt={pokemon.name} />)
                  : (<></>)
              }
            <img className="" src={pokemon.img} alt={pokemon.name} />
          </div>
        </a>
        <p>
          {`Vu ${pokemon.compteur} fois `}
        </p>
      </div>
    ))}
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(DashboardPage));
