
import React from 'react';
import {shallow} from 'enzyme';

import InfoSection from '../../components/info-section';

describe('<InfoSection />', () => {
  it('Renders without crashing', () => {
    shallow(<InfoSection />);
  });
});