import React from 'react';
import style from '../css/style.css'; //模块应用css
import $ from '../js/jquery-3.2.1.min.js'
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
        this.getDataFromServer('http://localhost:8088/article/list?username=admin');
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
            <div className="row">
                <div className="col-md-12">
                    {result}
                </div>
            </div>
        );
    }
});
var ResultItem = React.createClass({
    render:function(){
        var camper = this.props.value;
        var time = new Date(camper.createTime).Format("yyyy-MM-dd");
        var create_time = new Date(camper.createTime).Format("yyyy-MM-dd hh:mm:ss");
        return(
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
        );
    }
});

class Component extends React.Component {
    render() {
        return (
            <MainBox/>
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