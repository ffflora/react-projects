import React,{Component} from 'react';
import Counter from './counter.js' // counter is the 子组件 of counterpanel

const style = {
  margin:'20px'
}

class ControlPanel extends Component {
  constructor(props){
    super(props);
    this.onCounterUpdate = this.onCounterUpdate.bind(this);
    this.initValues = [0,10,20];
    const initSum = this.initValues.reduce((a,b)=>a+b,0);
    //const reducer = (accumulator, currentValue) => accumulator + currentValue;

    this.state = {sum:initSum};

  }
  onCounterUpdate(newValue,previousValue){
    const valueChange = newValue-previousValue;
    this.setState({sum: this.state.sum + valueChange});
  }

  render(){
    return(
      <div style = {style}>
        <Counter onUpdate= {this.onCounterUpdate}
        caption = '今天摸了几条鱼？' initValue = {this.initValues[1]}/>
        <Counter onUpdate= {this.onCounterUpdate}
        caption = '今天摸秃了几条鱼？' initValue = {this.initValues[2]}/>
        <Counter onUpdate= {this.onCounterUpdate}
        caption = '今天还打算摸几条鱼？'/>
        <hr/>
        <div> 废🐟总数 = {this.state.sum} </div>
      </div>
    );
  }
}
export default ControlPanel;
