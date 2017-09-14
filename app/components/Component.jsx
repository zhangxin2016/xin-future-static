//Component1.jsx
import React from 'react';
import bootstrap from '../css/style.css'; //模块应用css
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
        this.getDataFromServer('http://localhost:8088/article/list/');
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
        return(
            <div>
                <div>{camper.id}</div>
                <div dangerouslySetInnerHTML={{__html: camper.blogcontent}}></div>
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


//导出组件
export default Component;