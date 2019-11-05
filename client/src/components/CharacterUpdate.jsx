import React, { Component } from 'react'

export default class CharacterUpdate extends Component {
  state = {
    name: '',
    image_url: '',
    fun_fact: '',
    quote: ''
  }

  componentDidMount() {
    this.setFormData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.characters !== this.props.characters) {
      this.setFormData()
    }
  }

  setFormData = () => {
    if (this.props.characters.length) {
      const {
        name,
        image_url,
        description,
        fun_fact,
        quote
      } = this.props.characters.find(character => {
        return character.id === parseInt(this.props.characterId)
      })
      this.setState({
        name,
        image_url,
        fun_fact,
        quote
      })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="main">
        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          this.props.updateCharacter(this.props.characterId, this.state)
        }}>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="image_url">image url</label>
          <input
            type="text"
            name="image_url"
            id="image_url"
            value={this.state.image_url}
            onChange={this.handleChange}
          />
          <label htmlFor="fun_fact">fun fact</label>
          <input
            type="text"
            name="fun_fact"
            id="fun_fact"
            value={this.state.fun_fact}
            onChange={this.handleChange}
          />
          <label htmlFor="quote">fun fact</label>
          <input
            type="text"
            name="quote"
            id="quote"
            value={this.state.quote}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
