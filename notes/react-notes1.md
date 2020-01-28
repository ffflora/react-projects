# Basics of React

###### (Most of the materials come from [React Official Document](https://reactjs.org/docs/))

### JSX Represents Objects 

Babel compiles JSX down to `React.createElement()` calls.

These two examples are identical:

```react
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:

```react
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

# Rendering Elements

## Rendering an Element into the DOM 

```html
<div id="root"></div>
```

```react
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));//?
```

## Updating the Rendered Element 

React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object). Once you create an element, you can’t change its children or  attributes. An element is like a single frame in a movie: it represents  the UI at a certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `ReactDOM.render()`.

Consider this ticking clock example:

```react
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000); // if I block this line won't show anything, why? 
```

It calls `ReactDOM.render()` every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.

# Components and Props

 [Detailed component API reference goes here](https://reactjs.org/docs/react-component.html).

JavaScript function:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

The above two components are equivalent from React’s point of view.

## Rendering a Component 

Elements can also represent user-defined components:

```react
const element = <Welcome name="Sara" />;
```

When React sees an element representing a user-defined component, it  passes JSX attributes to this component as a single object. We call this object “props”.

For example, this code renders “Hello, Sara” on the page:

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Let’s recap what happens in this example:

1. We call `ReactDOM.render()` with the `` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `Hello, Sara` element as the result.
4. React DOM efficiently updates the DOM to match `Hello, Sara`.

**Note:** Always start component names with a **capital letter.**

React treats components starting with lowercase letters as DOM **tags**.



## Composing Components 

For example, we can create an `App` component that renders `Welcome` many times:

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## Extracting Components 

Split components into smaller components:

For example, consider this `Comment` component:

```react
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
            /> //为什么可以这样 close? </...>...?
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment on a social media website.

This component *<u>can be tricky to change because of all the nesting,  and it is also hard to reuse individual parts</u>* of it. Let’s extract a few components from it:

```react
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

We recommend **naming props from the component’s own point of view** rather than the context in which it is being used.

```react
function UserInfo(props){
    return (
    <div className = "UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">
            {props.user.name} 
            </div>
        </div>
    );
};
```

Then the `comment` gets simplified:

```react
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable component.

## Props are Read-Only 

Whether you declare a component [as a function or a class](https://reactjs.org/docs/components-and-props.html#function-and-class-components), it must never modify its own props. Consider this `sum` function:

```react
function sum(a, b) {
  return a + b;
}
```

Such functions are called [“pure”](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

```react
function withdraw(account, amount) {
  account.total -= amount;
}
```

React is pretty flexible but it has a single strict rule:

**All React components must act like pure functions with respect to their props.**

# State and Lifecycle

Consider the `tick` example mentioned above, we will now learn how to make the `Clock` component truly reusable and encapsulated.

```react
function Clock(props){
    return(
      <div>
          <h1>Hello World!</h1>
          <h2>It is {props.date.toLocaleTimeString()}.</h2>
      </div>
    );
}
function tick(){
    ReactDOM.render(
    <Clock date={new Date()} />, document.getElementById('root')
    );
}
```

## Converting a Function to a Class 

You can convert a function component like `Clock` to a class in five steps:

1. Create an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), with the same name, that extends `React.Component`.
2. Add a single empty method to it called `render()`.
3. Move the body of the function into the `render()` method.
4. Replace `props` with `this.props` in the `render()` body.
5. Delete the remaining empty function declaration.

```react
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

But at this moment the function only a single instance of the `Clock` will be used. Will need to do the following: 

## Adding Local State to a Class 

We will move the `date` from props to state in three steps:

1. Replace `this.props.date` with `this.state.date` in the `render()` method:

```react
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. Add a [class constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) that assigns the initial `this.state`:

```react
class Clock extends React.Component {
    //Note how we pass `props` to the base constructor:
  constructor(props) {
    super(props);										//???
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Class components should always call the base constructor with `props`.

3. Remove the `date` prop from the `<Clock />` element:

```react
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

We will later add the timer code back to the component itself.

The result looks like this:

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Next, we’ll make the `Clock` set up its own timer and update itself every second.



## Adding Lifecycle Methods to a Class 

We want to [set up a timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) whenever the `Clock` is rendered to the DOM for the first time. This is called “**mounting**” in React.

We also want to [clear that timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) whenever the DOM produced by the `Clock` is removed. This is called “**unmounting**” in React.

(像 constructor destructor 一样吗？)

We can declare special methods on the component class to run some code when a component mounts and unmounts:

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

These methods are called “**lifecycle methods**”.

The `componentDidMount()` method runs after the component output has been rendered to the DOM. This is a good place to set up a timer:

```react
  componentDidMount() {
      //we save the timer ID right on `this` (`this.timerID`).
    this.timerID = setInterval(
      () => this.tick(), 							//what happened to this syntax orz
      1000
    );
  }
```

We will tear down the timer in the `componentWillUnmount()` lifecycle method:

```react
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Finally, we will implement a method called `tick()` that the `Clock` component will run every second.

It will use `this.setState()` to schedule updates to the component local state, and now the clock ticks every second.

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),// will call tick() every second
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```



Let’s quickly recap what’s going on and the order in which the methods are called:

1. When `<Clock />` is passed to `ReactDOM.render()`, React calls the **constructor** of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
2. React then calls the `Clock` component’s `render()` method. This is how React learns <u>what should be displayed</u> on the screen. React then updates the DOM to match the `Clock`’s render output.
3. When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` **lifecycle** method. Inside it, the `Clock` component asks the browser to set up a timer to call the component’s `tick()` method once a second. 
4. Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.
5. If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stopped. // 前半句，react 怎么知道什么时候 clock is removed? 

## Using State Correctly 

There are three things you should know about `setState()`.

### Do Not Modify State Directly 

For example, this will not re-render a component:

```react
// Wrong
this.state.comment = 'Hello';
```

**WARNING**: The only place where you can assign `this.state` is the **constructor.**

```react
// Correct
this.setState({comment: 'Hello'});
```



### 

### State Updates May Be Asynchronous 

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

For example, this code may fail to update the counter:

```react
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```



```react
// Correct
// That function will  receive the previous state as the first argument, and the props at the  time the update is applied as the second argument:
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

We used an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) above, but it also works with regular functions:

```react
// Correct
this.setState(function(state, props) {				// what the heck is going on here/??
  return {
    counter: state.counter + props.increment
  };
});
```

### 

### State Updates are Merged 

When you call `setState()`, React merges the object you provide into the current state.

For example, your state may contain several independent variables:

```react
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Then you can update them independently with separate `setState()` calls:

```react
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

The merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`.

## ---- till this point 我已经一个字母都看不进去了 下次再见 88

