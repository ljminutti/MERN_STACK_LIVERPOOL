import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-lg p-3 " style={{backgroundColor: '#E10098'}}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="material-icons">
              assignment </i> Reto Liverpool
    </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/list" className="nav-link">Catalogo</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">Alta de Productos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}