import React from 'react';
import { shallow, mount } from 'enzyme';
import AlertBanner from '../AlertBanner';

describe('tests for <AlertBanner />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<AlertBanner show />);

    expect(container).toMatchSnapshot();
  });

  it('should default to type "info"', () => {
    const container = shallow(<AlertBanner show />);

    expect(container.find('.cui-alert-banner--info').exists()).toEqual(true);
  });

  it('should default to type "info"', () => {
    const container = shallow(<AlertBanner show type="warning"/>);

    expect(container.find('.cui-alert-banner--warning').exists()).toEqual(true);
  });

  it('should not display closable button by default', () => {
    const container = shallow(
      <AlertBanner show>
        <div>Test</div>
      </AlertBanner>
    );

    expect(container.find('.cui-alert-banner__close').exists()).toEqual(false);
  });

  it('should display closable button if prop set to true', () => {
    const container = shallow(<AlertBanner show closable />);

    expect(container.find('.cui-alert-banner__close').exists()).toEqual(true);
  });

  it('should close the banner on click of close button', () => {
    const onClose = jest.fn();

    const container = mount(
      <AlertBanner type="info" closable show onHide={onClose}>
        ShowBanner
      </AlertBanner>
    );

    container.find('.cui-alert-banner__close').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
