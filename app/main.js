//main.js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import All from './modules/articlelist'
import Info from './modules/articelInfo'
import ArticleType from './components/ArticleType.jsx';
import Component1 from './components/Component.jsx';
//require("./css/style.css"); //全局引用css
/*ReactDom.render((
    <ArticleType/>
), document.getElementById('app'));*/

ReactDom.render((
    <Router>
        <div>
            <Route exact path="/" component={ArticleType} />
            <Route path="/list" component={All} />
            <Route path="/info" component={Info} />
        </div>
    </Router>
), document.getElementById('app'));

