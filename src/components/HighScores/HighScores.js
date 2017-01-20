import React, { Component } from 'react';
import style from './highscores.css';
export class HighScores extends Component {
  render() {
    return (
      <div className={style.scorebord}>
        {this.props.highscore
          .sort(
            (a, b) =>
            b.score - a.score || Boolean(b.standout) - Boolean(a.standout),
            )
            .map((a, i) => (
              <div
                key={i}
                className={
                  `${style.scorefield} ${a.standout ? style.standout : ''}`
                }
              >
                <p className={style.name}>{a.name}</p>
                <p>{a.score}</p>
              </div>
            ))}
      </div>
    );
  }
}

export default HighScores;
