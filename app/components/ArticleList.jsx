//Component1.jsx
import React from 'react';
import style from '../css/style.css'; //模块应用css
import $ from '../js/jquery-3.2.1.min.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
        this.getDataFromServer('http://localhost:8088/article/listByType/?username=admin&typeuuid='+getQueryString("id"));
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
                <div>

                </div>
                <div id="bodycontent">
                    <div id="catalog">
                        <div id="personalInformation">
                            <div id="myInfo"> 个人信息 </div>
                            <div id="myInfoContent">
                                <div id="myhead">
                                    <img src="images/head.jpg"></img>
                                </div>
                                <div id="myheadright">
                                    昵称 : zhangxin
                                    <br/>
                                    性别 : 男
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
                        <div id="blogTime">
                            <div id="timeTitle">时间分类</div>
                            <div id="timeContent"></div>
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
                <div>
                    <div id="bannerh">
                        <nav className="navbar navbar-inverse navbar-fixed-top">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="logo"><img id="logoid" src="images/logo.png"></img></a>
                                </div>
                                <div id="navbar" className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><a href=""><i className="fa fa-code"></i>首页</a></li>
                                        <li><a href=""><i className="fa fa-download"></i>文章</a></li>
                                        <li><a href=""><i className="fa fa-rocket"></i>相册</a></li>
                                        <li><a href=""><i className="fa fa-book"></i>说说</a></li>
                                        <li><a href=""><i className="fa fa-weibo"></i>微博</a></li>
                                        <li><a href=""><i className="fa fa-user"></i>注册/登录</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="container-fluid banner bank">
                            <h1 className="text-center h1">Xin Future & New Future</h1>
                            <p className="text-center">The future of the road a lot of challenges, do not give up, do not be confused, look better than their own</p>
                            <div className="search-box center-block">
                                <input type="text" className="search center-block" placeholder="搜索..."></input>
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="articleAll">
                    {dataList}
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
                <li><a href={'/list?id='+camper.uuid}>{camper.typeName}({camper.count})</a></li>
            </Router>
        );
    }
});

var ResultAllItem = React.createClass({
    render:function(){
        var camper = this.props.listvalue;
        var time = new Date(camper.createTime).Format("yyyy-MM-dd");
        var create_time = new Date(camper.createTime).Format("yyyy-MM-dd hh:mm:ss");
        return(
            <Router>
                <div id={style.listAllArticle}>
                    <div id={style.listDate}>
                        <div id={style.listDateContent}>
                            {time}
                        </div>
                    </div>
                    <div id={style.listTitle}>
                        <a href={'/info?id='+camper.createUuid}> {camper.blogtitie}</a>
                    </div>
                    <div id={style.listAbstract}>
                        摘要：{camper.blogabstract}
                    </div>
                    <div id={style.listDesc}>
                        posted @ {create_time} {camper.blogauthor}  编辑
                    </div>
                </div>
            </Router>
        );
    }
});


class Component extends React.Component {
    render() {
        return (
            <div>
                <MainBoxList/><MainBox/>
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
