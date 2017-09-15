//main.js
import React from 'react';
import ReactDom from 'react-dom';
import Component1 from './components/Component.jsx';
//require("./css/style.css"); //全局引用css
ReactDom.render(
<Component1 />,
    document.getElementById('content')
);
