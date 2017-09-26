//Component1.jsx
import React from 'react';
import style from '../css/allArticleType.css'; //模块应用css
import $ from '../js/jquery-3.2.1.min.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import jpg from '../images/1.jpg'
var a = require("../images/1.jpg");
var MainBox  = React.createClass({
    render:function(){
        return(
            <App/>
        );
    }
});
var App = React.createClass({
    getInitialState:function(){
        return{
            data:[]
        };
    },
    componentDidMount(){
        this.getDataFromServer('http://localhost:8088/type/list?user=admin');
    },
    showResult: function(response) {
        this.setState({
            data: response
        });
    },
    getDataFromServer:function(URL){
        $.ajax({
            type:"GET",
            url:URL,
            success: function(response1) {
                var response = JSON.parse(response1).data
                this.showResult(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render:function(){
        return(
            <div>
                <Result result={this.state.data}/>
            </div>
        );
    }
});

var Result = React.createClass({
    render:function(){
        var result = this.props.result.map(function(result,index){
            return <ResultItem key={index} value={ result } />
        });
        return(
            <div>
                <div id="portfolio-content" className="center-text">
                    <div className="portfolio-page" id="page-1">
                        {result}
                    </div>
                </div>
            </div>
        );
    }
});

var ResultItem = React.createClass({
    render:function(){
        var camper = this.props.value;
        return(
            <Router>

                <div className="portfolio-group">
                    <a className="portfolio-item">
                        <image src={a} alt="image 1">
                            <div className="detail">
                                <h3>Wavy Road</h3>
                                <p>Duis ac laoreet mi. Maecenas non lorem sed elit molestie tincidunt. Vestibulum tincidunt libero urna, ut dignissim purus accumsan nec.</p>
                                <span className="btn">View</span>
                            </div>
                        </image>
                    </a>
                </div>
            </Router>
        );
    }
});


class Component extends React.Component {
    render() {
        return (
            <div>
                <MainBox/>
            </div>
        )
    }
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//导出组件
export default Component;