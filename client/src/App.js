import React from 'react';
import './App.css';
import { getCharacters, postCharacter, deleteCharacter, putCharacter } from './services/api-helper';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Link, withRouter } from 'react-router-dom';
import About from './components/About';
import CharacterCreate from './components/CharacterCreate';
import CharacterProfile from './components/CharacterProfile';
import CharacterUpdate from './components/CharacterUpdate';
import CharacterList from './components/CharacterList';


class App extends React.Component {
  state = {
    characters: []
  }

  componentDidMount() {
    this.readAllCharacters();
  }


  readAllCharacters = async () => { // Gets all the artists 
    const characters = await getCharacters();
    this.setState({ characters })
  }


  createCharacter = async (characterData) => { // Create new artist
    const newCharacter = await postCharacter(characterData);
    this.setState(prevState => ({
      characters: [...prevState.characters, newCharacter]
    }))
    this.props.history.push('/')
  }


  destroyCharacter = async (id) => {
    await deleteCharacter(id);
    this.setState(prevState => ({
      characters: prevState.characters.filter(character => { // Delete an artist
        return character.id !== id
      })
    }))
    this.props.history.push('/')
  }


  updateCharacter = async (id, characterData) => { // Update an artist
    const updatedCharacter = await putCharacter(id, characterData);
    this.setState(prevState => ({
      characters: prevState.characters.map(character => {
        return character.id === parseInt(id) ? updatedCharacter : character
      })
    }))
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="app" >
        <Header />
        <Route path="/about" render={() => (<About />)} />
        <Route exact path='/' render={() => (
          <CharacterList
            characters={this.state.characters}
          />
        )} />
        <Route exact path='/characters/:id' render={(props) => (
          <CharacterProfile
            characters={this.state.characters}
            characterId={props.match.params.id}
            destroyCharacter={this.destroyCharacter}
          />
        )} />
        <Route path='/new' render={() => (
          <CharacterCreate
            createCharacter={this.createCharacter}
          />
        )} />
        <Route path='/characters/:id/edit' render={(props) => (
          <CharacterUpdate
            updateCharacter={this.updateCharacter}
            characters={this.state.characters}
            characterId={props.match.params.id}
          />
        )} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
