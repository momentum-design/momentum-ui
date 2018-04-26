import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '../Button';
import { Loading } from '@collab-ui/react';

describe('tests for <Button />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Button label="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one Button', () => {
    const container = shallow(<Button label="test" />);

    expect(container.find('button').length).toEqual(1);
  });

  it('should render one Child Div', () => {
    const container = shallow(
      <Button>
        <div>Test</div>
      </Button>
    );

    expect(container.find('button').children().length).toEqual(2);
  });

  it('should render Loader Component if Loading', () => {
    const container = shallow(<Button label="test" loading />);

    expect(container.contains(<Loading />)).toEqual(true);
  });

  it('should be type button by default', () => {
    const container = shallow(<Button label="test" />);

    expect(container.props().type).toEqual('button');
  });

  it('should show active class when passed active prop', () => {
    const container = shallow(<Button active/>);

    expect(container.find('.cui-button').hasClass('active')).toEqual(true);
  });

  it('should show type if passed one', () => {
    const container = shallow(<Button label="test" type="submit" />);

    expect(container.props().type).toEqual('submit');
  });

  it('should output anchor if passed tag a', () => {
    const container = shallow(<Button label="test" tag="a" />);

    expect(container.find('a').length).toEqual(1);
  });

  it('should handle disabled state', () => {
    const container = shallow(<Button label="test" disabled />);

    expect(container.props().disabled).toEqual(true);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = shallow(<Button label="test" onClick={countUp} />);

    container.find('button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyPress as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<Button label="test" onClick={countUp} />);

    container.find('button').simulate('click');
    container
      .find('button')
      .simulate('keyPress', { which: 13, charCode: 13, key: 'Space' });
    expect(count).toEqual(2);
  });
});
