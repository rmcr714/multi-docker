import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className="App">

      <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Calculator
          </a>
    <h3 >React Apllication</h3>
          <Link to='/'>Home   </Link>&nbsp;
          <Link to='/otherpage'>Other Page</Link>
       
        <div>
          <br/>
          
          <hr/>
          <Route  path='/' component={Fib} exact/>
          <Route path='/otherpage' component={OtherPage} exact/>
        </div>
      </div>
    </Router>
  );
}

export default App;
