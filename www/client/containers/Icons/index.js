import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { InputSearch } from '@momentum-ui/react';
import IconsList from './IconsList';
import fetchIcons from './actions';

class IconsContainer extends React.Component {
  state = {
    icons: this.props.icons,
  };

  componentDidMount() {
    const { icons, fetchIcons } = this.props;
    if ( icons.length < 1 ) return fetchIcons();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.icons !== this.props.icons) {
      this.setIconsList(this.props.icons);
    }
  }

  setIconsList(icons) {
    this.setState({
      icons,
    });
  }

  filterIcons = input => {
    const icons = [...this.props.icons];
    const normalizedInput = input.toLowerCase();
    const filteredList = reduce(icons, (agg, icon) => {
      const sizes = Object.keys(icon.sizes);
      const colors = Object.keys(icon.colors);
      const tags = icon.tags;

      return (
        sizes.includes(normalizedInput)
        || colors.includes(normalizedInput)
        || icon.name.includes(normalizedInput)
        || tags.includes(normalizedInput)
      )
        ? agg.concat(icon)
        : agg;
    }, []);

    this.setState({ icons: filteredList });
  };

  handleSearchChange = event => {
    this.filterIcons(event.target.value);
  };

  render() {
    const { icons } = this.state;
    const { loading, error } = this.props;

    return (
      <div className="docs-icons">
        <div className="docs-icons__top">
          <InputSearch onChange={this.handleSearchChange} disabled={loading || error} type="pill" />
          <a
            href="https://form.asana.com/?hash=623076c440a25ef0ebac4722ef6ff8cbb162f26c267a33e3d647a09725090333&id=1131408626092815"
            className="md-button md-button--gray"
            target="_blank"
          >
            Request new icon
          </a>
        </div>
        {error ? (
          error
        ) : (
          <React.Fragment>
            <IconsList iconsList={icons} loading={loading} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.iconsReducer.loading,
  error: state.iconsReducer.error,
  icons: state.iconsReducer.icons
});

IconsContainer.defaultProps = {
  icons: [],
  error: null,
  loading: false
};

IconsContainer.propTypes = {
  icons: PropTypes.array,
  fetchIcons: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string
};

IconsContainer.displayName = 'IconsContainer';

export default connect(
  mapStateToProps,
  { fetchIcons }
)(IconsContainer);
