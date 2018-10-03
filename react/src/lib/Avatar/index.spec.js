import React from 'react';
import { shallow, mount } from 'enzyme';
import { Avatar, Icon } from '@collab-ui/react';

describe('tests for <Avatar />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Avatar />);

    expect(container).toMatchSnapshot();
  });

  it('sequence of image load  ', () => {
    const container = mount(<Avatar src="test.png" title="Test Name" />);

    expect(container.find('.cui-avatar__img').hasClass('cui-avatar__img--hidden')).toEqual(true);
    expect(container.find('.cui-avatar__letter').length).toEqual(1);

    container.setState({ isImageLoaded: true });

    expect(container.find('.cui-avatar__img').hasClass('cui-avatar__img--hidden')).toEqual(false);
    expect(container.find('.cui-avatar__letter').exists()).toEqual(false);
  });

  it('should handle isDecrypting prop', () => {
    const container = mount(<Avatar isDecrypting icon={<Icon name='handset_24' />} />);

    expect(container.find('.cui-decrypting').length).toEqual(1);
  });

  it('should handle isOverview prop', () => {
    const container = mount(<Avatar isOverview icon={<Icon name='handset_24' />} />);

    expect(container.find('.cui-avatar__icon--overview').length).toEqual(1);
  });

  it('should trim title', () => {
    const container = mount(<Avatar src="test.png" title="    Test Name     " />);
    expect(container.find('.cui-avatar__letter').text()).toEqual('TN');
  });

  it('should display title for user', () => {
    const container = mount(<Avatar src="test.png" title="Test Name" />);
    expect(container.find('.cui-avatar__letter').text()).toEqual('TN');
  });

  it('should display title for group', () => {
    const container = mount(<Avatar src="test.png" title="Test Group" type="group" />);
    expect(container.find('.cui-avatar__letter').text()).toEqual('T');
  });

  it('should display title for group', () => {
    const container = mount(<Avatar src="test.png" title="Test Group" type="group" />);
    expect(container.find('.cui-avatar__letter').text()).toEqual('T');
    expect(container.find('.cui-avatar').props().title).toEqual('Test Group');
  });

  it('should handle dark theme', () => {
    const container = mount(<Avatar theme="dark" />);
    expect(container.find('.cui-avatar--dark').length).toEqual(1);
  });

  describe('should apply respective classes for types', () => {

    it('when the type is group', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="group" />);
      expect(container.find('.cui-avatar--group').length).toEqual(1);
    });

    it('when the type is active', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="active" />);
      expect(container.find('.cui-avatar--active').length).toEqual(1);
    });

    it('when the type is inactive', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="inactive" />);
      expect(container.find('.cui-avatar--inactive').length).toEqual(1);
    });

    it('when the type is Do Not Disturb', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="dnd" />);
      expect(container.find('.cui-avatar--dnd').length).toEqual(1);
    });

    it('when the type is Out of Office', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="ooo" />);
      expect(container.find('.cui-avatar--ooo').length).toEqual(1);
    });

    it('when the type is typing', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="typing" />);
      expect(container.find('.cui-avatar--typing').length).toEqual(1);
      expect(container.find('.cui-loading').length).toEqual(1);
    });

    it('when the type is bot', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="bot" />);
      expect(container.find('.cui-avatar--bot').length).toEqual(1);
    });

    describe('should for type self apply correct icon size', () => {

      it('when size is 36', () => {
        const container = mount(<Avatar src="test.png" title="Test Group" size={36} type='self'/>);

        expect(container.find('.cui-icon').props().width).toEqual(16);
        expect(container.find('.cui-avatar__self').length).toEqual(1);
      });

      it('when the size is default(medium)', () => {
        const container = mount(<Avatar src="test.png" title="Test Group" type="self" />);

        expect(container.find('.cui-icon').props().width).toEqual(18);
        expect(container.find('.cui-avatar__self').length).toEqual(1);
      });

      it('when size is 40', () => {
        const container = mount(<Avatar src="test.png" size={40} title="Test Group" type='self'/>);

        expect(container.find('.cui-icon').props().width).toEqual(18);
        expect(container.find('.cui-avatar__self').length).toEqual(1);
      });

    });

    it('when the failureBadge is true', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" failureBadge />);
      expect(container.find('.cui-avatar__failure-badge').length).toEqual(1);
    });

    it('when the hasNotification is true', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" hasNotification />);
      expect(container.find('.cui-avatar__notification-badge').length).toEqual(1);
    });

  });

  describe('should apply respective classes for size', () => {

    it('when size is 18/xsmall', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" size="xsmall" />);
      expect(container.find('.cui-avatar--xsmall').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={18} title="Test Group" />);
      expect(container.find('.cui-avatar--18').length).toEqual(1);
    });

    it('when size is 24', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={24} />);
      expect(container.find('.cui-avatar--24').length).toEqual(1);
    });

    it('when size is 28/small', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" size="small" />);
      expect(container.find('.cui-avatar--small').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={28} title="Test Group" />);
      expect(container.find('.cui-avatar--28').length).toEqual(1);
    });

    it('when size is 36', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={36} />);
      expect(container.find('.cui-avatar--36').length).toEqual(1);
    });

    it('when size is 40/medium(default)', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" />);
      expect(container.find('.cui-avatar--medium').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={40} title="Test Group"/>);
      expect(container.find('.cui-avatar--40').length).toEqual(1);
    });

    it('when size is 44', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={44} />);
      expect(container.find('.cui-avatar--44').length).toEqual(1);
    });

    it('when size is 52/large', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" size="large" />);
      expect(container.find('.cui-avatar--large').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={52} title="Test Group" />);
      expect(container.find('.cui-avatar--52').length).toEqual(1);
    });

    it('when size is 56', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={56} />);
      expect(container.find('.cui-avatar--56').length).toEqual(1);
    });

    it('when size is 72', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={72} />);
      expect(container.find('.cui-avatar--72').length).toEqual(1);
    });

    it('when size is 80', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={80} />);
      expect(container.find('.cui-avatar--80').length).toEqual(1);
    });

    it('when size is 84/xlarge', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" size="xlarge" />);
      expect(container.find('.cui-avatar--xlarge').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={84} title="Test Group" />);
      expect(container.find('.cui-avatar--84').length).toEqual(1);
    });
  });

  it('should apply clickable class when onClick prop is defined', () => {
    let container = mount(<Avatar src="test.png" title="Test Group" onClick={()=>{}} />);
    expect(container.find('.cui-avatar--clickable').length).toEqual(1);
  });

  it('should not apply clickable class when onClick prop is undefined', () => {
    let container = mount(<Avatar src="test.png" title="Test Group" />);
    expect(container.find('.cui-avatar--clickable').length).toEqual(0);
  });

  it('should display icon', () => {
    const container = shallow(<Avatar icon={<Icon name="test" />} />);
    expect(container.find('.cui-avatar__icon').length).toEqual(1);
  });

  it('should display tooltip', () => {
    const container = shallow(<Avatar title="test title" hideDefaultTooltip />);
    expect(container.find('.cui-avatar').props().title).toEqual('');
  });

  it('should wrap in button', () => {
    const props = {
      name: 'accessibility_16',
      onClick: ()=>{},
      ariaLabel: 'Accesible',
    };

    const container = mount(<Avatar {...props} />);
    expect(container.find('.cui-button').exists()).toEqual(true);
    expect(container.find('.cui-button--none').exists()).toEqual(true);
  });

  it('should handle onClick event', () => {
    const onClick = jest.fn();
    const props = {
      name: 'accessibility_16',
      onClick: onClick,
      ariaLabel: 'Accesible',
    };

    const container = mount(<Avatar {...props} />);

    container.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should pass other props to the avatar', () => {
    const props = {
      name: 'accessibility_16',
      id: 'testId'
    };

    const container = mount(<Avatar {...props} />);
    const avatarEle = container.find('.cui-avatar');
    expect(avatarEle.props().id).toEqual(props.id);
  });

  it('should pass other props to the button if onClick Present', () => {
    const props = {
      name: 'accessibility_16',
      id: 'testId',
      ariaLabel: 'Accesible',
      onClick: ()=>{}
    };

    const container = mount(<Avatar {...props} />);
    const buttonEle = container.find('button');
    expect(buttonEle.props().id).toEqual(props.id);
  });
});
