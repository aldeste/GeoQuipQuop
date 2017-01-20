import React from 'react';
import GameOver from './GameOver';
import HighScores from '../components/HighScores/HighScores';
import {shallow} from 'enzyme';

describe('<GameOver />', () => {
  it('Accepts Input', () => {
    const wrapper = shallow(
      <GameOver highscore={[{name: 'A', score: 3}]} score={3} game={'capital'}/>
    );

    expect(wrapper.find('input').length).toBeTruthy();
  })

  it('Renders high scores', () => {
    const wrapper = shallow(
      <GameOver highscore={[{name: 'A', score: 3}]} score={3} game={'capital'}/>
    );

    expect(wrapper.find('HighScores').length).toBeTruthy();
  })
})
