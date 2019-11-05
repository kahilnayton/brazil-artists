import React from 'react'
import { Link } from 'react-router-dom'

export default function CharacterList(props) {
  return (
    <div className="main">
      {props.characters.map(character => (
        <div className="character-main">
          <h2>{character.name}</h2>
          <img src={character.image_url} />
          <Link to={`/characters/${character.id}`}><button>View Profile</button></Link>
        </div>
      ))}
    </div>
  )
}
