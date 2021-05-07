import React from 'react';
import PropTypes from 'prop-types';
 import {
  Button,
  Popover
} from '@momentum-ui/react';
 export default function PopOverDirection({direction, isContained}) {
    const testCase = `This is a really long popover ${direction} - isContained: ${isContained ? "true" : "false"}`;
    const content = (
    <span key="1" style={{ padding: '10px'}}>{testCase}</span>
  );
  return (
    <div className="docs-example docs-example--spacing">
      <Popover
        content={content}
        direction={direction}
        isContained={isContained}
      >
        <Button id={`direction_${direction}_${isContained}`} children={`Direction: ${testCase}`} ariaLabel='Direction' />
      </Popover>
    </div>
  );
}

PopOverDirection.propTypes = {
  direction: PropTypes.string,
  isContained: PropTypes.bool
};

PopOverDirection.defaultProps = {
  isContained: false
};
