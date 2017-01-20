import React, { PropTypes, PureComponent } from "react";
import Tappable from "react-tappable/lib/Tappable";

import style from "./pushable.css";

export class Pushable extends PureComponent {
  render() {
    return (
      <Tappable
        onTap={this.props.onTap}
        classes={{
          active: style.active,
          inactive: ''
        }}
        className={style.pushable}
      >
        {this.props.children}
      </Tappable>
    );
  }
}

export default Pushable;
