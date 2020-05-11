/** @component form */

import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.PureComponent {

  render() {
    const { name, children, ...props } = this.props;

    return (
      <form
        name={name}
        className="md-form"
        {...props}
      >
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  /** @prop Children node to render inside Form | null */
  children: PropTypes.node,
  /** @prop Form name */
  name: PropTypes.string.isRequired,

};

Form.defaultProps = {
  children: null,
};

Form.displayName = 'Form';

export default Form;
