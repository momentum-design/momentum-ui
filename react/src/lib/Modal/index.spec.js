import React from 'react';
import { shallow } from 'enzyme';
import Modal from '@collab-ui/react/Modal';
import Icon from '@collab-ui/react/Icon';
//Add test for Background once Portals are supported in Enzyme

describe('tests for <Modal />', () => {
  it('should render a Modal', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show htmlId="testModal" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Modal', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show htmlId="testModal" />
    );

    expect(wrapper.children().length).toEqual(1);
  });

  it('should not render without Show Prop equaling true', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show={false} htmlId="testModal" />
    );

    expect(wrapper.children().length).toEqual(0);
  });

  it('should render based on size prop', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show htmlId="testModal" />
    );

    expect(wrapper.find('.cui-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('cui-modal--default');
  });

  it('should render based on size prop (small)', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show size="small" htmlId="testModal" />
    );

    expect(wrapper.find('.cui-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('cui-modal--small');
  });

  it('should render based on size prop (dialog)', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show size="dialog" htmlId="testModal" />
    );

    expect(wrapper.find('.cui-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('cui-modal--dialog');
  });

  it('should render Icon if icon prop is passed to dialog', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} icon={<Icon name='cancel_16' />} applicationId="test" show size="dialog" htmlId="testModal" />
    );

    expect(wrapper.find('.cui-modal__content').length).toEqual(1);
    expect(wrapper.find('.cui-modal__left-pane').length).toEqual(1);
    expect(wrapper.find('Icon').length).toEqual(1);
  });

  it('should throw error if icon prop is not of type icon in dialog', () => {
    try {
      shallow(
        <Modal onHide={() => { }} icon={<div />} applicationId="test" show size="dialog" htmlId="testModal" />
      );
    } catch (e) {
      expect(e.message).toEqual('icon prop needs to be of type Icon.');
    }
  });

  it('should render based on size prop (full)', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show size="full" htmlId="testModal" />
    );

    expect(wrapper.find('.cui-modal__content').length).toEqual(1);
    expect(wrapper.props().dialogClass).toContain('cui-modal--full');
  });

  it('should render based on background prop', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show htmlId="testModal" />
    );

    expect(wrapper.find('.reveal-modal-bg').length).toEqual(0);
  });

  it('should render children', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show htmlId="testModal">
        <div className="testchild" />
      </Modal>
    );

    expect(wrapper.find('.testchild').length).toEqual(1);
  });

  it('should not render Backdrop if prop pass in as false', () => {
    const wrapper = shallow(
      <Modal onHide={() => { }} applicationId="test" show backdrop={false} htmlId="testModal" />
    );

    expect(wrapper.find('.reveal-modal-bg').exists()).toEqual(false);
  });
});
