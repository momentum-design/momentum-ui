import React from 'react';
import PropTypes from 'prop-types';

class TimeSelector extends React.Component {
  
  state = {
    value: this.props.value,
    isEditing: false
  };
  
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.value !== this.props.value && !this.state.isEditing) {
      this.setState({ value: this.props.value });
    }
  };
  
  handleOnChange = e => {
    const { unit, militaryTime } = this.props;
    let newValue = e.currentTarget.value;
    
    if (/[a-zA-Z]/.test(e.currentTarget.value)) {
      e.stopPropagation();
      return false;
    } else if (unit === 'h') {
      newValue =
      militaryTime
      ? (parseInt(newValue, 10) > 23 ? 23 : parseInt(newValue, 10)) || ''
      : (parseInt(newValue, 10) > 12 ? 12 : parseInt(newValue, 10)) || '';
    } else if (unit === 'm') {
      newValue =
      parseInt(newValue, 10) > 59 ? 59 : parseInt(newValue, 10) || '';
    }
    
    this.setState({ value: newValue, isEditing: true });
  };
  
  submitChange = e => {
    const { onKeyDown, unit } = this.props;
    
    this.setState({ isEditing: false }, onKeyDown(unit, e));
  };
  
  handleKey = e => {
    let newValue = e.currentTarget.value;
    const { onKeyDown, unit } = this.props;
    
    if (e.keyCode === 38 || e.keyCode === 40) {
      this.setState({ isEditing: false }, onKeyDown(unit, e));
      e.stopPropagation();
    } else if (e.keyCode === 65 && unit === 'pre') {
      if (newValue.includes('A')) return;
      
      this.setState({ isEditing: false }, onKeyDown(unit, e));
      e.stopPropagation();
    } else if (e.keyCode === 80 && unit === 'pre') {
      if (newValue.includes('P')) return;
      
      this.setState({ isEditing: false }, onKeyDown(unit, e));
      e.stopPropagation();
    }
  };
  
  render() {
    const {
      inputRef,
      onDownClick,
      onUpClick,
      onWheel,
      type,
      unit
    } = this.props;
    
    return (
      <div>
        <i
          className="icon icon-arrow-up_24"
          onClick={() => this.setState({ isEditing: false }, onUpClick)}
          onKeyUp={() => {}}
          tabIndex={-1}
          role="button"
        />
        <input
          onWheel={e => onWheel(unit, e)}
          type={type}
          minLength={2}
          maxLength={2}
          onClick={e => e.currentTarget.focus()}
          ref={inputRef}
          onChange={this.handleOnChange}
          tabIndex={0}
          value={this.state.value}
          onBlur={this.submitChange}
          onKeyUp={this.handleKey}
        />
        <i
          className="icon icon-arrow-down_24"
          onClick={() => this.setState({ isEditing: false }, onDownClick)}
          onKeyUp={() => {}}
          role="button"
          tabIndex={-1}
        />
      </div>
    );
  }
}

TimeSelector.propTypes = {
  /** @prop Ref attribute for TimeSelector input element | null */
  inputRef: PropTypes.func,
  /** @prop Choose to use military time | false */
  militaryTime: PropTypes.bool,
  /** @prop Callback function invoked when user presses down | null  */
  onDownClick: PropTypes.func,
  /** @prop Callback function invoked when user presses a key | null  */
  onKeyDown: PropTypes.func,
  /** @prop Callback function invoked when user releases a click | null  */
  onUpClick: PropTypes.func,
  /** @prop Callback function invoked when user wheels the mouse | null */
  onWheel: PropTypes.func,
  /** @prop Set the type for the Input element | 'text' */
  type: PropTypes.string,
  /** @prop Set the unit of time | '' */
  unit: PropTypes.string,
  /** @prop Set the value of the Input element | '' */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

TimeSelector.defaultProps = {
  inputRef: null,
  militaryTime: false,
  onDownClick: null,
  onKeyDown: null,
  onUpClick: null,
  onWheel: null,
  type: 'text',
  unit: '',
  value: '',
};

TimeSelector.displayName = 'TimeSelector';

export default TimeSelector;
