// import './css/common.css';
// import layer from './component/layer/layer.js';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
// const App = () =>{
//   const  NUM = 1;
//   alert(NUM);

//   console.log(layer);
// }

// new App();

class App extends Component{
  render(){
    return<div>Hello  React </div>;
  }
}

ReactDOM.render(<App />,document.getElementById('app'));