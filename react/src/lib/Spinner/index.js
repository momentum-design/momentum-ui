import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

/**
 * @category communication
 * @component loader-spinner
 * @variations collab-ui-react
 */

const Spinner = props => {
  const { size, color, className, percentage, showPercentage, ...otherHTMLProps } = props;

  if(_.isNumber(percentage)) {
    if (size !== 36 && showPercentage) {
      /* eslint-disable no-console */
      console.warn('Percentage will not be shown for sizes smaller than 36');
    }
    return (
      <div className={
        `cui-spinner-progress` +
        `${(size && ` cui-spinner-progress--${size}`) || ''}` +
        `${(color && ` cui-spinner-progress--${color}`) || ''}` +
        `${(className && ` ${className}`) || ''}` +
        ` cui-spinner-progress__percentage-${_.round(percentage)}`
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
          <div className="cui-spinner-progress__inset-circle">
            {(size === 36 && showPercentage) && <div className="cui-spinner-progress__percentage">{_.round(percentage)}</div>}
          </div>
        </div>
      </div>
    );
  } else {
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
   * size
   */
  size: PropTypes.oneOf([16, 20, 28, 36]),
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
};

Spinner.defaultProps = {
  size: 36,
  color: 'black',
  className: '',
  percentage: null,
  showPercentage: false,
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
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner</code></h3>
        <Spinner />
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner size:20</code></h3>
        <Spinner size={20}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner size:28</code></h3>
        <Spinner size={28}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner size:36</code></h3>
        <Spinner size={36}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner color:blue</code></h3>
        <Spinner color='blue'/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner color:blue size:20</code></h3>
        <Spinner size={20} color='blue'/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner color:blue size:28</code></h3>
        <Spinner size={28} color='blue'/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner color:blue size:36</code></h3>
        <Spinner size={36} color='blue'/>
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner</code></h3>
        <Spinner />
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner size:20</code></h3>
        <Spinner size={20}/>
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner size:28</code></h3>
        <Spinner size={28}/>
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner size:36</code></h3>
        <Spinner size={36}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner with progress size:16</code></h3>
        <Spinner size={16} percentage={65}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner with progress size:20</code></h3>
        <Spinner size={20} percentage={65}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner with progress size:28</code></h3>
        <Spinner size={28} percentage={65}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner with progress size:36</code></h3>
        <Spinner size={36} percentage={65}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Default <code className="small">Spinner with progress without percentage size:36</code></h3>
        <Spinner size={36} percentage={65} showPercentage={false}/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner with progress color:blue size:16</code></h3>
        <Spinner size={16} percentage={65} color='blue'/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner with progress color:blue size:20</code></h3>
        <Spinner size={20} percentage={65} color='blue'/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner with progress color:blue size:28</code></h3>
        <Spinner size={28} percentage={65} color='blue'/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner with progress color:blue size:36</code></h3>
        <Spinner size={36} percentage={65} color='blue'/>
      </div>
      <div className="docui-example docui-example--spacing">
        <h3>Blue <code className="small">Spinner with progress without percentage color:blue size:36</code></h3>
        <Spinner size={36} percentage={65} color='blue' showPercentage={false}/>
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner with progress size:16</code></h3>
        <Spinner size={16} percentage={65}/>
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner with progress size:20</code></h3>
        <Spinner size={20} percentage={65}/>
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner with progress size:28</code></h3>
        <Spinner size={28} percentage={65}/>
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner with progress size:36</code></h3>
        <Spinner size={36} percentage={65}/>
      </div>
      <div className="docui-example docui-example--spacing cui--dark docs-example--dark">
        <h3>Dark <code className="small">Spinner with progress without percentage size:36</code></h3>
        <Spinner size={36} percentage={65} showPercentage={false}/>
      </div>
    </div>
  );
}

**/

