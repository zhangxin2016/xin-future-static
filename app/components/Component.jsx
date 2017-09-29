//Component1.jsx
import React from 'react';
import style from '../css/style.css'; //模块应用css
import $ from '../js/jquery-3.2.1.min.js'
import auto from '../js/jquery.autoMenu.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
var MainBox  = React.createClass({
    render:function(){
        return(
            <App/>
        );
    }
});
var autoMenu = React.createClass({
    render:function(){
        return(
            <auto/>
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

var MainBoxList  = React.createClass({
    render:function(){
        return(
            <AppList/>
        );
    }
});
var AppList = React.createClass({
    getInitialState:function(){
        return{
            dataList:[]
        };
    },
    componentDidMount(){
        this.getDataFromServer('http://localhost:8088/article/get/?create_uuid='+getQueryString("id"));
    },
    showResult: function(response) {
        this.setState({
            dataList: response
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
                <ResultAll result={this.state.dataList}/>
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
                <div id="bodycontent">
                    <div id="catalog">
                        <div id="personalInformation">
                            <div id="myInfo"> 个人信息 </div>
                            <div id="myInfoContent">
                                <div id="myhead">
                                    <img src="images/head.jpg"></img>
                                </div>
                                <div id="myheadright">
                                    zhangxin
                                    <br/>
                                    新未来，乐分享
                                    <br/>
                                    鑫未来，新未来
                                    <br/>
                                </div>
                                <div id="myheadbottom"></div>
                            </div>
                        </div>
                        <div id="blogType">
                            <div id="typeTitle"> 博客类型</div>
                            <div id="typeContent">
                                <div className="row">
                                    <div className="col-md-12" id={style.typeLi}>
                                        <ul>
                                            {result}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
var ResultAll = React.createClass({
    render:function(){
        var dataList = this.props.result.map(function(result,index){
            return <ResultAllItem key={index} listvalue={ result } />
        });
        return(
            <div>
                <div className="centerlist">
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <div id="articleAll">
                                    {dataList}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="autoMenu" id="autoMenu" data-autoMenu> </div>
            </div>
        );
    }
});
var ResultItem = React.createClass({
    render:function(){
        var camper = this.props.value;
        return(
            <Router>
                <li><a href={'/list?id='+camper.uuid}>{camper.typeName}({camper.count})</a></li>
            </Router>
        );
    }
});

var ResultAllItem = React.createClass({
    render:function(){
        var camper = this.props.listvalue;
        return(
            <div id={style.article}>
                <div id={style.articleTitie}>
                    <span> {camper.blogtitie}</span>
                </div>
                <div id={style.articleAbstract}>
                    <span>
                        摘要：{camper.blogabstract}
                    </span>
                </div>
                <div id={style.articleContent} dangerouslySetInnerHTML={{__html: camper.blogcontent}}>
                </div>
            </div>
        );
    }
});


class Component extends React.Component {
    render() {
        return (
            <div>
                <MainBoxList/>,<auto/>
            </div>
        )
    }
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
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

