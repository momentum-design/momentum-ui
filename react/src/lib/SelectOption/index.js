import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@collab-ui/react/Icon';
import ListItem from '@collab-ui/react/ListItem';
import ListItemSection from '@collab-ui/react/ListItemSection';
import Checkbox from '@collab-ui/react/Checkbox';
import _ from 'lodash';

/**
 * @category containers
 * @component select-option
 * @variations collab-ui-react
 */

export default class SelectOption extends React.Component {
  static displayName = 'SelectOption';

  state = {
    id: _.uniqueId(this.props.id && `${this.props.id}-` || 'cui-select-option-'),
  }

  render() {
    const {
      className,
      isMulti,
      active,
      children,
      label,
      ...props
    } = this.props;
    const {
      id
    } = this.state;

    const separateChildren =
      isMulti
      ? (
        <Checkbox htmlId={`${id}__checkbox`} label={label} checked={active} onChange={() => {}}/>
      ) : (
        [
          <ListItemSection key='child-0' position='center'>
            {label || children}
          </ListItemSection>,
          <ListItemSection key='child-1' position='right'>
            {active && <Icon color='blue' name='check_20'/>}
          </ListItemSection>
        ]
      );


    return (
      <ListItem
        className={
          `${(className && ` ${className}`) || ''}`
        }
        id={id}
        {...props}
      >
        {separateChildren}
      </ListItem>
    );
  }
}

SelectOption.defaultProps = {
  active: false,
  children: null,
  className: '',
  id: '',
  isMulti: false,
  label: ''
};

SelectOption.propTypes = {
  /** SelectOption Boolean that describes active state */
  active: PropTypes.bool,
  /** SelectOption Children */
  children: PropTypes.node,
  /** HTML Class for ListItem */
  className: PropTypes.string,
  /** SelectOption id */
  id: PropTypes.string,
  /** SelectOption Boolean that modifies adds checkboxes */
  isMulti: PropTypes.bool,
  /** SelectOption string alternative to children nodes */
  label: PropTypes.string
};
