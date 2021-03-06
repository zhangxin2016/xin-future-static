//main.js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, IndexRoute} from 'react-router-dom';
import All from './modules/articlelist'
import Info from './modules/articelInfo'
import ArticleType from './components/ArticleType.jsx';
import AllArticleType from './components/AllArticleType.jsx';
import Component1 from './components/Component.jsx';
import allList from './modules/articleAll'
//require("./css/style.css"); //全局引用css
/*ReactDom.render((
    <ArticleType/>
), document.getElementById('app'));*/

ReactDom.render((
    <Router>
        <div>
            <Route exact path="/" component={allList} />
            <Route path="/list" component={All} />
            <Route path="/info" component={Info} />
            <Route path="/allType" component={AllArticleType} />
        </div>
    </Router>
), document.getElementById('app'));

