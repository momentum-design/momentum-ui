import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category controls
 * @component radio
 * @variations collab-ui-react
 */

export default class RadioGroup extends React.Component {
  static displayName = 'RadioGroup';

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
  /**
   * optional children prop type
   */
  children: PropTypes.node,
  /**
   * Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   *
   * @controllable values
   */
  onChange: PropTypes.func,
  /**
   * An array of values, of the active (pressed) buttons
   *
   * @controllable onChange
   */
  values: PropTypes.array,
  /**
   * An HTML `<input>` name for each child button.
   *
   */
  name: PropTypes.string,
};

RadioGroup.defaultProps = {
  values: [],
  onChange: () => {},
  name: '',
};
