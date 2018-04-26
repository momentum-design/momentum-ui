import React from 'react';
import PropTypes from 'prop-types';

export default class TimeSelector extends React.Component {
  static displayName = 'TimeSelector';

  static defaultProps = {
    value: '',
    onUpClick: null,
    onDownClick: null,
    onKeyDown: null,
    inputRef: null,
    type: 'text',
    unit: '',
    onWheel: null,
    miltaryTime: false
  };

  static propTypes = {
    onWheel: PropTypes.func,
    unit: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onUpClick: PropTypes.func,
    onDownClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    inputRef: PropTypes.func,
    type: PropTypes.string,
    militaryTime: PropTypes.bool
  };

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
      onUpClick,
      onDownClick,
      inputRef,
      type,
      unit,
      onWheel
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
