import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category controls
 * @component checkbox
 * @variations collab-ui-react
 */

class CheckboxGroup extends React.Component {
  static displayName = 'CheckboxGroup';

  state = {
    values: []
  }

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

    if (isActive) {
      newValues = values.filter(v => v !== value);
      onChange(this.props.values.filter(n => n !== value));
    } else {
      newValues = values.concat(value);
      onChange([...this.props.values, value]);
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
          'aria-checked': values.includes(value),
          onChange: () => this.handleToggle(value),
        });
      });
    };

    return <div className={`cui-checkbox-group`}>{addHandlersToChildren()}</div>;
  }
}

CheckboxGroup.propTypes = {
  /** @prop Children nodes to render inside Accordion | null */
  children: PropTypes.node,
  /** @prop Callback fired with the value or array of active values when the user presses a button | null
   * @controllable values
  */
  onChange: PropTypes.func,
  /** @prop An array of values, of the active (pressed) buttons | () => {}
   * @controllable onChange
   */
  values: PropTypes.array,
  /** @prop An HTML `<input>` name for each child button | '' */
  name: PropTypes.string,
};

CheckboxGroup.defaultProps = {
  values: [],
  onChange: () => {},
  name: '',
};

export default CheckboxGroup;