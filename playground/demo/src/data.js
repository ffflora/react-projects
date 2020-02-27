import React, {Component} from 'react'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTYyMTMwYzRmYTk3NWIxNjQxMGY0MSIsImlhdCI6MTU4MDg2NzQ2OH0.erarmSigdxkPyJUTts5-vxJfzzCrcCOvrhu0pPNpYFU';


class Data extends Component {
  constructor(props) {
    super(props)
    this.state = {user: []}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    fetch(
      'https://api.pause-pwa.com/api/organizations',
      {
        method: "GET",
        //body: JSON.stringify(data),
        headers: {
        "x-access-token":token,'Content-Type':'application/x-www-form-urlencoded'
      }},
      ).then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({users: data})

      })
      .catch(e => console.log('错误:', e))
  }

  render() {
    return (
      <div>
        <input type="button" value="点击 http-get 方式获取数据" onClickCapture={this.handleClick} />
        <ul>
          {this.state.user &&
            this.state.user.map((item, index) => (
              <li key={index.toString()}>{item.name}</li>
            ))}
        </ul>
      </div>
    )
  }
}
export default Data;
