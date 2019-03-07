
import './layer.less';
import React,{ Component } from 'react';

class Layer extends Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    let arr = [1,2,2,2,3,4,5,6,6,6,7,8,9];
    arr = new Set(arr);
    console.log('arr',[...arr]);
    this.setState({val: this.state.val + 1});
    console.log('第 1 次 log',this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log('第 2 次 log',this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log('第 3 次 log',this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log('第 4 次 log',this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};


export default Layer;