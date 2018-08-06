import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import {
  Checkbox,
  Icon,
  ListItem,
  ListItemSection,
} from '@collab-ui/react';

/**
 * @category containers
 * @component select-option
 * @variations collab-ui-react
 */

class SelectOption extends React.Component {
  static displayName = 'SelectOption';

  state = {
    id: uniqueId(this.props.id && `${this.props.id}-` || 'cui-select-option-'),
  }

  render() {
    const {
      className,
      isMulti,
      active,
      children,
      label,
      title,
      ...props
    } = this.props;

    const {
      id
    } = this.state;

    const separateChildren =
      isMulti
      ? (
        <Checkbox
          htmlId={`${id}__checkbox`}
          label={label}
          checked={active}
          onChange={() => {}}
        />
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
         className={`${(className && ` ${className}`) || ''}`}
         id={id}
         label={label}
         title={title || label}
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
  label: '',
  title: '',
  value:'',
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
  label: PropTypes.string,
  /** ListItem Title */
  title: PropTypes.string,
  /** Value  */
  value: PropTypes.string,
};

export default SelectOption;