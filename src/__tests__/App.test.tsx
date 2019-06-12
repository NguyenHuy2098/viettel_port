import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

it('mounts without crashing', (): void => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});
