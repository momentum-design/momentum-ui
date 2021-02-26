import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @category controls
 * @component GridTab
 * @variations momentum-ui-design
 */

class GridTab extends React.Component {
  render() {
    const { component, matchUrl, hasCodeExamples } = this.props;
    let className = 'md-button-group md-button-group--blue component-page-grid-tab';
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
  matchUrl: PropTypes.string.isRequired,
  hasCodeExamples: PropTypes.bool.isRequired,
};

GridTab.defaultProps = {
  component: {},
  matchUrl: '',
  hasCodeExamples: false,
};

export default GridTab;
