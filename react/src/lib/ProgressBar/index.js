import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category communication
 * @component progress-bar
 * @variations collab-ui-react
 */

const ProgressBar = props => {
  const { label, min, max, value, dynamic, displayFormat, color } = props;

  const adjustedValue = max - value < 0 ? max : value;
  const valueFraction = adjustedValue / max * 100 || 0;
  const meterWidth = valueFraction + '%';

  const getDisplayFormat = () => {
    if (displayFormat === 'none') {
      return null;
    } else if (displayFormat === 'percentage') {
      return meterWidth;
    }

    return `${adjustedValue} / ${max}`;
  };

  const getColor = () => {
    if (color) {
      return color;
    } else if (dynamic) {
      if (valueFraction < 25) {
        return 'success';
      } else if (valueFraction < 50) {
        return 'info';
      } else if (valueFraction < 75) {
        return 'warning';
      }

      return 'danger';
    }
  };

  return (
    <span>
      <div className={`progressbar-info`} key={0}>
        <span className={`progressbar-label`}>{label}</span>
        <span className={`progressbar-progress`}>{getDisplayFormat()}</span>
      </div>
      <div className={`progress` + ` ${getColor() || ''}`} key={1}>
        <span
          className={`meter`}
          role="progressbar"
          aria-labelledby="progressbar"
          aria-valuenow={adjustedValue}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={meterWidth}
          style={{
            width: meterWidth,
          }}
        />
      </div>
    </span>
  );
};

ProgressBar.propTypes = {
  /** @prop Color class optional that will overwrite dynamic | '' */
  color: PropTypes.string,
  /** @prop Format of dyanmic number | 'fraction' */
  displayFormat: PropTypes.oneOf(['none', 'fraction', 'percentage']),
  /** @prop Determines if the ProgressBar is dynamic | false */
  dynamic: PropTypes.bool,
  /** @prop Label text */
  label: PropTypes.string.isRequired,
  /** @prop Maximum number for progressBar | 100 */
  max: PropTypes.number,
  /** @prop Minimum number for progressBar | 0 */
  min: PropTypes.number,
  /** @prop Type of ProgressBar | 'determinate' */
  type: PropTypes.oneOf(['determinate', 'indeterminate']),
  /** @prop Number value */
  value: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  color: '',
  displayFormat: 'fraction',
  dynamic: false,
  max: 100,
  min: 0,
  type: 'determinate',
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;

/**
* @component progress-bar
* @section default
* @react
import { ProgressBar } from '@collab-ui/react';

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Default'
        min={0}
        max={100}
        value={50}
      />
    </div>
  );
}

**/

