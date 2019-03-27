/** @component search-input */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Input,
 } from '@collab-ui/react';

const SearchInput = props => {
  const {
    type,
    ...otherProps
  } = props;

  return (
    <Input
      className={
        'cui-search-input' +
        `${type === 'pill' ? ' cui-search-input--pill' : ''}`
      }
      {...otherProps}
    >
      <Icon
        className='cui-search-input__icon'
        name={`${type === 'pill' ? 'search_16' : 'search_20'}`}
      />
    </Input>
  );
};

SearchInput.propTypes = {
  /** @prop Style of search input normal or pill | 'normal' */
  type: PropTypes.oneOf(['normal', 'pill'])
};

SearchInput.defaultProps = {
  type: 'normal'
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
