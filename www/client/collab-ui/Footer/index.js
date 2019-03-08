import React from 'react';
import PropTypes from 'prop-types';

const Footer = props  => {
  const { children } = props;

  return (
    <footer className="docs-footer__wrapper">
      {children}
    </footer>
  );
};

Footer.propTypes = {
/** @prop Children nodes to render inside Footer | null */
children: PropTypes.node,
};

Footer.defaultProps = {
  children: null,
};

Footer.displayName = 'Footer';

export default Footer;



