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
  /**
   * label string required
   */
  label: PropTypes.string.isRequired,
  /**
   * value number required
   */
  value: PropTypes.number.isRequired,
  /**
   * min number optional
   */
  min: PropTypes.number,
  /**
   * max number optional
   */
  max: PropTypes.number,
  /**
   * dyanmic bool optional
   */
  dynamic: PropTypes.bool,
  /**
   * color class optional will overwrite dynamic
   */
  color: PropTypes.string,
  /**
   * dyanmic number required
   */
  displayFormat: PropTypes.oneOf(['none', 'fraction', 'percentage']),
  /**
   * optional type prop type
   */
  type: PropTypes.oneOf(['determinate', 'indeterminate']),
};

ProgressBar.defaultProps = {
  min: 0,
  max: 100,
  type: 'determinate',
  dynamic: false,
  displayFormat: 'fraction',
  color: '',
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;

/**
* @name Progress Bar Default
*
* @category communication
* @component progress-bar
* @section default
*
* @js

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

/**
* @name Progress Bar Dynamic Colors
*
* @category communication
* @component progress-bar
* @section Dynamic Colors
*
* @js

import {
  Button
} from '@collab-ui/react';

export default class Default extends React.PureComponent{
  state= {
    pbValue: 0
  }

  render() {
    return (
      <div>
        <Button
          label='Randomize'
          onClick={() => this.setState({pbValue: Math.floor(Math.random() * (101))})}
          ariaLabel='Randomize'
          color='primary'
        />
        <div className='columns small-6'>
          <ProgressBar
            label='ProgressBar Default'
            value={this.state.pbValue}
            dynamic
          />
        </div>
      </div>
    );
  }
}

**/

/**
* @name Progress Bar Static Color
*
* @category communication
* @component progress-bar
* @section Static Color
*
* @js

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Static'
        value={50}
        color='danger'
      />
    </div>
  );
}

**/

/**
* @name Progress Bar Percentage Display
*
* @category communication
* @component progress-bar
* @section Percentage Display
*
* @js

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Percentage'
        value={50}
        displayFormat='percentage'
      />
    </div>
  );
}

**/

/**
* @name Progress Bar No Display
*
* @category communication
* @component progress-bar
* @section No Display
*
* @js

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Display None'
        value={75}
        displayFormat='none'
      />
    </div>
  );
}

**/

/**
* @name Progress Bar Min Max Modified
*
* @category communication
* @component progress-bar
* @section Min Max Modified
*
* @js

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Min Max'
        min={0}
        max={250}
        value={125}
      />
    </div>
  );
}

**/

/**
* @name Progress Bar Determinate/Indeterminate
*
* @category communication
* @component progress-bar
* @section Determinate/Indeterminate
*
* @js

export default function() {
  return (
    <div className='columns small-6'>
      <div>Pending: Determinate/Indeterminate Need to Have CSS Styles Defined in Collab-UI</div>
      <ProgressBar
        label='ProgressBar Determinate/Indeterminate'
        value={60}
        displayFormat='percentage'
      />
    </div>
  );
}

**/
