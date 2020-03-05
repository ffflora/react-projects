# Components

## Components Communicate with Server

It's safe that the communication happens in the `componentDidMount`, since this moment the component has already been loaded, and the DOM has been rendered. It is recommended by React. 

Reasons: 

1. `componentDidMount`中执行服务器通信可以保证获取到数据时，组件已经处于挂载状态，这时即使要直接操作`DOM`也是安全的，而`componentWillMount`无法保证这一点。
2. 当组件在服务器端渲染时，`componentWillMount`会被调用两次，一次是在服务器端，另一次是在浏览器端，而`componentDidMount`能保证在任何情况下只会被调用一次，从而不会发送多余的数据请求。

```javascript
class UserListContainer extends from React.Component{
////
	componentWillMount(){
		var that = this;
        fetch('/path/to/user-api')
        	.then(response=>{
            	response.json().then(data=>{
                	that.setState({users:data})
                });
            });
    }
}
```



## Components Update from Server

`componentWillReceiveProps`非常适合做这个工作。假设`UserListContainer`在获取用户列表时还需要一个参数`category`，用来根据用户的职业做筛选，`category`这个参数是从`props`中获取的，实现代码如下：

```javascript
class UserListContainer extends from React.Component{
////
	componentWillReceiveProps(nextProps){
        if(nextProps.category!==this.props.category){
            fetch('/path/to/user-api?category'+nextprops.category)
            then(response=>{
                response.json().then(data=>{
                    that.setState({users:data})
                });
            });
        }
    }
}
```

when execute `fetch`, need to compare the new props with the old one first. It only requires communication with the server and update  when the `category` is different. `componentWillReceiveProps`的执行并不能保证props一定发生了修改。

---



## Component Communicate with each other