import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Input,
 } from '@collab-ui/react';

/**
 * @category controls
 * @component search-input
 * @variations collab-ui-react
*/

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

/**
* @component search-input
* @section default
* @react
import { SearchInput } from '@collab-ui/react';

export default class DefaultSearchInput extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <SearchInput
          name='defaultSearchInput'
          htmlId='defaultSearchInput'
          inputSize='small-5'
        />
      </div>
    );
  }
}

**/

/**
* @component search-input
* @section pill
* @react
import { SearchInput } from '@collab-ui/react';

export default class PillSearchInput extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <SearchInput
          name='pillSearchInput'
          htmlId='pillSearchInput'
          type='pill'
          inputSize='small-5'
        />
      </div>
    );
  }
}

**/
