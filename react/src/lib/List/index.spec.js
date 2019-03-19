import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  List,
  ListItem,
  SelectOption,
  SpaceListItem,
} from '@collab-ui/react';

describe('tests for <List />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<List id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one List', () => {
    const container = mount(<List />);

    expect(container.find('.cui-list').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<List className='menuItem'/>);

    expect(container.find('.cui-list').hasClass('menuItem')).toEqual(true);
  });

  it('should handle role prop', () => {
    const container = shallow(<List role='menuitem'/>);

    expect(container.find('.cui-list').props().role).toEqual('menuitem');
  });

  it('should handle tabType prop', () => {
    const container = shallow(
      <List tabType='horizontal'>
        <ListItem />
      </List>
    );

    expect(container.find('.cui-list--horizontal').length).toEqual(1);
  });

  it('should handle wrap prop', () => {
    const container = shallow(
      <List tabType='horizontal' wrap>
        <ListItem />
      </List>
    );

    expect(container.find('.cui-list--wrap').length).toEqual(1);
  });

  it('should handle itemRole prop', () => {
    const container = mount(
      <List itemRole='newRole'>
        <ListItem />
      </List>
    );
    
    expect(container.find('[role="newRole"]').length).toEqual(1);
  });

  it('should handle type prop', () => {
    const container = mount(
      <List type='small'>
        <ListItem />
      </List>
    );

    expect(container.find('.cui-list-item--small').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <List>
        <div className="testingforTC" />
      </List>
    );

    expect(container.find('.testingforTC').length).toEqual(1);
  });

  it('should handle onSelect event', () => {
    const onSelect = jest.fn();

    const container = mount(
      <List onSelect={onSelect}>
        <ListItem label="test" link='javscript:void(0)' />
        <ListItem className='secondIndex' link='javscript:void(0)' />
      </List>
    );

    container.find('.secondIndex').first().simulate('click');
    expect(onSelect).toHaveBeenCalled();
  });

  it('should handle keyPress event (Up/Down/Left/Right)', () => {
    const container = mount(
      <List>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );
    container.update();
    container.update();

    const anchor1 = container.find('.firstIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.state().listContext.focus).toEqual('test-list-2');
    anchor1.simulate('keydown', {keyCode: 39, which: 39, charCode: 39});
    expect(container.state().listContext.focus).toEqual('test-list-2');

    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    expect(container.state().listContext.focus).toEqual('test-list-3');
    anchor1.simulate('keydown', {keyCode: 37, which: 37, charCode: 37});
    expect(container.state().listContext.focus).toEqual('test-list-3');
  });

  it('should handle keyPress event (PageUp/PageDown/Home/End)', () => {
    const container = mount(
      <List>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();
    const anchor3 = container.find('.thirdIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 34, which: 34, charCode: 34});
    expect(container.state().listContext.focus).toEqual('test-list-3');
    anchor1.simulate('keydown', {keyCode: 35, which: 35, charCode: 35});
    expect(container.state().listContext.focus).toEqual('test-list-3');

    anchor3.simulate('keydown', {keyCode: 33, which: 33, charCode: 33});
    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor3.simulate('keydown', {keyCode: 36, which: 36, charCode: 36});
    expect(container.state().listContext.focus).toEqual('test-list-1');
  });

  it('should handle keyPress event (o)', () => {
    const container = mount(
      <List>
        <ListItem className='firstIndex' label="arrest" link='javscript:void(0)' id='test-list-1' />
        <ListItem className='secondIndex' label="detest" link='javscript:void(0)' id='test-list-2'/>
        <ListItem className='thirdIndex' label="obsessed" link='javscript:void(0)' id='test-list-3' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 79, which: 79, charCode: 79, key: 'o'});
    expect(container.state().listContext.focus).toEqual('test-list-3');
  });

  it('should loop by default', () => {
    const container = mount(
      <List>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    expect(container.state().listContext.focus).toEqual('test-list-3');
  });

  it('should not loop when shouldLoop={false}', () => {
    const container = mount(
      <List shouldLoop={false}>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    expect(container.state().listContext.focus).toEqual('test-list-1');
  });

  it('should handle SpaceListItem child', () => {
    const container = mount(
      <List>
        <SpaceListItem link='javscript:void(0)' header='header' id='test-list-1'/>
      </List>
    );

    expect(container.find('.cui-list-item--space').exists()).toEqual(true);
    expect(container.state().listContext.focus).toEqual('test-list-1');
    expect(container.state().listContext.active).toEqual(null);
  });

  it('should overwrite state with active prop', () => {
    const container = mount(
      <List active={'test-list-2'}>
        <SpaceListItem link='javscript:void(0)' header='header' id='test-list-1'/>
        <SelectOption link='javscript:void(0)' id='test-list-2'/>
      </List>
    );

    expect(container.find('.cui-list-item').at(0).hasClass('active')).toEqual(false);
    expect(container.find('.cui-list-item').at(1).hasClass('active')).toEqual(true);
  });

  it('should handle navigation on disabled children', () => {
    const container = mount(
      <List>
        <SpaceListItem className='firstIndex' link='javscript:void(0)' header='header' disabled/>
        <SpaceListItem className='secondIndex' link='javscript:void(0)' header='header' id='test-list-1'/>
        <SpaceListItem className='thirdIndex' link='javscript:void(0)' header='header' disabled/>
        <SpaceListItem className='fourthIndex' link='javscript:void(0)' header='header' id='test-list-2'/>
        <SpaceListItem className='fifthIndex' link='javscript:void(0)' header='header' disabled/>
      </List>
    );

    expect(container.state().listContext.focus).toEqual('test-list-1');
    const anchor2 = container.find('.secondIndex').first();
    anchor2.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    const anchor4 = container.find('.fourthIndex').first();
    expect(container.state().listContext.focus).toEqual('test-list-2');
    anchor4.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.state().listContext.focus).toEqual('test-list-1');
  });

  it('should handle navigation on readOnly children', () => {
    const container = mount(
      <List>
        <SpaceListItem className='firstIndex' link='javscript:void(0)' header='header' isReadOnly/>
        <SpaceListItem className='secondIndex' link='javscript:void(0)' header='header' id='test-list-1'/>
        <SpaceListItem className='thirdIndex' link='javscript:void(0)' header='header' isReadOnly/>
        <SpaceListItem className='fourthIndex' link='javscript:void(0)' header='header' id='test-list-2'/>
        <SpaceListItem className='fifthIndex' link='javscript:void(0)' header='header' isReadOnly/>
      </List>
    );

    expect(container.state().listContext.focus).toEqual('test-list-1');
    const anchor2 = container.find('.secondIndex').first();
    anchor2.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.state().listContext.focus).toEqual('test-list-2');
    const anchor4 = container.find('.fourthIndex').first();
    anchor4.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.state().listContext.focus).toEqual('test-list-1');
  });

  it('should handle focusFirst prop', () => {
    const container = mount(
      <List focusFirst={false}>
        <ListItem className='firstIndex' label="test" link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" link='javscript:void(0)' />
      </List>
    );
    container.update();

    expect(container.state().listContext.focus).toEqual(null);
  });
});
