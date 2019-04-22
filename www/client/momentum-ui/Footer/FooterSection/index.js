import React from 'react';
import PropTypes from 'prop-types';

const FooterSection = props => {
  const {
    children,
    color,
    isBottom
  } = props;

  return (
    <div
      className={
        'docs-footer' +
        `${(isBottom && ' docs-footer__bottom') || ' docs-footer__main'}` +
        `${(color === 'white' && ' docs-footer--white') || ''}`
      }
    >
      {children}
    </div>
  );
};

FooterSection.propTypes = {
  /** @prop Children nodes to render inside the Footer | null */
  children: PropTypes.node,
  /** @prop Designates the bottom footer */
  isBottom: PropTypes.bool,
  /** @prop Chooses the white color theme*/
  color: PropTypes.string,
};

FooterSection.defaultProps = {
  children: null,
  isBottom: false,
  color: null,
};

FooterSection.displayName = 'FooterSection';

export default FooterSection;
