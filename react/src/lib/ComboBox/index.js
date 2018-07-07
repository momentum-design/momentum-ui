/**
 * @category controls
 * @component ComboBox
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  EventOverlay,
  Input,
  ListItem,
  SearchInput,
} from '@collab-ui/react';
import { omit, uniqueId } from 'lodash';

class ComboBox extends React.PureComponent {
  static displayName = 'ComboBox';

  state = {
    activeChild: null,
    filteredOptions: [],
    focus: -1,
    id: this.props.id || uniqueId('cui-combo-box-'),
    isOpen: false,
    value: '',
  };

  componentDidMount () {
    const { children } = this.props;

    this.options =
      (children && React.Children.toArray(children))
      || this.mapOptionsToListItem();

    this.setFilteredOptions();
  }

  componentDidUpdate (prevProps) {
    const { options, children } = this.props;

    if (
      (prevProps.options !== options)
      || (prevProps.children !== children)
    ) {

      this.options =
        (children && React.Children.toArray(children))
        || this.mapOptionsToListItem();

      this.setFilteredOptions();
    }

  }

  mapOptionsToListItem () {
    const { options } = this.props;
    return (
      options.map((option, i) => {
        return <ListItem key={i} label={option} />;
      })
    );
  }

  setFilteredOptions (filter = this.state.value) {
    const { onChange } =  this.props;
    const enableSearch = !onChange;
    const filteredOptions = enableSearch
      ? this.applyFilter(filter)
      : this.options;

    this.setState({
      isOpen: !!filteredOptions.length,
      filteredOptions,
    });
  }

  hidePopover = () => {
    this.setState({
      isOpen: false
    });
  };

  handleToggle = () => {
    const { filteredOptions } = this.state;

    filteredOptions.length
    && this.setState({ isOpen: true });
  };

  applyFilter = (value) => {
    const isSubString = string => value && string.toLowerCase().includes(value.toLowerCase());
    return (
      this.options.filter(option => {
        return isSubString(option.props.label);
      })
    );
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { focus } = this.state;
    const enableSearch = !onChange;

    this.setFilteredOptions(e.target.value);
    this.setState({
      value: e.target.value,
      focus: enableSearch ? -1 : focus,
    }, () => onChange && onChange(e, e.target.value));
  };

  handleClick = (e, selectedOption) => {
    const { onSelect } = this.props;
    this.setFilteredOptions(selectedOption.props.label);

    this.setState({
      value: selectedOption.props.label,
      isOpen: false,
      focus: -1,
    }, () => onSelect && onSelect(e, selectedOption));

  };

  setFocus = index => {
    this.setState({ focus: index });
  };

  handleKeyDown = e => {
    let flag = false;
    let newIndex;
    const { filteredOptions, focus, isOpen } = this.state;
    const length = filteredOptions && filteredOptions.length - 1;

    const getNewIndex = (currentIndex, change) => {
      const getPossibleIndex = () => {
        if (currentIndex + change < 0) {
          return length;
        } else if (currentIndex + change > length) {
          return 0;
        }

        return currentIndex + change;
      };

      const possibleIndex = getPossibleIndex();
      const potentialTarget = React.Children.toArray(filteredOptions)[possibleIndex];

      return (potentialTarget.props.disabled || potentialTarget.props.isReadOnly)
        ? getNewIndex(possibleIndex, change)
        : possibleIndex;
    };

    switch (e.which) {

      case 13:
        isOpen
        && (focus !== -1)
        && this.handleClick(e, filteredOptions[focus]);
        flag = true;
        break;

      case 38:
        if(isOpen) {
          newIndex = getNewIndex(focus, -1);
          this.setFocus(newIndex);
        }
        flag = true;
        break;

      case 40:
        if(isOpen) {
          newIndex = getNewIndex(focus, 1);
          this.setFocus(newIndex);
        }
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
      className,
      clear,
      disabled,
      hasSearchIcon,
      placeholder,
      theme,
      ...props
    } = this.props;

    const otherProps = omit({...props}, ['children', 'id', 'onChange', 'onSelect', 'options']);

    const {
      activeChild,
      filteredOptions,
      focus,
      id,
      isOpen,
      value,
    } = this.state;

    const activedescendant = activeChild && activeChild.option && activeChild.option.id;
    const InputComp = hasSearchIcon ? SearchInput : Input;

    const input = (
      <InputComp
        aria-activedescendant={activedescendant}
        aria-autocomplete='list'
        clear={clear}
        disabled={disabled}
        inputRef={ref => this.anchorNode = ref}
        onChange={this.handleChange}
        onClick={this.handleToggle}
        onKeyDown={this.handleKeyDown}
        placeholder={placeholder}
        theme={theme}
        value={value}
      />
    );

    const renderFilteredOption =
      filteredOptions
      && filteredOptions
      .map((option, i) =>
        React.cloneElement(option, {
          active: i === focus,
          key: i,
          onClick: e => this.handleClick(e, option),
          ref: (
            i === focus
            && (ref => this.setState({ activeChild: ref }))
          ),
          refName: 'option',
          role: 'option'
        })
      );

    const dropdownElement = (
      this.anchorNode &&
      <EventOverlay
        allowClickAway
        anchorNode={this.anchorNode}
        close={this.hidePopover}
        isOpen={isOpen}
        {...otherProps}
      >
        <div
          className='cui-combo-box__options'
          id={id}
          role='listbox'
          style={this.anchorNode ? {width: this.anchorNode.getBoundingClientRect().width} : {}}
        >
          {renderFilteredOption}
        </div>
      </EventOverlay>
    );

    return (
      <div
        aria-controls={id}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        className={
          'cui-combo-box' +
          `${(className && ` ${className}`) || ''}`
        }
        role='combobox'
      >
        {input}
        {dropdownElement}
      </div>
    );
  }
}

ComboBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  clear: PropTypes.bool,
  disabled: PropTypes.bool,
  hasSearchIcon: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  targetOffset: PropTypes.shape({
    horizontal: PropTypes.number,
    vertical: PropTypes.number,
  }),
  theme: PropTypes.string,
};

ComboBox.defaultProps = {
  children: null,
  className: '',
  clear: false,
  disabled: false,
  hasSearchIcon: true,
  id: null,
  onChange: null,
  onSelect: null,
  options: [],
  placeholder: '',
  targetOffset: {
    horizontal: 0,
    vertical: 4,
  },
  theme: '',
};

export default ComboBox;

/**
* @name Default ComboBox
*
* @category controls
* @component combo-box
* @section default
*
* @js

 export default class DefaultComboBox extends React.PureComponent {
  render() {
    return (
      <ComboBox options={['a', 'ab', 'abc']} />
    );
  }
}

**/

/**
* @name Dark State
*
* @category controls
* @component combo-box
* @section dark-state
*
* @js

export default class DarkComboBox extends React.PureComponent {
  render() {
    return (
      <div className="row large" style={{ paddingTop: '1rem', backgroundColor: 'black' }}>
        <ComboBox theme="dark" options={['a', 'ab', 'abc']} />
      </div>
    );
  }
}

**/

/**
* @name ComboBox with options as Nodes
*
* @category controls
* @component combo-box
* @section combo-box-nodes
*
* @js

import { ListItem } from '@collab-ui/react';

export default class ComboBoxNodes extends React.PureComponent {
  render() {
    return (
      <div className="row">
        <ComboBox>
          <ListItem label="a">
            <i>a</i>
          </ListItem>
          <ListItem label="ab">
            <i>ab</i>
          </ListItem>
          <ListItem disabled label="abc" >
            <i>abc</i>
          </ListItem>
        </ComboBox>
      </div>
    );
  }
}

**/
