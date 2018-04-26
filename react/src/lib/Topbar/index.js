import React from 'react';
import PropTypes from 'prop-types';
import '@collab-ui/core/scss/components/top-bar.scss';

export default class Topbar extends React.Component {
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
    const cuiTopBarClass = 'cui-top-bar';
    const cuiBrandClass = 'cui-brand';
    const { anchor, color, icon, image, title } = this.props;
    const brandNode = (
      <a className={`${cuiTopBarClass}__brand ${cuiBrandClass}`} href={anchor}>
        <div className={`${cuiBrandClass}__logo`}>
          {image ? (
            image
          ) : (
            <i className={`icon ${icon}`} />
          )}
        </div>
        <div className={`${cuiBrandClass}__title`}>{title}</div>
      </a>
    );

    const injectChildren = React.Children.map(this.props.children, child => {
      if (child.type.displayName === 'TopbarMobile') {
        return React.cloneElement(child, {
          brandNode
        });
      } else {
        return child;
      }
    });

    return (
      <div
        className={`${cuiTopBarClass}` +
        ` ${cuiTopBarClass}--fixed` +
        ` ${cuiTopBarClass}--${color}`
        }
        role="navigation"
        ref={ref => {
          this.parentContainer = ref;
        }}>
        <div className={`${cuiTopBarClass}__container row`}>
          {brandNode}
          {injectChildren}
        </div>
      </div>
    );
  }
}

Topbar.childContextTypes = {
  focus: PropTypes.number,
  activeIndex: PropTypes.number,
  onActivate: PropTypes.func,
  onFocus: PropTypes.func,
};

Topbar.propTypes = {
  /** Title Text (String or Template) */
  title: PropTypes.string,
  /** Icon Class (String or Template) */
  icon: PropTypes.string,
  /** Image Source URL (String or Template) */
  image: PropTypes.node,
  /** App Url/Link (String) */
  anchor: PropTypes.string,
  /** Header Color (String) */
  color: PropTypes.string,
  /** children prop */
  children: PropTypes.node,
  /** HTML Class for Top Bar */
  className: PropTypes.string,
};

Topbar.defaultProps = {
  className: '',
  title: '',
  icon: 'icon-cisco-logo',
  image: null,
  anchor: null,
  color: 'dark',
  children: null,
};
