import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class CharacterProfile extends Component {
  state = {
    currentCharacter: null
  }

  componentDidMount() {
    this.setCurrentCharacter()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.characterId !== this.props.characterId) {
      this.setCurrentCharacter()
    }
  }

  setCurrentCharacter = () => {
    const currentCharacter = this.props.characters.find(character => {
      return character.id === parseInt(this.props.characterId)
    })
    this.setState({ currentCharacter })
  }

  render() {
    const { currentCharacter } = this.state;

    let divStyle = { backgroundImage: "" };
    if (currentCharacter) {
      divStyle.backgroundImage = `url(${currentCharacter.image_url})`;
    }
    return (
      <div className="main" >
        {currentCharacter && (
          <div id="character-profile" style={divStyle}>
            <h1>{currentCharacter.name}</h1>
            <div className="info">{currentCharacter.description}</div>
            <h3>Fun Fact!</h3>
            <div className="info">{currentCharacter.fun_fact}</div>
            <h3>Quote</h3>
            <div className="info">{currentCharacter.quote}</div>
            <button onClick={() => {
              this.props.destroyCharacter(currentCharacter.id)
            }}>DELETE</button>
            <Link to={`/characters/${currentCharacter.id}/edit`}><button>EDIT</button></Link>
          </div>
        )}
      </div>
    )
  }
}
