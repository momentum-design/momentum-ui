import React from 'react';
import { shallow } from 'enzyme';
import ModalFooter from '../ModalFooter';

describe('tests for <ModalFooter />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ModalFooter id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one ModalFooter', () => {
    const container = shallow(<ModalFooter />);

    expect(container.find('.cui-modal__footer').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <ModalFooter>
        <div className="testingforMF" />
      </ModalFooter>
    );

    expect(container.find('.testingforMF').length).toEqual(1);
  });
});
