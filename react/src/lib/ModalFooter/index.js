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

ModalFooter.defaultProps = {
  children: null,
  className: '',
};

ModalFooter.propTypes = {
  /**
   * Children components
   */
  children: PropTypes.node,
  /**
   * S classnames
   */
  className: PropTypes.string,
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
  ModalFooter
} from '@collab-ui/react';

export default function Default() {
  return (
    <div className='row'>
      <br />
      <ModalFooter>
        <Button
          label='Cancel'
          onClick={()=>{}}
          ariaLabel='Close Modal'
          color='default'
        />
        <Button
          label='OK'
          onClick={()=>{}}
          ariaLabel='Submit Form'
          color='primary'
        />
      </ModalFooter>
    </div>
  );
}

**/
