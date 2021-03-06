import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

render(
  <Container fluid={true}>
  <Router>
    <App />
  </Router>
    </Container>
  ,document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
