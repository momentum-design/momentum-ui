import React from 'react';
import { shallow } from 'enzyme';
import AlertContainer from '../AlertContainer';

describe('tests for <AlertContainer />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<AlertContainer/>);

    expect(container).toMatchSnapshot();
  });

  it('should render one AlertContainer', () => {
    const container = shallow(<AlertContainer />);

    expect(container.find('.cui-alert').length).toEqual(1);
  });

  it('should attach className passed in', () => {
    const container = shallow(<AlertContainer className={'jefe-guadelupe__rulz'} />);

    expect(container.hasClass('jefe-guadelupe__rulz')).toEqual(true);
  });
});
