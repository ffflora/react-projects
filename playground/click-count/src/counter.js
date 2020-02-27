import React, {Component} from 'react';
import PropTypes from 'prop-types';
const buttonStyle = {
  margin:'10px',
  color : 'green'
}

class Counter extends Component{

  constructor(props){
    console.log('Enter constructor: '+ props.caption);
    super(props);

    this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
    this.onClickDecrementButton = this.onClickDecrementButton.bind(this);

    this.state = {
      count:props.initValue
    }
  }

  onClickDecrementButton(){
    this.updateCount(false);
  }

  onClickIncrementButton(){
    this.updateCount(true);
  }

  updateCount(isIncrement){
    const previousValue = this.state.count;
    const newValue = isIncrement? previousValue + 1: previousValue - 1;
    this.setState({count:newValue});
    this.props.onUpdate(newValue,previousValue)
  }

  render(){

    const {caption} = this.props; //desctructuring assignment
    return(
      <div>
        <button style = {buttonStyle}
          onClick= {this.onClickIncrementButton}>+</button>
        <button style = {buttonStyle}
          onClick= {this.onClickDecrementButton}>-</button>
        <span> {caption} count: {this.state.count}</span>
      </div>
    );
  }
}
//propTypes 检查只是一个辅助开发的功能，并不会改变组件的行为。
Counter.propTypes = {
  caption: PropTypes.string.isRequired, //meaning this caption prop is required, not like initValue.
  initValue: PropTypes.number,
  onUpdate: PropTypes.func
};


Counter.defaultProps = {
  initValue:0,
  onUpdate: f => f, // a function that does nothing
};

export default Counter;
