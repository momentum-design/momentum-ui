import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputMessage } from '@momentum-ui/react';

describe('tests for <InputMessage />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(<InputMessage error={'test'} />);

    expect(container).toMatchSnapshot();
  });

  it('should match render error with rendered text', () => {
    const container = mount(<InputMessage error={'test'} />);

    expect(container.find('.message').text()).toEqual('test');
  });
});
