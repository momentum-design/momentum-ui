/**
 * @category controls
 * @component time-picker
 * @variations collab-ui-react
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { uniqueId } from 'lodash';
import TimepickerDropdown from '@collab-ui/react/TimePicker/TimepickerDropdown';
import TimeSelector from '@collab-ui/react/TimePicker/TimeSelector';
import {
  Input,
  EventOverlay,
} from '@collab-ui/react';

class TimePicker extends React.Component {

  state = {
    inputId: this.props.inputId || uniqueId('cui-timepicker__input-'),
    isOpen: false,
    selectedTime: moment(this.props.selectedTime),
    activeIndex: null,
    anchorNode: null
  };

  componentDidUpdate = (prevProps, prevState) => {
    const hourEntry = this.hour;

    if (!prevState.isOpen && this.state.isOpen) {
      this.focusOnNode(hourEntry);
    }
  };

  // Jest does not handle DOM.focus(), this allows Jest to mock this function
  focusOnNode = node => {
    node.focus();
  };

  hidePopover = () => {
    this.setState({
      isOpen: false
    });
  };

  onFocus = () => {
    this.setState({
      isOpen: true,
      anchorNode: ReactDOM.findDOMNode(this.clickTextField).parentNode
    });
  };

  onMouseDown = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      anchorNode: ReactDOM.findDOMNode(this.clickTextField).parentNode
    });
  };

  triggerOnChange = dayChange => {
    this.props.onChange &&
      this.props.onChange(
        this.state.selectedTime.hour(),
        this.state.selectedTime.minute(),
        dayChange
      );
  };

  changeTime = (unit, change) => {
    const newTime = moment(this.state.selectedTime).add(change, unit);
    let dayChange = 0;

    if (change >= 0) {
      if (
        newTime
          .clone()
          .startOf('day')
          .isAfter(moment().startOf('day'))
      ) {
        newTime.add(-1, 'day');
        dayChange = 1;
      }
    } else {
      if (
        newTime
          .clone()
          .startOf('day')
          .isBefore(moment().startOf('day'))
      ) {
        newTime.add(1, 'day');
        dayChange = -1;
      }
    }

    this.setState({ selectedTime: newTime }, () => this.triggerOnChange(dayChange));
  };

  setTime = (hour, minute, pre) => {
    const meridianHour =
      pre === 'PM' && parseInt(hour) < 12
        ? parseInt(hour) + 12
        : pre === 'AM' && parseInt(hour) === 12 ? 0 : hour;

    this.setState({
      selectedTime: this.state.selectedTime
        .clone()
        .hour(meridianHour)
        .minute(minute)
    }, () => this.triggerOnChange(0));
  };

  onSelectKeyDown = (unit, e) => {
    e.preventDefault();

    const { minuteInterval, militaryTime } = this.props;
    const hour =
      !this.hour.value && unit === 'h'
        ? militaryTime ? 0 : 1
        : this.hour.value;
    const minute = !this.minute.value && unit === 'm' ? 0 : this.minute.value;
    const pre = !militaryTime && this.pre.value;

    if (e.keyCode === 65 && unit === 'pre') {
      if (this.pre.value.includes('A')) return;

      return this.changeTime('h', 12);
    } else if (e.keyCode === 80 && unit === 'pre') {
      if (this.pre.value.includes('P')) return;

      return this.changeTime('h', 12);
    } else if (e.keyCode === 38) {
      if (unit === 'pre') return this.changeTime('h', 12);
      if (unit === 'h') return this.changeTime('h', 1);

      return this.changeTime(unit, minuteInterval);
    } else if (e.keyCode === 40) {
      if (unit === 'pre') return this.changeTime('h', -12);
      if (unit === 'h') return this.changeTime('h', -1);

      return this.changeTime(unit, -minuteInterval);
    } else {
      this.setTime(hour, minute, pre);
    }
  };

  onSelectWheel = (unit, e) => {
    if (e.deltaY < 0) {
      this.changeTime(unit, 1);
    } else if (e.deltaY > 0) {
      this.changeTime(unit, -1);
    }
    e.preventDefault();
  };

  render() {
    const { militaryTime, minuteInterval } = this.props;
    const { inputId } = this.state;

    // Force the global locale onto our display moment
    let selectedMoment = this.state.selectedTime.locale(moment.locale());
    // Splits the moment string into seperate parts in order to add functionality to the TimePicker
    const timeString = militaryTime
      ? selectedMoment.format('HH:mm')
      : selectedMoment.format('LT');

    const hourText = selectedMoment.format(militaryTime ? 'HH' : 'hh');
    const minuteText = selectedMoment.format('mm');
    const postText = selectedMoment.format('A');

    const text = (
      <Input
        label=""
        name={inputId}
        id={inputId}
        onChange={() => {}}
        value={timeString}
        onMouseDown={this.onMouseDown}
        onFocus={this.onFocus}
        inputRef={ref => (this.clickTextField = ref)}
        readOnly
      />
    );

    const dropdownElement = (
      <EventOverlay
        allowClickAway
        anchorNode={this.state.anchorNode}
        close={this.hidePopover}
        isOpen={this.state.isOpen}
      >
        <TimepickerDropdown>
          <TimeSelector
            unit="h"
            min={0}
            value={hourText}
            onWheel={this.onSelectWheel}
            inputRef={ref => (this.hour = ref)}
            onKeyDown={this.onSelectKeyDown}
            onUpClick={() => this.changeTime('h', 1)}
            onDownClick={() => this.changeTime('h', -1)}
            militaryTime={militaryTime}
          />
          :
          <TimeSelector
            unit="m"
            min={0}
            value={minuteText}
            onWheel={this.onSelectWheel}
            inputRef={ref => (this.minute = ref)}
            onKeyDown={this.onSelectKeyDown}
            onUpClick={() => this.changeTime('m', minuteInterval)}
            onDownClick={() => this.changeTime('m', -minuteInterval)}
          />
          {!militaryTime && (
            <TimeSelector
              unit="pre"
              value={postText}
              inputRef={ref => (this.pre = ref)}
              onKeyDown={this.onSelectKeyDown}
              onWheel={this.onSelectWheel}
              onUpClick={() => this.changeTime('h', 12)}
              onDownClick={() => this.changeTime('h', -12)}
            />
          )}
        </TimepickerDropdown>
      </EventOverlay>
    );

    return (
      <div className="cui-timepicker-container">
        {text}
        {dropdownElement}
      </div>
    );
  }
}

TimePicker.propTypes = {
  /** @prop Optional CSS class name | '' */
  className: PropTypes.string,
  /** @prop Set Input element ID | '' */
  inputId: PropTypes.string,
  /** @prop Choose to use military time | false */
  militaryTime: PropTypes.bool,
  /** @prop Determine the minute interval | 1 */
  minuteInterval: PropTypes.oneOf([1, 5, 15, 30, 60]),
  /** @prop Callback function invoked when user makes a change | null */
  onChange: PropTypes.func,
  /** @prop Set the initial selected time | null */
  selectedTime: PropTypes.instanceOf(Date),
};

TimePicker.defaultProps = {
  className: '',
  inputId: '',
  militaryTime: false,
  minuteInterval: 1,
  onChange: null,
  selectedTime: null,
};

TimePicker.displayName = 'TimePicker';

export default TimePicker;

/**
* @component time-picker
* @section default
* @react

import { Input, TimePicker } from '@collab-ui/react';

export default class TimePickerDefault extends React.PureComponent {
  render() {
    return (
      <div className='timePicker-container'>
        <TimePicker
          selectedTime={new Date()}
        />
      </div>
    );
  }
}

**/

/**
* @component time-picker
* @section 24-hour
* @react

import { Input, TimePicker } from '@collab-ui/react';

export default class TimePicker24Hr extends React.PureComponent {
  render() {
    return (
      <div className='timePicker-container'>
        <TimePicker
          selectedTime={new Date()}
          militaryTime
        />
      </div>
    );
  }
}

**/

/**
* @component time-picker
* @section 30-minute-step
* @react

import { Input, TimePicker } from '@collab-ui/react';

export default class TimePicker30MinStep extends React.PureComponent {
  render() {
    return (
      <div className='timePicker-container'>
        <TimePicker
          minuteInterval={30}
          selectedTime={new Date()}
        />
      </div>
    );
  }
}

**/
