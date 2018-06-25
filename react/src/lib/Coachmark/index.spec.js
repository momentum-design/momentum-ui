import React from 'react';
import { shallow, mount } from 'enzyme';
import { Coachmark } from '@collab-ui/react';

describe('tests for <Coachmark />', () => {
  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match SnapShot', () => {
    const content = <span key="1">Hello how are you doing</span>;
    const container = shallow(
      <Coachmark contentNode={content}>
        <button>Hello</button>
      </Coachmark>
    );

    expect(container).toMatchSnapshot();
  });

  it('should not render one Coachmark without isOpen', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark contentNode={content}>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(0);
  });

  it('should render one Coachmark with isOpen', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark contentNode={content} isOpen>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(1);
  });

  it('should handle contentNode prop', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark contentNode={content} isOpen>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(1);
  });

  it('should handle header prop', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark header={content} isOpen>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-coachmark__header').length).toEqual(1);
  });

  it('should handle subheader prop', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark subheader={content} isOpen>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-coachmark__subheader').length).toEqual(1);
  });

  it('should handle onClick prop', () => {
    const onClick = jest.fn();

    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );

    const container = mount(
      <Coachmark onClick={onClick} buttonChildren={content} isOpen ariaLabel='test'>
        <div className="anchor">Hello</div>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-button').length).toEqual(1);
    container.find('button').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(onClick).toHaveBeenCalled();
  });

  it('when show and hide with delay', () => {

    class Container extends React.Component {
      state = {
        coachmarkOpen: false
      }
      render() {

        const content = (
          <span className="coachmark-content" key="1">
            Hello how are you doing
          </span>
        );

        return (
          <Coachmark
            contentNode={content}
            showDelay={200}
            hideDelay={100}
            isOpen={this.state.coachmarkOpen}
          >
            <button tabIndex="0" className="anchor">
              Hello
            </button>
          </Coachmark>
        );
      }
    }
    const container = mount(<Container/>);

    expect(container.find('.coachmark-content').length).toEqual(0);

    container.setState({ coachmarkOpen: true });

    jest.runTimersToTime(300);
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(1);

    container.find('EventOverlay').instance().handleAllowClickAway({});

    jest.runTimersToTime(200);
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(0);
  });
});
