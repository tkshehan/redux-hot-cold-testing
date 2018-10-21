import React from 'react';
import {shallow} from 'enzyme';
import {generateAuralUpdate, RESTART_GAME} from '../../actions'

import {TopNav} from '../../components/top-nav';

describe('<TopNav />', () => {
  it('Renders without crashing', () => {
    shallow(<TopNav />);
  });

  it('Should dispatch restartGame when new game is clicked', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<TopNav dispatch={dispatch} />);
    const link = wrapper.find('.new');
    link.simulate('click', {
      preventDefault() {}
    });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0].type).toBe(RESTART_GAME);
  });

  it('Should dispatch generateAuralUpdate when state-of-game link is clicked', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<TopNav dispatch={dispatch} />);
    const link = wrapper.find('.status-link');
    link.simulate('click', {
      preventDefault() {}
    });
    expect(dispatch).toHaveBeenCalledWith(generateAuralUpdate());
  });
});