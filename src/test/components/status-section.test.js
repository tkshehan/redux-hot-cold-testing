import React from 'react';
import {shallow} from 'enzyme';

import StatusSection from '../../components/status-section';

describe('<StatusSection />', () => {
  it('Renders without crashing', () => {
    shallow(<StatusSection auralStatus="" guesses={[]} />);
  });
});