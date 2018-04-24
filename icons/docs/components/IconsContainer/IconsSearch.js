import React from 'react';
import PropTypes from 'prop-types';
// import Icon from '../Icon';

export default class IconsSearch extends React.PureComponent {
  handleChange = event => {
    this.props.filterIcons(event.target.value);
  };

  render() {
    const { disabled } = this.props;
    return (
      <div className="i-search">
        <div className="i-search__wrapper">
        <i className="icon icon-search_24" />
        <input
        id="icon-search"
        className="cui-input"
        type="text"
        placeholder="Name"
        onChange={this.handleChange}
        disabled={disabled}
        />
        </div>
        </div>
      );
    }
  }
  
  IconsSearch.propTypes = {
    disabled: PropTypes.bool,
    filterIcons: PropTypes.func
  };
  
  IconsSearch.defaultProps = {
    disabled: false,
    filterIcons: null
  };
  
  // <Icon className='icon' name={'search_24'} />