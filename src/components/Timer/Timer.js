import React, { Component } from 'react';

class Timer extends Component {
  static defaultProps = { seconds: 10 };

  _onComplete = () => {
    !this.props.onComplete
      ? clearInterval(this.interval)
      : this.props.onComplete();
  };

  _tick = () => {
    const seconds = this.state.seconds - 0.1;

    if (seconds <= 0) {
      // Seconds set to 0 here, to prevent an
      // ocational flash of -0.1 or timer
      // sometimes stopping at 0.1
      this.setState({ seconds: 0 });
      return this._onComplete();
    }

    this.state.timer / 2 > seconds
      ? this.setState({ nearEndClass: this.props.nearEndClass })
      : this.setState({ nearEndClass: '' });

    this.setState({ seconds });
  };

  componentWillMount() {
    const { seconds } = this.props;
    this.setState({ seconds, timer: seconds });

    // TODO: requestAnimationFrame > setInterval,
    // but lacks a timer option neccessary to controll
    // ticking every second. Implement it later with propper
    // logics. setInterval is buggy depending on device.
    this.interval = setInterval(this._tick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps() {
    this.setState({ seconds: this.state.seconds + this.props.seconds });
  }

  render() {
    return (
      <div>
        <p className={`${this.props.className} ${this.state.nearEndClass}`}>
          {this.state.seconds.toFixed(1)}
        </p>
      </div>
    );
  }
}

export default Timer;
