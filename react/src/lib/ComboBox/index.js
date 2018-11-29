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

class ComboBox extends React.Component {
  static displayName = 'ComboBox';

  state = {
    filteredOptions: [],
    focus: -1,
    id: this.props.id || uniqueId('cui-combo-box-'),
    isOpen: false,
    value: '',
  };

  componentDidMount() {
    const { children } = this.props;

    this.options =
      (children && React.Children.toArray(children))
      || this.mapOptionsToListItem();

    this.setFilteredOptions();
  }

  componentDidUpdate(prevProps) {
    const { options, children } = this.props;
    const { value } = this.state;

    if (
      (prevProps.options !== options)
      || (prevProps.children !== children)
    ) {

      this.options =
        (children && React.Children.toArray(children))
        || this.mapOptionsToListItem();

      this.setFilteredOptions(value);
    }
  }

  mapOptionsToListItem = () => {
    const { options } = this.props;

    return options.map((option, i) =>
      <ListItem key={i} label={option} />
    );
  }

  setFilteredOptions = filter => {
    const { onChange } =  this.props;

    const filteredOptions = !onChange
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

  applyFilter = value => {
    const { searchProp } = this.props;
    const isSubString = string => value && string.toLowerCase().includes(value.toLowerCase());

    return this.options.filter(option =>
      (option.props[searchProp] && isSubString(option.props[searchProp]))
        || ['ListItemHeader'].includes(option.type.displayName)
    );
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { focus } = this.state;

    this.setFilteredOptions(e.target.value);
    this.setState({
      value: e.target.value,
      focus: !onChange ? -1 : focus,
    }, () => onChange && onChange(e, e.target.value));
  };

  handleClick = (e, selectedOption) => {
    const { searchProp } = this.props;
    const { onSelect } = this.props;

    this.setFilteredOptions(selectedOption.props[searchProp]);
    this.setState({
      value: selectedOption.props[searchProp],
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
      inputProps,
      placeholder,
      theme,
      ...props
    } = this.props;

    const otherProps = omit({...props}, [
      'children',
      'id',
      'onChange',
      'onSelect',
      'options',
      'searchProp',
    ]);

    const {
      filteredOptions,
      focus,
      id,
      isOpen,
      value,
    } = this.state;

    const activeDescendant = this.activeChild && this.activeChild.id;
    const InputComp = hasSearchIcon ? SearchInput : Input;

    const input = (
      <InputComp
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
        {...activeDescendant && { 'aria-activedescendant': activeDescendant }}
        {...inputProps}
      />
    );

    const renderFilteredOption = filteredOptions
      && filteredOptions.map((option, i) =>
        React.cloneElement(option, {
          active: i === focus,
          key: i,
          onClick: e => this.handleClick(e, option),
          refName: 'option',
          role: 'option',
          ...focus === i && { ref: ref => this.activeChild = ref },
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
          {...this.anchorNode &&
            {
              style: {
                width: this.anchorNode.getBoundingClientRect().width
              }
            }
          }
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
  /** @prop Children nodes to render inside ComboBox | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the initial input element as empty | false */
  clear: PropTypes.bool,
  /** @prop Sets the attribute disabled to the ComboBox | false */
  disabled: PropTypes.bool,
  /** @prop Sets the ComboBox to have a search icon | true */
  hasSearchIcon: PropTypes.bool,
  /** @prop Sets the ID of the ComboBox */
  id: PropTypes.string,
  /** @prop Collection of props unique for Input element | null */
  inputProps: PropTypes.shape({}),
  /** @prop Handler invoked when the user presses any key | null */
  onChange: PropTypes.func,
  /** @prop Handler invoked when the user selects the ComboBox | null  */
  onSelect: PropTypes.func,
  /** @prop Array of options for the ComboBox dropdown | [] */
  options: PropTypes.arrayOf(PropTypes.string),
  /** @prop Text that initially populates the input field for guidence | ''  */
  placeholder: PropTypes.string,
  /** @prop Sets the search prop | 'label' */
  searchProp: PropTypes.string,
  /** @prop Sets the target offset | { horizontal: 0, vertical: 4 } */
  targetOffset: PropTypes.shape({
    horizontal: PropTypes.number,
    vertical: PropTypes.number,
  }),
  /** @prop Sets the color theme of the ComboBox | '' */
  theme: PropTypes.string,
};

ComboBox.defaultProps = {
  children: null,
  className: '',
  clear: false,
  disabled: false,
  hasSearchIcon: true,
  id: null,
  inputProps: null,
  onChange: null,
  onSelect: null,
  options: [],
  placeholder: '',
  searchProp: 'label',
  targetOffset: {
    horizontal: 0,
    vertical: 4,
  },
  theme: '',
};

export default ComboBox;

/**
* @component combo-box
* @section default
* @react
import { ComboBox } from '@collab-ui/react';

 export default class DefaultComboBox extends React.PureComponent {
  render() {
    return (
      <ComboBox options={['a', 'ab', 'abc']} />
    );
  }
}

**/

/**
* @component combo-box
* @section clear
* @react
import { ComboBox } from '@collab-ui/react';

 export default class DefaultComboBox extends React.PureComponent {
  render() {
    return (
      <ComboBox
        options={['a', 'ab', 'abc']}
        clear
      />
    );
  }
}

**/


