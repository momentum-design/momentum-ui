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

  state = {
    id: this.props.id || uniqueId('cui-select-option-'),
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

SelectOption.propTypes = {
  /** @prop SelectOption Boolean that describes active state | false */
  active: PropTypes.bool,
  /** @prop Children nodes to render inside SelectOption | null */
  children: PropTypes.node,
  /** @prop Optional HTML Class Name for ListItem | '' */
  className: PropTypes.string,
  /** @prop SelectOption ID | '' */
  id: PropTypes.string,
  /** @prop Optional prop to know if multiple SelectOptions can be active | false */
  isMulti: PropTypes.bool,
  /** @prop SelectOption label text | '' */
  label: PropTypes.string,
  /** @prop ListItem Title | '' */
  title: PropTypes.string,
  /** @prop SelectOption value | '' */
  value: PropTypes.string,
};

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

SelectOption.displayName = 'SelectOption';

export default SelectOption;