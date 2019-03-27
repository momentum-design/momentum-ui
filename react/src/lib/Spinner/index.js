/** @component loader-spinner */

import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import round from 'lodash/round';

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
          <div className={
            `cui-spinner-progress__inset-circle` +
            `${showCheck && percentage === 100 && ' cui-spinner-progress__inset-circle--check' || ''}`
            }
          >
            {
              size === 36 && showPercentage && !showCheck
              && <div className="cui-spinner-progress__percentage">{round(percentage)}</div>
            }
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
  /** @prop Optional CSS class names | '' */
  className: PropTypes.string,
  /** @prop Set Spinner color | '' */
  color: PropTypes.string,
  /** @prop Show percentage value for progress on Spinner | null */
  percentage: PropTypes.number,
  /** @prop Show the check mark if percentage 100 | false */
  showCheck: PropTypes.bool,
  /** @prop Show the number value for progress on Spinner | false */
  showPercentage: PropTypes.bool,
  /** @prop Spinner size | 36 */
  size: PropTypes.oneOf([16, 20, 28, 36]),
};

Spinner.defaultProps = {
  className: '',
  color: 'black',
  percentage: null,
  showCheck: false,
  showPercentage: false,
  size: 36,
};

Spinner.displayName = 'Spinner';

export default Spinner;
