//alert('react goes here');
import React,{Component} from 'react';
import {render} from 'react-dom';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyCx6FgLhlxgUybrNecbjfaC7WmCdl0VUnA",
    authDomain: "fd-cloud-functions-demo-ca2be.firebaseapp.com",
    databaseURL: "https://fd-cloud-functions-demo-ca2be.firebaseio.com",
    projectId: "fd-cloud-functions-demo-ca2be",
    storageBucket: "fd-cloud-functions-demo-ca2be.appspot.com",
    messagingSenderId: "184858271141",
    appId: "1:184858271141:web:e8c3912331d91e4b"
});

//import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import CreateProduct from './CreateProduct';
import ProductList from './ProductList';

import Landing from './Landing';

function App() {
    return (
      <div className="App">
        <Router>
          <Navigation/>
          <Route path="/" exact component={Landing} />
          <Route path="/list" exact component={ProductList} />
          <Route path="/create" component={CreateProduct} />
        </Router>
      </div>
    );
  }

render(<App/>,document.getElementById('app'));