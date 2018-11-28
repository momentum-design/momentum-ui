import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category containers
 * @component modal
 * @variations collab-ui-react
 */

const ModalFooter = props => {
  const { className, children } = props;
  return (
    <div className={
      'cui-modal__footer' +
      `${(className && ` ${className}`) || ''}`
      }
    >
      {children}
    </div>
  );
};

ModalFooter.propTypes = {
  /** @prop Children nodes to render inside of ModalFooter | null */
  children: PropTypes.node,
  /** @prop Optional css class names | '' */
  className: PropTypes.string,
};

ModalFooter.defaultProps = {
  children: null,
  className: '',
};

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;

/**
* @name Modal Footer
*
* @category containers
* @component modal
* @section Modal Footer
*
* @js

import {
  Button,
  ModalFooter,
} from '@collab-ui/react';

export default function ModalFooter() {
  return (
    <div className='row'>
      <br />
      <ModalFooter>
        <Button
          children='Cancel'
          onClick={()=>{}}
          ariaLabel='Close Modal'
          color='default'
        />
        <Button
          children='OK'
          onClick={()=>{}}
          ariaLabel='Submit Form'
          color='primary'
        />
      </ModalFooter>
    </div>
  );
}

**/
