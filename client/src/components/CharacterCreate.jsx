import React, { Component } from 'react'

export default class CharacterCreate extends Component {
  state = {
    name: '',
    image_url: '',
    fun_fact: '',
    quote: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <section className="contact">
        <h1>Add An Artist</h1>
        <form className="contact" onSubmit={(e) => {
          e.preventDefault();
          this.props.createCharacter(this.state)
        }}>
          {/* <label htmlFor="name">name</label> */}
          <input
            placeholder="enter a name"
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          {/* <label htmlFor="image_url">image url</label> */}
          <input
            placeholder="enter an image url"
            type="text"
            name="image_url"
            id="email"
            value={this.state.image_url}
            onChange={this.handleChange}
          />
          {/* <label htmlFor="fun_fact">fun fact</label> */}
          <input
            placeholder="bio"
            type="text"
            name="message"
            id="message"
            value={this.state.fun_fact}
            onChange={this.handleChange}
          />
          {/* <label htmlFor="quote">Quote</label> */}
          {/* <input
            type="text"
            name="quote"
            id="submit"
            value={this.state.quote}
            onChange={this.handleChange}
          /> */}
          <button>Submit</button>
        </form>
      </section>
    )
  }
}
