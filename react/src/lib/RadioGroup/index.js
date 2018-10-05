import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category controls
 * @component radio
 * @variations collab-ui-react
 */

class RadioGroup extends React.Component {

  state = {
    values: [],
  };

  componentWillMount() {
    if (this.props.values) {
      this.setState({ values: this.props.values });
    }
  }

  handleToggle = value => {
    let newValues;
    const { onChange } = this.props;
    const { values } = this.state;
    const isActive = values.includes(value);

    if (!isActive) {
      newValues = [value];
      onChange(value);
    } else {
      return;
    }

    this.setState({
      values: newValues,
    });
  }

  render() {
    const { children, name } = this.props;
    const { values } = this.state;

    const addHandlersToChildren = () => {
      return React.Children.map(children, child => {
        const { value } = child.props;
        return React.cloneElement(child, {
          name: name,
          checked: values.includes(value),
          onChange: () => this.handleToggle(value),
        });
      });
    };

    return <div className={`cui-radio-group`}>{addHandlersToChildren()}</div>;
  }
}

RadioGroup.propTypes = {
  /** @prop Children nodes to render inside RadioGroup | null */
  children: PropTypes.node,
  /** @prop An HTML `<input>` name for each child button | '' */
  name: PropTypes.string,
  /** 
   * @prop Callback function called with value or array of values when invoked by user making a change with the RadioGroup | () => {}
   * @controllable values
  */
  onChange: PropTypes.func,
  /**
   * @prop Array of values, of the active (pressed) buttons | []
   * @controllable onChange
  */
  values: PropTypes.array,
};

RadioGroup.defaultProps = {
  children: null,
  name: '',
  onChange: () => {},
  values: [],
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
