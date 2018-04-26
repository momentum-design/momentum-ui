import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';

describe('tests for <Footer />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('should render top section only if children props is passed', () => {
    const container = shallow(<Footer children='dummy content' />);

    expect(container.find('.cui-footer__top').exists()).toBeTruthy();
    expect(container.find('.cui-footer__bottom').exists()).toBeFalsy();
  });

  it('should render social section only if only social content is passed', () => {
    const container = shallow(<Footer social='Cisco' />);

    expect(container.find('.cui-footer__bottom--position-right').exists()).toBeTruthy();
    expect(container.find('.cui-footer__bottom--position-left').exists()).toBeFalsy();
    expect(container.find('.cui-footer__top').exists()).toBeFalsy();
  });

  it('should render logo section only if only logo content is passed', () => {
    const container = shallow(<Footer logo='Cisco Webex' />);

    expect(container.find('.cui-footer__bottom--position-left').exists()).toBeTruthy();
    expect(container.find('.cui-footer__bottom--position-right').exists()).toBeFalsy();
    expect(container.find('.cui-footer__top').exists()).toBeFalsy();
  });

  it('should render copyright section only if only copyright content is passed', () => {
    const container = shallow(<Footer copyright='Cisco Webex' />);

    expect(container.find('.cui-footer__bottom--position-left').exists()).toBeTruthy();
    expect(container.find('.cui-footer__bottom--position-right').exists()).toBeFalsy();
    expect(container.find('.cui-footer__top').exists()).toBeFalsy();
  });
});
