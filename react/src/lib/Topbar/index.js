/** @component topbar */

import React from 'react';
import PropTypes from 'prop-types';

class Topbar extends React.Component {
  static displayName = 'Topbar';

  state = {
    isMobileOpen: false,
    activeIndex: null,
    focus: 0,
  };

  getChildContext = () => {
    return {
      activeIndex: this.state.activeIndex,
      onActivate: index => this.setSelected(index),
      onFocus: index => this.setState(() => ({ focus: index })),
      focus: this.state.focus,
    };
  };

  setSelected = index => {
    if (index === this.state.activeIndex) return;
    this.setState(() => ({ activeIndex: index }));
  };

  render() {
    const {
      anchor,
      brandAnchorElement,
      color,
      className,
      fixed,
      icon,
      image,
      title
    } = this.props;

    const mdTopBarClass = 'md-top-bar';
    const mdBrandClass = 'md-brand';

    const brandNodeChildren = ([
      <div className={`${mdBrandClass}__logo`} key={`${mdBrandClass}__logo`}>
        {
          image
            ? image
            : <i className={`icon ${icon}`} />
        }
      </div>,
      <div className={`${mdBrandClass}__title`} key={`${mdBrandClass}__title`}>
        {title}
      </div>
    ]);

    const getBrandAnchor = () => (
      brandAnchorElement
        ? React.cloneElement(
            brandAnchorElement,
            {
              className: `${mdBrandClass}` +
                `${(brandAnchorElement.props.className && ` ${brandAnchorElement.props.className}`) || ''}`,
            },
            brandNodeChildren
          )
        : <a className={mdBrandClass} href={anchor}>
            {brandNodeChildren}
          </a>
    );

    const brandNode = (
      <div className={`${mdTopBarClass}__brand`}>
        {getBrandAnchor()}
      </div>
    );

    const injectChildren = React.Children.map(this.props.children, child => {
      if (!child) return;
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
        className={`${mdTopBarClass}` +
        `${(fixed && ` ${mdTopBarClass}--fixed`) || ''}` +
        `${(className && ` ${className}`) || ''}` +
        ` ${mdTopBarClass}--${color}`
        }
        role="navigation"
        ref={ref => {
          this.parentContainer = ref;
        }}>
        <div className={`${mdTopBarClass}__container row`}>
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
  /** @prop Image source URL | null */
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

Topbar.childContextTypes = {
  focus: PropTypes.number,
  activeIndex: PropTypes.number,
  onActivate: PropTypes.func,
  onFocus: PropTypes.func,
};

Topbar.displayName = 'Topbar';

export default Topbar;
