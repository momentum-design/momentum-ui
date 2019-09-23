/** @component input-search */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Input,
  Spinner
} from '@momentum-ui/react';

const SearchInput = props => {
  const {
    isLoading,
    ...otherProps
  } = props;

  return (
    <Input
      className='md-search-input'
      inputBefore={
        isLoading
          ? <Spinner size={20} />
          : <Icon
              className='md-search-input__icon'
              name='search_20'
            />
      }
      {...otherProps}
    />
  );
};

SearchInput.propTypes = {
  /** @prop Determines if spinner is present | false */
  isLoading: PropTypes.bool
};

SearchInput.defaultProps = {
  isLoading: false
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
