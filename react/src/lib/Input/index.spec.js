import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  Icon,
  Input,
  InputError,
  InputHelper,
  Label
} from '@collab-ui/react';

describe('tests for <Input />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" type="text" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should match number SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" type="number" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should match password SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" type="password" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should match clear SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" type="text" clear />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render one Input', () => {
    const container = shallow(<Input htmlId="1" name="test" label="test" />);

    expect(container.find('input').length).toEqual(1);
    expect(container.children().length).toEqual(2);
  });

  it('should render one Input and apply dirty class', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" value="test" />
    );

    expect(container.find('.dirty').length).toEqual(1);
  });

  it('should render Label', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" />
    );

    expect(
      container.contains(
        <Label className="cui-label" htmlFor="test123" label="test" />
      )
    ).toEqual(true);
  });

  it('should pass class based on inputSize prop', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" inputSize="medium-12" />
    );

    expect(container.find('div').hasClass('medium-12')).toEqual(true);
    expect(container.find('div').hasClass('columns')).toEqual(true);
  });

  it('should pass placeholder attribute', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" placeholder="test" />
    );

    expect(container.find('input').props().placeholder).toEqual('test');
  });

  it('should pass disabled attribute', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" disabled />
    );

    expect(container.find('input').props().disabled).toEqual(true);
  });

  it('should pass readOnly attribute', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" readOnly />
    );

    expect(container.find('input').props().readOnly).toEqual(true);
  });

  it('should pass value attribute', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" value="testing" />
    );

    expect(container.find('input').props().value).toEqual('testing');
  });

  it('should pass class based on nesting', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" nestedLevel={1} />
    );

    expect(container.hasClass('cui-input--nested-1')).toEqual(true);
  });

  it('should render Secondary Container and Label', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" secondaryLabel="test" />
    );

    expect(
      container.contains(
        <Label
          className="cui-label__secondary-label"
          htmlFor="test123"
          label="test"
        />
      )
    ).toEqual(true);

    expect(
      container.find('div.cui-label__secondary-label-container')
    ).toHaveLength(1);
  });

  it('should render Helper Text', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" inputHelpText="test" />
    );

    expect(container.contains(<InputHelper message="test" />)).toEqual(true);
  });

  it('should determine correct error class(warning)', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        errorArr={[{ error: 'test', type: 'warning' }]}
      />
    );

    expect(container.find('.cui-input-group').hasClass('warning')).toEqual(
      true
    );
  });

  it('should determine correct error class(error)', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        errorArr={[{ error: 'test', type: 'error' }]}
      />
    );

    expect(container.find('.cui-input-group').hasClass('error')).toEqual(true);
  });

  it('should determine correct error class if passed error and warning(error)', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        errorArr={[
          { error: 'error1', type: 'error' },
          { error: 'error2', type: 'warning' },
        ]}
      />
    );

    expect(container.find('.cui-input-group').hasClass('error')).toEqual(true);
  });

  it('should render Error Component', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        errorArr={[{ error: 'test', type: 'error' }]}
      />
    );

    expect(container.contains(<InputError error={'test'} />)).toEqual(true);
  });

  it('should support input ref', () => {
    class Container extends React.Component {
      render() {
        return (
          <Input
            htmlId="test123"
            name="test"
            label="test"
            inputRef={ref => (this.input = ref)}
          />
        );
      }
    }
    const instance = mount(<Container />).instance();

    expect(instance.input.tagName).toEqual('INPUT');
  });

  it('should render children', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test">
        <div className="testingforhoc" />
      </Input>
    );

    expect(container.find('.testingforhoc').length).toEqual(1);
  });

  it('should handle onChange event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <Input htmlId="test" name="test" label="test" onChange={countUp} />
    );

    container.find('input').simulate('change', { target: { value: 'test' } });
    expect(count).toEqual(1);
  });

  it('should handle mouse down event', () => {
    let count = 0;
    const container = shallow(
      <Input
        htmlId="test"
        name="test"
        label="test"
        onMouseDown={() => count++}
      />
    );

    container.find('input').simulate('mousedown');
    expect(count).toEqual(1);
  });

  it('should handle onFocus event', () => {
    let count = 0;
    const container = shallow(
      <Input htmlId="test" name="test" label="test" onFocus={() => count++} />
    );

    container.find('input').simulate('focus');
    expect(count).toEqual(1);
  });

  it('should handle onClick event', () => {
    const onClickFn = jest.fn();
    const container = shallow(
        <Input htmlId="test" name="test" label="test" onClick={onClickFn} />
    );
    container.find('input').simulate('click');
    expect(onClickFn).toHaveBeenCalled();
  });

  it('should not render clear icon', () => {
    const container = mount(<Input htmlId="test" name="test" label="test" />);

    container.find('input').simulate('change', { target: { value: 'test' } });
    expect(container.find('.cui-button--icon').exists()).toBeFalsy();
  });

  it('should render clear icon if prop is present', () => {
    const container = mount(
      <Input htmlId="test" name="test" label="test" clear />
    );

    container.find('input').simulate('change', { target: { value: 'test' } });
    expect(container.find('.cui-button--icon').exists()).toEqual(true);
  });

  it('should clear value if clear icon is clicked', () => {
    const container = mount(
      <Input htmlId="test" name="test" label="test" value="test" clear />
    );

    expect(container.find('input').props().value).toEqual('test');

    container.find('button.cui-button--icon').simulate('click');
    expect(container.find('input').props().value).toEqual('');
    expect(container.find('.cui-button--icon').exists()).toBeFalsy();
  });

  it('should clear value if Enter is pressed on the keyboard', () => {
    const container = mount(
      <Input htmlId="test" name="test" label="test" value="test" clear />
    );

    expect(container.find('input').props().value).toEqual('test');
    container.find('button.cui-button--icon').simulate('keydown', { key: 'Enter', keyCode: 13, which: 13 });
    expect(container.find('input').props().value).toEqual('');
    expect(container.find('.cui-button--icon').exists()).toBeFalsy();
  });


  it('should clear value if Space is pressed on the keyboard', () => {
    const container = mount(
      <Input htmlId="test" name="test" label="test" value="test" clear />
    );

    expect(container.find('input').props().value).toEqual('test');
    container.find('button.cui-button--icon').simulate('keydown', { key: 'Space', keyCode: 32, which: 32 });
    expect(container.find('input').props().value).toEqual('');
    expect(container.find('.cui-button--icon').exists()).toBeFalsy();
  });

  it('should focus on input when clear is triggered with htmlId', () => {
    const container = mount(
      <Input htmlId="test" label="test" value="test" clear />
    );

    container.find('button.cui-button--icon').simulate('click');
    expect(container.find('input') === document.activeElement);
  });

  it('should focus on input when clear is triggered with id', () => {
    const container = mount(
      <Input id="test" label="test" value="test" clear />
    );

    container.find('button.cui-button--icon').simulate('click');
    expect(container.find('input') === document.activeElement);
  });

  it('should not render custom icon', () => {
    const container = mount(<Input htmlId="test" name="test" label="test" />);
    expect(container.find('.cui-input__icon').exists()).toBeFalsy();
  });

  it('should render custom icon if prop is present', () => {
    const iconNode = (
      <Icon
        name="icon-info_16"
        ariaLabel={'custom icon'}
      />
    );

    const container = mount(
      <Input id="test" label="test" value="test" iconNode={iconNode} />
    );

    expect(container.find('.cui-input__icon').exists()).toEqual(true);
  });
});
