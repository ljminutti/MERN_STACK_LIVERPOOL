import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'

class Landing extends Component {

    render() {
        return (
            <div>
                <h1 className="text-center">Bienvenido a mi aplicacion WEB</h1>
                <h4 className="text-center">Mi nombre es Luis Javier Minutti Robles </h4>
                <h5 className="text-center">Se realizo este sistema utilizando el stack MERN (Mongo DB, Express, React y Node) </h5>
                <p className="text-center">En la parte superior derecha puedes dar click sobre "Catalogo" para ver los productos que estan dados de alta
                en la base de Mongo DB.</p>
                <p className="text-center"> Mientras que en "Alta de Productos" prodas dar de Alta nuevos productos
          (con su nombre, precio e imagen) asi como editar los ya existentes.</p>
                <p className="text-center">Para el servidor de imagenes se utiliza Firebase y en la base de datos Mongo DB Atlas</p>
                <img className="rounded mx-auto d-block" src="https://www.visions.net.in/sites/default/files/images/mern2/business.png" alt="MERN" />
           </div>     
        )
    }
}
export default Landing;


