/**
 * @category controls
 * @component date-picker
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Input,
  EventOverlay
} from '@collab-ui/react';
import Calendar from '@collab-ui/react/Datepicker/Calendar';
import * as utils from '@collab-ui/react/Datepicker/date_utils';
import moment from 'moment';

export default class DatePicker extends React.Component {
  static displayName = 'DatePicker';

  static childContextTypes = {
    handleDayClick: PropTypes.func,
    handleMonthChange: PropTypes.func,
    focus: PropTypes.object,
    selected: PropTypes.object,
  };

  state = {
    anchorNode: null,
    isOpen: false,
    focus: null,
    selected: null,
    inputValue: null,
  };

  getChildContext = () => {
    const { onMonthChange } = this.props;
    const { focus, selected } = this.state;
    return {
      handleDayClick: (date, event) => this.handleSelect(date, event),
      handleMonthChange: date => onMonthChange && onMonthChange(date),
      focus,
      selected,
    };
  };

  componentWillMount() {
    const { initialSelection, minDate, maxDate } = this.props;
    const selection = (
      (!utils.isDayDisabled(initialSelection, this.props) && initialSelection)
      || (minDate && minDate)
      || (maxDate && maxDate)
    );

    this.setPreSelection(selection);
  }

  setOpen = open => {
    this.setState({
      isOpen: open,
    });
  };

  handleInputChange = event => {
    const date = utils.parseDate(event.target.value, this.props);
    if (date) {
      this.setState({ inputValue: event.target.value });
      this.setPreSelection(date, event);
      this.setSelected(date, event);
    }
  };

  handleSelect = (date, event) => {
    const { shouldCloseOnSelect } = this.props;
    this.setSelected(date, event);
    this.setPreSelection(date);
    shouldCloseOnSelect && this.setOpen(false);
  };

  setSelected = (date, event) => {
    const { dateFormat, onSelect, locale } = this.props;

    !utils.isDayDisabled(date, this.props)
    && this.setState({
      selected: date,
      inputValue: utils.formatDate(utils.localizeDate(date, locale), dateFormat),
    }, () => onSelect && onSelect(date, event));
  };

  setPreSelection = date => {
    const { onChange } = this.props;

    !utils.isDayDisabled(date, this.props)
    && this.setState({
      focus: date,
    }, () => onChange && onChange(date));
  };

  handleInputClick = () => {
    this.setOpen(true);
  };

  handleInputKeyDown = e => {
    const { focus, isOpen } = this.state;

    let flag = false;
    const copy = utils.newDate(focus);

    switch (!e.shiftKey && e.which) {
      case 32:
      case 13:
        if(!isOpen) {
          this.handleInputClick();
        } else if (
          utils.isMoment(focus) ||
          utils.isDate(focus)
        ) {
          this.handleSelect(copy, e);
        }
        flag = true;
        break;

      case 38: //up
        this.setPreSelection(utils.subtractWeeks(copy, 1));
        flag = true;
        break;
      case 37:// left
        this.setPreSelection(utils.subtractDays(copy, 1));
        flag = true;
        break;

      case 39: //right
        this.setPreSelection(utils.addDays(copy, 1));
        flag = true;
        break;

      case 40: //bottom
        this.setPreSelection(utils.addWeeks(copy, 1));
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  };



  render() {
    const {
      disabled,
      htmlId,
      label,
      name,
      placeholder,
      monthFormat,
      filterDate,
      locale,
      maxDate,
      minDate,
      direction,
    } = this.props;

    const { selected, focus, anchorNode, isOpen, inputValue } = this.state;

    const renderInput = () => {
      return (
        <Input
          disabled={disabled}
          htmlId={`${htmlId}-input`}
          inputRef={ref => !this.state.anchorNode && this.setState({ anchorNode: ref})}
          label={label}
          name={`${name}-input`}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
          onMouseDown={this.handleInputClick}
          placeholder={placeholder}
          value={inputValue}
        >
          <Icon name='calendar-month_20' isAria={false} />
        </Input>
      );
    };

    const calendar = (
      <Calendar
        monthFormat={monthFormat}
        filterDate={filterDate}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        focus={focus}
        selected={selected}
      />
    );

    const popoverElement = (
      <EventOverlay
        allowClickAway
        isDynamic
        anchorNode={anchorNode}
        close={() => this.setOpen(false)}
        direction={direction}
        isOpen={isOpen}
      >
        {calendar}
      </EventOverlay>
    );

    return (
      <div className='cui-datepicker-container'>
        {renderInput()}
        {popoverElement}
      </div>
    );
  }
}


DatePicker.propTypes = {
  dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  monthFormat: PropTypes.string,
  disabled: PropTypes.bool,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  locale: PropTypes.string,
  filterDate: PropTypes.func,
  onMonthChange: PropTypes.func,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  initialSelection: PropTypes.object,
  shouldCloseOnSelect: PropTypes.bool,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  direction: PropTypes.string,
};

DatePicker.defaultProps = {
  dateFormat: 'L',
  monthFormat: 'MMMM YYYY',
  onMonthChange: null,
  onSelect: null,
  locale: 'en',
  shouldCloseOnSelect: true,
  disabled: false,
  filterDate: null,
  onChange: null,
  initialSelection: moment(),
  direction: 'bottom-center',
};

/**
* @name Datepicker
*
* @category controls
* @component date-picker
* @section default
*
* @js

export default class DatePickerDefault extends React.PureComponent {
  render() {
    return (
      <DatePicker
        placeholder='Pick a Date'
      />
    );
  }
}
**/
