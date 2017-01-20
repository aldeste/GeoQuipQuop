import React, { PropTypes, Component } from 'react';

import Pushable from '../components/Pushable/Pushable';
import HighScores from '../components/HighScores/HighScores';
import style from './gameover.css';

export class GameOver extends Component {
  state = { name: '' };

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    const { highscore, score, game } = this.props;
    const { name } = this.state;
    const newHighscore = Boolean(
      highscore.filter(s => s.score < score) || highscore.length < 10,
    );
    const newRecord = newHighscore
      ? <input
        className={style.input}
        type="text"
        placeholder="Enter your name to submit score!"
        value={name}
        onChange={event => this.handleNameChange(event)}
      />
      : '';

    const returnToMenu = this.state.name
      ? <Pushable onTap={() => this.props.addHighScore({ name, score }, game)}>
        Submit highscore!
      </Pushable>
      : <Pushable onTap={() => this.props.returnHome()}>
        Go back to menu
      </Pushable>;

    return (
      <div className={style.container}>
        <p className={style.score}>You socred {score}</p>
        <HighScores
          title={game}
          highscore={
            highscore
              .reverse()
              .slice(0, 9)
              .concat({ name, score, standout: newHighscore })
          }
        />
        {newHighscore && <p className={style.score}>It's a new highscore!</p>}
        <div className={style.submitArea}>
          {newRecord}
          {returnToMenu}
        </div>
      </div>
    );
  }
}

export default GameOver;
