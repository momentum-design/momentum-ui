import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@momentum-ui/react';
import './collapse.scss';

const Collapse = props => {
  const { children, collapsedHeight, collapseLabel, expandLabel } = props;
  const [isCollapsed, toggleCollapse] = React.useState(true);
  const stateClass = isCollapsed ? `md-collapse--collapsed` : `md-collapse--expanded`;
  const styles = (collapsedHeight && isCollapsed) ? { height: collapsedHeight } : {};

  return (
    <>
      <div className="md-collapse__button">
        <Button 
          ariaLabel={isCollapsed ? expandLabel : collapseLabel}
          onClick={() => toggleCollapse(!isCollapsed)}>{isCollapsed ? expandLabel : collapseLabel}
        </Button>
      </div>
      <div className={`md-collapse__container ${stateClass}`} style={styles}>
        {children}
      </div>
    </>
  );
};

Collapse.propTypes = {
  /** @prop Children nodes to render inside Collapse | null */
  children: PropTypes.node,

  /** @prop height of collapsed container | Expand */
  collapsedHeight: PropTypes.number,

  /** @prop label on button to collapse | Collapse */
  collapseLabel: PropTypes.string,

  /** @prop button on label to expand | Expand */
  expandLabel: PropTypes.string,
};

Collapse.defaultProps = {
  children: null,
  collapseLabel: 'Collapse',
  expandLabel: 'Expand',
};

Collapse.displayName = 'Collapse';

export default Collapse;
