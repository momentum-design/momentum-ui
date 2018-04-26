import React from 'react';
import { shallow, mount } from 'enzyme';
import ModalHeader from '../ModalHeader';

describe('tests for <ModalHeader />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ModalHeader id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one ModalHeader', () => {
    const container = shallow(<ModalHeader />);

    expect(container.find('div').hasClass('cui-modal__header')).toEqual(true);
  });

  it('should display closable button by default', () => {
    const container = shallow(<ModalHeader />);

    expect(container.find('.cui-modal__close').length).toEqual(1);
  });

  it('should display not display closable button', () => {
    const container = shallow(<ModalHeader showCloseButton={false} />);

    expect(container.find('Icon').exists()).toEqual(false);
  });

  it('should pass onHide function to onClick', () => {
    const onClose = jest.fn();

    const container = mount(<ModalHeader onHide={onClose} />);

    container.find('button.cui-modal__close').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
