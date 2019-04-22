import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { Icon, SearchInput } from '@collab-ui/react';

class SearchButton extends React.Component {
  state = {
    expanded: this.props.expanded,
    value: this.props.value,
  };

  componentDidUpdate(prevProps) {
    const { expanded } = this.props;
    if (prevProps.expanded !== expanded) {
      this.updateExpanded(expanded);
    }
  }

  updateExpanded = expanded => {
    this.setState({ expanded: expanded });
    if (!expanded) {
      this.setState({ value: '' });
    }
  };

  handleClose = e => {
    const { onClose } = this.props;
    this.setState(
      {
        expanded: false,
        value: '',
      },
      () => onClose && onClose(e)
    );
  };

  handleSearchInput = e => {
    this.setState({
      value: e.target.value.trim(),
    });
  };

  render() {
    const {
      onChange,
      onExpand,
      onFocus,
      ...props
    } = this.props;
    const otherProps = omit({ ...props }, [
      'expanded',
      'onClose',
      'value'
    ]);
    const { expanded, value } = this.state;

    return (
      <div
        className={
          'md-search-button' +
          `${expanded ? ` md-search-button__expand` : ''}`
        }
      >
        <SearchInput
          type="pill"
          value={expanded && value || ''}
          onFocus={e => {
              this.setState(
                { expanded: true },
                () => onExpand && onExpand(e)
              );
              if(onFocus){
                onFocus(e);
              }
            }
          }
          onChange={e => {
              this.handleSearchInput(e);
              if(onChange){
                onChange(e);
              }
            }
          }
          {...otherProps}
        />
        {expanded && (
          <Icon
            buttonClassName="md-search-button__close"
            name="clear-active_16"
            onClick={this.handleClose}
          />
        )}
      </div>
    );
  }
}

SearchButton.propTypes = {
  expanded: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onExpand: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SearchButton.defaultProps = {
  expanded: false,
  onChange: null,
  onClose: null,
  onExpand: null,
  onFocus: null,
  value: null,
};

SearchButton.displayName = 'SearchButton';

export default SearchButton;
