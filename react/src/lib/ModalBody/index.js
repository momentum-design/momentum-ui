import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category containers
 * @component modal
 * @variations collab-ui-react
 */

const ModalBody = props => {
  const {
    className,
    ...other // all other standard html properties
  } = props;

  return (
    <div className={
      `cui-modal__body` +
      `${(className && ` ${className}`) || ''}`
      }
      {...other}
    >
      {props.children}
    </div>
  );
};

ModalBody.propTypes = {
  /** @prop Children nodes to render inside the ModalBody | null */
  children: PropTypes.node,
  /** @prop Optional css class names | '' */
  className: PropTypes.string,
};

ModalBody.defaultProps = {
  children: null,
  className: '',
};

ModalBody.displayName = 'ModalBody';

export default ModalBody;

/**
* @name Modal Body
*
* @category containers
* @component modal
* @section Modal Body
*
* @js

import {
  Input,
  ModalBody
} from '@collab-ui/react';

export default function Default() {
    return (
      <div className='row'>
        <br />
        <ModalBody>
          <Input
            htmlId='testMe2'
            value='testMe2'
            name='testMe2'
            label='First Input'
            disabled
            placeholder='Disabled Input'
            onChange={() => {}}
            inputHelpText='Field Must be Disabled'
            errorArr={[]}
          />
        </ModalBody>
      </div>
    );
  }

**/
