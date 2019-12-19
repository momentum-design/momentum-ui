import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @category controls
 * @component OverviewTab
 * @variations momentum-ui-design
 */

class OverviewTab extends React.Component {
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
      offsetHeight = this.getDomPosition(this.refs.overview_tabs).y;
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
    const { matchUrl } = this.props;
    let className = 'md-button-group md-button-group--blue' + (this.state.isFixed ? ' grid-tabs-fixed' : '');
    return (
      <div ref="overview_tabs" className={className}>
        <NavLink
          exact
          activeClassName="active"
          className="md-button md-button--36"
          key="components-overview"
          to={`${matchUrl}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          exact
          activeClassName="active"
          className="md-button md-button--36"
          key="components-status"
          to={`${matchUrl}/status`}
        >
          Status
        </NavLink>
      </div>
    );
  }
}

OverviewTab.propTypes = {
  isMobile: PropTypes.bool,
  matchUrl: PropTypes.string.isRequired,
  container: PropTypes.object,
};

OverviewTab.defaultProps = {
  isMobile: false,
  matchUrl: '',
  container: window,
};

export default OverviewTab;
