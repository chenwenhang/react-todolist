import React, { Component } from 'react';
// react16弃用React.createClass，我这里用createReactClass创建组件
import createReactClass from 'create-react-class'; 
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

var TodoList = createReactClass({ // 父组件
  getInitialState:function(){
    return {
        todolist:[]  //返回列表
      };
  },
  handleChange:function(rows){
    //当发生增删改查时改变state重新渲染
    this.setState({
        todolist:rows
    });
  },
  render: function(){
    return (
        <div className="App-content">
          <h1>TodoList</h1>,
          <AddItem todo={this.state.todolist} add={this.handleChange} />
          <ItemList todo={this.state.todolist}  change={this.handleChange} />
        </div>
      );
  }
});


var AddItem = createReactClass({ // 添加任务
  addItem:function(){
    //获取真实DOM 虚拟DOM无法获取表单元素的数据
    var inputDom = ReactDOM.findDOMNode(this.refs.inputnew);
    //获取数据
    var newthing = inputDom.value.trim();
    //如果输入的数据为空值则返回提示无法添加
    if(newthing === ""){
        alert("The input cannot be empty. ");
        return;
    }
    //获取todolist列表
    var rows = this.props.todo;
    //在列表内添加新数据
    rows.push(newthing);
    //回调改变state
    this.props.add(rows);
    //清空输入框
    inputDom.value = "";
  },
  render: function(){
    return (
        <div>
          <input type="text" ref="inputnew" placeholder="Typing a newthing todo , click the item to delete." className="Item-input" />,
          <button onClick={this.addItem} className="Item-button"> Add </button>
        </div>
      );
  }
});

var ItemList = createReactClass({ //任务列表
  deleteItem:function(e){
    //获取todolist列表
    var rows = this.props.todo;
    //获取当前条目的data-index
    var index = e.target.getAttribute("data-index");
    //根据获取的data-index在rows里删除对应条目
    rows.splice(index,1);
    //回调改变state
    this.props.change(rows);
  },
  render: function(){
    return (
        <ul id="todolist" className="Item-ul" >
          {
            // 遍历数据
            this.props.todo.map(function(item,i){
              return(
                <li key={i} data-index={i} className="Item-li" onClick={this.deleteItem} >  {/*加载自动触发！！！！！！！！！！！！！！！！*/}
                  <span>{item}</span>
                </li>
              )
            }.bind(this)) //this指向发生变化！！！！！！！！！！！！！绑定回来！！！
          }
        </ul>
      );
    }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>欢迎来到React</h2>
        </div>
        <TodoList />
      </div>
    );
  }
}

export default App;
