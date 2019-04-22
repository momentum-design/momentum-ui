/** @component loading-spinner */

import React from 'react';
import PropTypes from 'prop-types';

const Loading = props => {
  const {
    small,
  } = props;

  return (
    <div className={`md-loading ${small ? 'md-loading--small' : ''}`}>
      <span className='md-loading__icon'/>
      <span className='md-loading__icon'/>
      <span className='md-loading__icon'/>
    </div>
  );
};

Loading.propTypes = {
  /** @prop Prop to make the Loading animation small | false */
  small: PropTypes.bool,
};

Loading.defaultProps = {
  small: false,
};

Loading.displayName = 'Loading';

export default Loading;
