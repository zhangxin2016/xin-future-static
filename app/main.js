//main.js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import All from './modules/articlelist'
import Info from './modules/articelInfo'
//require("./css/style.css"); //全局引用css


ReactDom.render((
    <Router>
        <div>
            <ul>
                <li><Link to="/list">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <hr />
            <Route exact path="/list" component={All} />
            <Route path="/about" component={Info} />
        </div>
    </Router>
), document.getElementById('content'));
