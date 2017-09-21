//main.js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import All from './modules/articlelist'
import Info from './modules/articelInfo'
import ArticleType from './components/ArticleType.jsx';
//require("./css/style.css"); //全局引用css
ReactDom.render((
    <ArticleType/>
), document.getElementById('typeContent'));

ReactDom.render((
    <Router>
        <div>
            <Route exact path="/list" component={All} />
            <Route path="/" component={All} />
            <Route path="/info" component={Info} />
        </div>
    </Router>
), document.getElementById('articleAll'));

