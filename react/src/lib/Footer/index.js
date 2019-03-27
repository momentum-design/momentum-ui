/** @component footer */

import React from 'react';
import PropTypes from 'prop-types';

export default class Footer extends React.Component {

  render() {
    const { color, logo, copyright, social, className, children } = this.props;
    const footerTopSection =  children && (
      <section className='cui-footer__top'>{children}</section>
    );
    const footerBottomSection = (logo || copyright || social) && (
      <section className='cui-footer__bottom'>
        {
          (logo || copyright) &&
            <span className='cui-footer__bottom--position-left'>
              <span className='cui-footer__logo'>{logo}</span>
              {copyright}
            </span>
        }
        {
          social && <span className='cui-footer__bottom--position-right'>{social}</span>
        }
      </section>
    );

    return (
      <footer className={
        `cui-footer` +
        ` cui-footer--${color}` +
        ` ${className}`
      }>
        {footerTopSection}
        {footerBottomSection}
      </footer>
    );
  }
}

Footer.propTypes = {
  /** @prop Children nodes to render inside the Footer | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Optional color css styling | 'dark' */
  color: PropTypes.string,
  /** @prop Set the copyright within the Footer | '' */
  copyright: PropTypes.string,
  /** @prop Set the logo within the Footer | null */
  logo: PropTypes.node,
  /** @prop Node containing social media links | null */
  social: PropTypes.node
};

Footer.defaultProps = {
  children: null,
  className: '',
  color: 'dark',
  copyright: '',
  logo: null,
  social: null
};

Footer.displayName = 'Footer';
