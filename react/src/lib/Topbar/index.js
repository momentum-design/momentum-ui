/** @component topbar */

import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utils/index';

class Topbar extends React.Component {
  render() {
    const {
      anchor,
      brandAnchorElement,
      children,
      className,
      color,
      fixed,
      icon,
      image,
      title,
      ...otherProps
    } = this.props;

    const topBarClass = `${prefix}-top-bar`;
    const brandClass = `${prefix}-brand`;

    const brandNodeChildren = ([
      <div className={`${brandClass}__logo`} key={`${brandClass}__logo`}>
        {
          image
            ? image
            : <i className={`icon ${icon}`} />
        }
      </div>,
      <div className={`${brandClass}__title`} key={`${brandClass}__title`}>
        {title}
      </div>
    ]);

    const getBrandAnchor = () => (
      brandAnchorElement
        ? React.cloneElement(
            brandAnchorElement,
            {
              className:
                `${brandClass}` +
                `${(brandAnchorElement.props.className && ` ${brandAnchorElement.props.className}`) || ''}`,
            },
            brandNodeChildren
          )
        : <a className={brandClass} href={anchor}>
            {brandNodeChildren}
          </a>
    );

    const brandNode = (
      <div className={`${topBarClass}__brand`}>
        {getBrandAnchor()}
      </div>
    );

    const injectChildren = React.Children.map(children, child => {
      if ((child.type.displayName === 'TopbarMobile') && (!child.props.brandNode)) {
        return React.cloneElement(child, {
          brandNode
        });
      } else {
        return child;
      }
    });

    return (
      <div
        className={
          `${topBarClass}` +
          `${fixed && ` ${topBarClass}--fixed` || ''}` +
          `${color && ` ${topBarClass}--${color}` || ''}` +
          `${className && ` ${className}` || ''}`
        }
        role='navigation'
        {...otherProps}
      >
        <div className={`${topBarClass}__container`}>
          {brandNode}
          {injectChildren}
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  /** @prop App Url/Link | null */
  anchor: PropTypes.string,
  /** @prop Custom Node to wrap | null */
  brandAnchorElement: PropTypes.element,
  /** @prop Children nodes to render inside of Topbar | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
  /** @prop Topbar header color | '' */
  color: PropTypes.string,
  /** @prop Determines if Topbar is fixed to top | false */
  fixed: PropTypes.bool,
  /** @prop Icon class name | 'icon-cisco-logo' */
  icon: PropTypes.string,
  /** @prop Image node | null */
  image: PropTypes.node,
  /** @prop Topbar title text | '' */
  title: PropTypes.string,
};

Topbar.defaultProps = {
  anchor: null,
  brandAnchorElement: null,
  children: null,
  className: '',
  color: 'dark',
  fixed: false,
  icon: 'icon-cisco-logo',
  image: null,
  title: '',
};

Topbar.displayName = 'Topbar';

export default Topbar;
