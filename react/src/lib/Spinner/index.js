import React from 'react';
import PropTypes from 'prop-types';
import { isNumber, round } from 'lodash';

/**
 * @category communication
 * @component loader-spinner
 * @variations collab-ui-react
 */

const Spinner = props => {
  const {
    className,
    color,
    showCheck,
    percentage,
    showPercentage,
    size,
    ...otherHTMLProps
  } = props;

  if(isNumber(percentage)) {
    if (size !== 36 && showPercentage) {
      /* eslint-disable no-console */
      console.warn('[@collab-ui/react] Spinner: Percentage will not be shown for sizes smaller than 36');
      /* eslint-enable no-console */
    }
    return (
      <div className={
        `cui-spinner-progress` +
        ` cui-spinner-progress__percentage-${round(percentage)}` +
        `${(size && ` cui-spinner-progress--${size}`) || ''}` +
        `${(color && ` cui-spinner-progress--${color}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
        }
        {...otherHTMLProps}
      >
        <div className="cui-spinner-progress__circle">
          <div className="cui-spinner-progress__mask cui-spinner-progress__full">
            <div className="cui-spinner-progress__fill"/>
          </div>
          <div className="cui-spinner-progress__mask cui-spinner-progress__half">
            <div className="cui-spinner-progress__fill"/>
            <div className="cui-spinner-progress__fill cui-spinner-progress__fix"/>
          </div>
          <div className={`cui-spinner-progress__inset-circle` +
          `${showCheck && percentage === 100 ? ' cui-spinner-progress__inset-circle--check' : ''}`}
          >
            {(size === 36 && showPercentage && !showCheck) && <div className="cui-spinner-progress__percentage">{round(percentage)}</div>}
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <i className={
        `cui-spinner` +
        `${(size && ` cui-spinner--${size}`) || ''}` +
        `${(color && ` cui-spinner--${color}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
        }

        {...otherHTMLProps}
      />
    );
  }
};

Spinner.propTypes = {
  /**
   * css class names
   */
  className: PropTypes.string,
/**
 * show the check mark if percentage 100
 */
  showCheck: PropTypes.bool,
  /**
   * color
   */
  color: PropTypes.string,
  /**
   * percentage value to show on progress
   */
  percentage: PropTypes.number,
  /**
   * show the number value for progress
   */
  showPercentage: PropTypes.bool,
  /**
   * size
   */
  size: PropTypes.oneOf([16, 20, 28, 36]),
};

Spinner.defaultProps = {
  className: '',
  color: 'black',
  percentage: null,
  showPercentage: false,
  size: 36,
};

Spinner.displayName = 'Spinner';

export default Spinner;

/**
* @name Spinner
* @description Different states of spinners.
*
* @category communication
* @component loader-spinner
* @section states
*
* @js

import {Spinner} from '@collab-ui/react';

export default function Default() {
  return (
    <div>

      <div className="docs-example docs-example--spacing">
        <h3>Size Prop</h3>
        <h3><code className="small">size=(16)</code></h3>
        <Spinner size={16}/>
        <h3><code className="small">size=(20)</code></h3>
        <Spinner size={20}/>
        <h3><code className="small">size=(28)</code></h3>
        <Spinner size={28}/>
        <h3><code className="small">Default size=(36)</code></h3>
        <Spinner />
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>Color Prop</h3>
        <h3><code className="small">color:blue</code></h3>
        <Spinner color='blue'/>
      </div>

      <div className="docs-example docs-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner</code></h3>
        <Spinner />
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>Percentage Prop</h3>
        <h3><code className="small">percentage:65</code></h3>
        <Spinner percentage={65}/>
      </div>

    </div>
  );
}

**/

