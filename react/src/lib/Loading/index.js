import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category communication
 * @component loading-spinner
 * @variations collab-ui-react
 */

const Loading = props => {
  const {
    small,
  } = props;

  return (
    <div className={`cui-loading ${small ? 'cui-loading--small' : ''}`}>
      <span className='cui-loading__icon'/>
      <span className='cui-loading__icon'/>
      <span className='cui-loading__icon'/>
    </div>
  );
};

Loading.propTypes = {
  /** @prop Prop to make the Loading animation small | false */
  small: PropTypes.bool,
};

Loading.defaultProps = {
  small: false,
};

Loading.displayName = 'Loading';

export default Loading;

/**
* @name Default Loading
* @description Loadings are useful.
*
* @category communication
* @component loader-spinner
* @section default
*
* @js
import { Loading } from '@collab-ui/react';

export default function LoaderSpinnerDefault() {
  return (
    <div className="row">
      <div className="docs-example docs-example--spacing" style={{fontSize: '1rem', display: 'flex'}}>
        <Loading />
      </div>
      <div className="docs-example docs-example--spacing" style={{fontSize: '2rem', display: 'flex'}}>
        <Loading />
      </div>
      <div className="docs-example docs-example--spacing" style={{fontSize: '3rem', display: 'flex'}}>
        <Loading />
      </div>
    </div>
  );
}

**/
