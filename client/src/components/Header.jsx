import React from 'react';
import { Link } from 'react-router-dom';
export default function Header(props) {

  return (
    <header>
      <h1>Brazilian Artist Page</h1>
      <nav>
        <Link to="/">Artists</Link>
        <Link to={`/new`}>Create</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}