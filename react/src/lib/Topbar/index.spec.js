import React from 'react';
import { shallow } from 'enzyme';
import Topbar from '@collab-ui/react/Topbar';

describe('<Topbar />', () => {
  it('should render a Topbar', () => {
    const wrapper = shallow(<Topbar />);

    expect(wrapper).toMatchSnapshot();
  });

  // it('should render a Topbar with AppTitle' , () => {
  //   const wrapper = mount(<Topbar appTitle='Test' />);
  //
  //   expect(wrapper.props().appTitle).toEqual('Test');
  // });
});
// import renderer from 'react-test-renderer';
// import {shallow, mount} from 'enzyme';
// import Checkbox from '../Checkbox';
//
// describe('<Checkbox />', () => {
// 	/**
// 	 * Snapshot based testing for look and feel.
// 	 */
// 	it('should render regular default checkbox', () => {
// 		const rendered = renderer.create(
// 			<Checkbox value="sample_12" label="Sample Checkbox" />
// 		);
// 		expect(rendered.toJSON()).toMatchSnapshot();
// 	});
//
// 	it('should render regular checked checkbox', () => {
// 		const rendered = renderer.create(
// 			<Checkbox value="sample_12" label="Sample Checkbox" checked />
// 		);
// 		expect(rendered.toJSON()).toMatchSnapshot();
// 	});
//
// 	it('should render disabled checkbox', () => {
// 		const rendered = renderer.create(
// 			<Checkbox value="sample_12" label="Sample Checkbox" disabled />
// 		);
// 		expect(rendered.toJSON()).toMatchSnapshot();
// 	});
//
// 	it('should render reversed checkbox', () => {
// 		const rendered = renderer.create(
// 			<Checkbox value="sample_12" label="Sample Checkbox" reverse />
// 		);
// 		expect(rendered.toJSON()).toMatchSnapshot();
// 	});
//
// 	it('should render an indeterminate state checkbox', () => {
// 		const rendered = renderer.create(
// 			<Checkbox value="sample_12" label="Sample Checkbox" indeterminate />
// 		);
// 		expect(rendered.toJSON()).toMatchSnapshot();
// 	});
//
// 	it('should have a `disabled` attribute when `disabled` is `true`', () => {
// 		const wrapper = mount(
// 			<Checkbox value="sample_12" label="Sample Checkbox" disabled />
// 		);
// 		expect(wrapper.find('Checkbox').find('input').html().includes('disabled')).toBe(true);
// 	});
//
// 	it('should render with additional classes applied', () => {
// 		const rendered = renderer.create(
// 			<Checkbox value="sample_12" label="Sample Checkbox" className="additional" />
// 		);
// 		expect(rendered.toJSON()).toMatchSnapshot();
// 	});
//
// 	it('should render the element with any extra attributes that are passed', () => {
// 		const rendered = renderer.create(
// 			<Checkbox value="sample_12" label="Sample Checkbox" aria-label="Checkbox" />
// 		);
// 		expect(rendered.toJSON()).toMatchSnapshot();
// 	});
//
// 	it('should apply custom id if passed', () => {
// 		const rendered = renderer.create(
// 			<Checkbox value="sample_12" label="Sample Checkbox" id="mycheck" />
// 		);
// 		expect(rendered.toJSON()).toMatchSnapshot();
// 	});
//
// 	/**
// 	 * Functionality testing. This single test case covers the sanity for checkbox behavior.
// 	 * jest.fn() mocks a function.
// 	 * Refer: https://facebook.github.io/jest/docs/mock-functions.html
// 	 */
// 	it('should be clickable ', () => {
// 		const onCheckboxClick = jest.fn();
// 		const wrapper = shallow(<Checkbox value="sample_1234" onClick={onCheckboxClick} />);
// 		wrapper.first().simulate('click');
// 		expect(onCheckboxClick).toHaveBeenCalled();
// 	});
//
// 	it('should get checked with a single click', () => {
// 		const wrapper = mount(<Checkbox value="sample_12" label="Sample Checkbox" />);
// 		wrapper.find('input').simulate('change', { target: { value: 'on' } });
// 		expect(wrapper.find('svg').hasClass('opacity0')).toBe(false);
// 	});
//
// 	it('should get unchecked when clicked twice', () => {
// 		const wrapper = mount(<Checkbox value="sample_12" label="Sample Checkbox" />);
// 		wrapper.find('input').simulate('change', { target: { value: 'on' } });
// 		wrapper.find('input').simulate('change', { target: { value: 'off' } });
// 		expect(wrapper.find('svg').hasClass('opacity0')).toBe(true);
// 	});
//
// 	it('should call the user defined onChange when passed', () => {
// 		const onCheckChange = jest.fn();
// 		const wrapper = mount(<Checkbox value="sample_12" label="Sample Checkbox" onChange={onCheckChange} />);
// 		wrapper.find('Checkbox').first().find('input').simulate('change');
// 		expect(onCheckChange).toHaveBeenCalled();
// 	});
// });
