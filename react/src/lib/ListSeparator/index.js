import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category containers
 * @component list-separator
 * @variations collab-ui-react
 */

const ListSeparator = props => {
  const { text } = props;

  return (
    <div
      className={
        `cui-list-separator` + `${text ? ' cui-list-separator--text' : ''}`
      }>
      {text && <p className="cui-list-separator__text">{text}</p>}
    </div>
  );
};

ListSeparator.propTypes = {
  color: PropTypes.string,
};

ListSeparator.defaultProps = {
  color: null,
};

ListSeparator.displayName = 'ListSeparator';

export default ListSeparator;

ListSeparator.propTypes = {
  text: PropTypes.string,
};

ListSeparator.defaultProps = {
  text: null,
};
