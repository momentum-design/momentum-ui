import React from 'react';
import { shallow, mount } from 'enzyme';
import FormSubSection from '@collab-ui/react/FormSubSection';

describe('tests for <FormSubSection />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<FormSubSection id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render only FormSubSection', () => {
    const container = shallow(<FormSubSection />);

    expect(container.find('.sub-section').length).toEqual(1);
  });

  it('should render label', () => {
    const container = shallow(<FormSubSection label="test" />);

    expect(container.find('.sub-section__label').text()).toEqual('test');
  });

  it('should render description', () => {
    const container = shallow(<FormSubSection description="test" />);

    expect(container.find('.sub-section__description').text()).toEqual('test');
  });

  it('should render children under Form Content wrapper', () => {
    const container = mount(
      <FormSubSection>
        <div className="testingChildren" />
      </FormSubSection>
    );

    expect(container.find('.testingChildren').length).toEqual(1);
  });
});
