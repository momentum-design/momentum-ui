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
      console.warn('[@momentum-ui/react] Spinner: Percentage will not be shown for sizes smaller than 36');
      /* eslint-enable no-console */
    }
    return (
      <div className={
        `md-spinner-progress` +
        ` md-spinner-progress__percentage-${round(percentage)}` +
        `${(size && ` md-spinner-progress--${size}`) || ''}` +
        `${(color && ` md-spinner-progress--${color}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
        }
        {...otherHTMLProps}
      >
        <div className="md-spinner-progress__circle">
          <div className="md-spinner-progress__mask md-spinner-progress__full">
            <div className="md-spinner-progress__fill"/>
          </div>
          <div className="md-spinner-progress__mask md-spinner-progress__half">
            <div className="md-spinner-progress__fill"/>
            <div className="md-spinner-progress__fill md-spinner-progress__fix"/>
          </div>
          <div className={
            `md-spinner-progress__inset-circle` +
            `${showCheck && percentage === 100 && ' md-spinner-progress__inset-circle--check' || ''}`
            }
          >
            {
              size === 36 && showPercentage && !showCheck
              && <div className="md-spinner-progress__percentage">{round(percentage)}</div>
            }
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <i className={
        `md-spinner` +
        `${(size && ` md-spinner--${size}`) || ''}` +
        `${(color && ` md-spinner--${color}`) || ''}` +
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
