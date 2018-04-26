import React from 'react';
import { shallow } from 'enzyme';
import ModalBody from '../ModalBody';

describe('tests for <ModalBody />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ModalBody id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one ModalBody', () => {
    const container = shallow(<ModalBody />);

    expect(container.find('.cui-modal__body').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <ModalBody>
        <div className="testingforMB" />
      </ModalBody>
    );

    expect(container.find('.testingforMB').length).toEqual(1);
  });
});
