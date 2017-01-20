import React, { Component } from 'react';
import countries from 'world-countries';

import Pushable from '../components/Pushable/Pushable';
import Game from '../components/Game/Game';
import GameOver from '../GameOver/GameOver';
import style from './app.css';
import Logo from '../components/Logo/Logo';

export class App extends Component {
  state = {
    route: 'home',
    countries: countries.filter(country => country.capital),
    highscore: { capital: [] },
    name: '',
  };

  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getCountry(country = this.state.countries) {
    return country[this.randomInt(0, country.length - 1)];
  }

  setupGame() {
    const correctInt = this.randomInt(0, 3);
    const quiz = new Array(4)
      .fill({})
      .map(alt => this.getCountry())
      .map(
        alt =>
          Object.assign({}, {
            _id: Math.random(),
            name: alt.name.common,
            capital: alt.capital,
          }),
      )
      .sort((a, b) => a._id > b._id);

    quiz[correctInt] = Object.assign({ ...quiz[correctInt] }, {
      correct: true,
    });

    return quiz;
  }

  addHighScore(newScore, game) {
    const highscore = {
      [game]: this.state.highscore[game].concat([ { ...newScore } ]),
    };
    this.setState({ highscore, route: 'home', gameOver: false });

    NativeStorage ? NativeStorage.setItem('highscore', highscore) : '';
  }

  makeMountains() {
    return {
      WebkitClipPath: `polygon(0 0,0 100%,100% 100%,100% 0,80% ${this.randomInt(
        0,
        4,
      )}rem,75% ${this.randomInt(0, 4)}rem,50% ${this.randomInt(
        0,
        4,
      )}rem,35% ${this.randomInt(0, 4)}rem,20% ${this.randomInt(0, 4)}rem)`,
    };
  }

  componentWillReceiveProps() {
    NativeStorage
      ? NativeStorage.getItem(
        'highscore',
        highscore => this.setState({ highscore }),
      )
      : '';
  }

  render() {
    if (this.state.route === 'home') {
      return (
        <div>
          <header className={style.header} style={this.makeMountains()}>
            <Logo className={style.logo} />
            <h1>QuipQuop</h1>
          </header>
          <nav className={style.menu} style={this.makeMountains()}>
            <Pushable onTap={() => this.setState({ route: 'capital' })}>
              Play game
            </Pushable>
          </nav>
        </div>
      );
    }
    if (this.state.gameOver) {
      return (
        <GameOver
          highscore={this.state.highscore[this.state.route]}
          game={this.state.route}
          score={this.state.score}
          addHighScore={(newScore, game) => this.addHighScore(newScore, game)}
          returnHome={() => this.setState({ route: 'home', gameOver: false })}
        />
      );
    }
    return (
      <Game
        quiz={this.setupGame()}
        answerKey="name"
        questionKey="capital"
        onSuccess={() => this.setupGame()}
        onFailure={score => this.setState({ score, gameOver: true })}
        mountains={this.makeMountains()}
      />
    );
  }
}

export default App;
