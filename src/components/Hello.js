import React from "react";
import Tappable from "react-tappable";

import "../css/hello.css";

import Message from "./Message";

const Hello = React.createClass({
  displayName: "No",
  getInitialState() {
    return { message: "" };
  },
  sayHello(msg) {
    // CSSTransitionGroup will fade this in
    this.setState({ message: msg });
    setTimeout(
      () => {
        // CSSTransitionGroup will now fade this out
        this.setState({ message: "" });
      },
      2000
    );
  },
  render() {
    return (
      <div className="hello">
        <Message message={this.state.message} />
        <Tappable
          className="button-say-hello"
          onTap={() => this.sayHello("No.")}
        >
          Say hi
        </Tappable>
      </div>
    );
  }
});

export default Hello;
