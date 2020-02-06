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

  componentWillReceiveProps(nextProps){
    console.log('enter ComponentWillReceiveProps '+ this.props.caption);
  }

  componentWillMount(){
    console.log('enter ComponentWillMount '+ this.props.caption);
  }

  componentDidMount(){
    console.log('enter ComponentDidMount '+ this.props.caption);
  }

  onClickDecrementButton(){
    this.setState({count:this.state.count-1});
  }

  onClickIncrementButton(){
    this.setState({count:this.state.count+1});
  }

  shouldComponentUpdate(nextProps,nextState){
    return (nextProps.caption !== this.props.caption) ||
    (nextState.count !== this.state.count);
  }


  render(){
    console.log('enter render '+ this.props.caption);
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
  initValue: PropTypes.number
};


Counter.defaultProps = {
  initValue:0
};

export default Counter;
