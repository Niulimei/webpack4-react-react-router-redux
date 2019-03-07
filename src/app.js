import './css/common.css';
// import './css/test.less';
import './component/layer/layer.less';
import Layer from './component/layer/layer.js';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
  render(){
    return<div>
      <Layer />
        Hello  React 
      </div>;
  }
}

ReactDOM.render(<App />,document.getElementById('app'));