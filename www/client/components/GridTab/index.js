import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @category controls
 * @component GridTab
 * @variations momentum-ui-design
 */

class GridTab extends React.Component {
  state = {
    isFixed: false,
    checkTime: 0,
    fixedTop: 64,
    fixedScrollTop: 64,
  };

  componentDidMount() {
    let { container, isMobile } = this.props;
    if (!isMobile ) {
      this.onScrollProxy = e => {
        this.handleScroll(e);
      };
      container.addEventListener('scroll', this.onScrollProxy);
    }
  }

  componentWillUnmount() {
    if (this.onScrollProxy) {
      this.props.container.removeEventListener('scroll', this.onScrollProxy);
    }
  }

  checkDom = () => {
    let { isFixed, checkTime, fixedTop } = this.state,
      offsetHeight = this.getDomPosition(this.refs.grid_tabs).y;
    if (checkTime < 2 && !isFixed) {
      this.setState({
        checkTime: checkTime + 1,
        fixedScrollTop: offsetHeight - fixedTop,
      });
    }
  };

  getDomPosition = pObj => {
    let _left = pObj.offsetLeft || 0,
      _top = pObj.offsetTop || 0;
    while ((pObj = pObj.offsetParent)) {
      _left += eval(pObj.offsetLeft);
      _top += pObj.offsetTop;
    }
    return { x: _left, y: _top };
  };

  handleScroll = () => {
    this.checkDom();
    let { container } = this.props,
      { isFixed, fixedScrollTop } = this.state,
      scrollTop = container.pageYOffset || container.scrollTop || 0;
    if (scrollTop > fixedScrollTop) {
      if (!isFixed) {
        this.setState({ isFixed: true });
      }
    } else if (isFixed) {
      this.setState({ isFixed: false });
    }
  };

  render() {
    const { component, matchUrl, hasCodeExamples } = this.props;
    let className = 'md-button-group md-button-group--blue' + (this.state.isFixed ? ' grid-tabs-fixed' : '');
    return (
      <div ref="grid_tabs" className={className}>
        {component.name === 'icons' && (
          <NavLink
            className="md-button md-button--36"
            activeClassName="active"
            to={`${matchUrl}/library`}
            data-cy="library"
          >
            Library
          </NavLink>
        )}
        {hasCodeExamples && (
          <NavLink
            className="md-button md-button--36"
            activeClassName="active"
            to={`${matchUrl}/code`}
            data-cy="code"
          >
            Code
          </NavLink>
        )}
        {component.style && (
          <NavLink
            className="md-button md-button--36"
            activeClassName="active"
            to={`${matchUrl}/style`}
            data-cy="style"
          >
            Style
          </NavLink>
        )}
        {component.usage && (
          <NavLink
            className="md-button md-button--36"
            activeClassName="active"
            to={`${matchUrl}/usage`}
            data-cy="usage"
          >
            Usage
          </NavLink>
        )}
      </div>
    );
  }
}

GridTab.propTypes = {
  component: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  matchUrl: PropTypes.string.isRequired,
  hasCodeExamples: PropTypes.bool.isRequired,
  container: PropTypes.object,
};

GridTab.defaultProps = {
  component: {},
  isMobile: false,
  matchUrl: '',
  hasCodeExamples: false,
  container: window,
};

export default GridTab;
