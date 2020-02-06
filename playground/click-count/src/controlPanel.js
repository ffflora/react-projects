import React,{Component} from 'react';
import Counter from './counter.js'

const style = {
  margin:'20px'
}

class ControlPanel extends Component {
  render(){
    console.log('enter ControlPanel render ');
    return(
      <div style = {style}>
        <Counter caption = '今天摸了几条鱼？'/>
        <Counter caption = '今天摸秃了几条鱼？' initValue = {1}/>
        <Counter caption = '今天还打算摸几条鱼？'initValue = {2}/>
  
      </div>
    );
  }
}
export default ControlPanel;
