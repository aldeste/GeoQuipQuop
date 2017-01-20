import React, { Component } from 'react';
import Pushable from '../Pushable/Pushable';
import Timer from '../Timer/Timer';

import style from './game.css';

export class Game extends Component {
  _answerHandler(correct) {
    if (correct) {
      return this._success();
    }

    return this._failure();
  }

  _failure() {
    this.props.onFailure(this.state.score);
  }

  _success() {
    this.setState({
      quiz: this.props.onSuccess(),
      timer: 1,
      score: this.state.score + 1,
    });
  }

  componentWillMount() {
    this.setState({ quiz: this.props.quiz, timer: 6, score: 0 });
  }

  render() {
    return (
      <div>
        <div className={style.questionArea}>
          <Timer
            className={style.timer}
            nearEndClass={style.timerNearEnd}
            seconds={this.state.timer}
            onComplete={() => this._failure()}
          />
          <p>Current score: {this.state.score}</p>
          <h1 className={style.question}>
            {this.state.quiz.find(a => a.correct).capital}
          </h1>
        </div>
        <div style={this.props.mountains} className={style.answers}>
          {this.state.quiz.map(answer => (
            <Pushable
              onTap={() => this._answerHandler(answer.correct)}
                key={answer._id}
              >
                {answer.name}
              </Pushable>
            ))}
        </div>
      </div>
    );
  }
}

export default Game;
