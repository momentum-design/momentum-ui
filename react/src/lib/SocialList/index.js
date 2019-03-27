/** @component social-list */

import React from 'react';
import PropTypes from 'prop-types';

class SocialList extends React.Component {

  render() {
    const { children } = this.props;

    return <span className='cui-social__list'>{children}</span>;
  }
}

SocialList.propTypes = {
  /** @prop Children nodes to render inside SocialList | null */
  children: PropTypes.node
};

SocialList.defaultProps = {
  children: null
};

SocialList.displayName = 'SocialList';

export default SocialList;
