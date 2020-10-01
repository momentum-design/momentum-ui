import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { InputSearch } from '@momentum-ui/react';
import IconsList from './IconsList';
import fetchIcons from './actions';
import SectionHeader from '../../components2020/SectionHeader';
import PageHero from '../../components2020/PageHero';

// Import page images
import iconBanner from '../../assets/2020/banner-icons.svg';

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
      <div className="site-con">
        <PageHero
          backgroundColor='#F2F4FF'
          backgroundImage={iconBanner}
          backgroundSize='450px'
          figmaURL='https://www.figma.com/file/jwIr6nD0hC7r1K87LaYkJn/Momentum-icons?node-id=0%3A1'
          githubURL='https://github.com/momentum-design/momentum-ui/tree/master/icons'
          heroTitle='Icons'
        />
        <div className="site-warp">
          <SectionHeader
            title="Icons"
          />
          <div className="docs-icons">
            <div className="docs-icons__top-2020">
              <InputSearch
                onChange={this.handleSearchChange}
                disabled={loading || error}
                placeholder="Search"
                shape="pill"
                type="pill"
              />
            </div>
            {error ? (
              error
            ) : (
              <React.Fragment>
                <IconsList iconsList={icons} loading={loading} />
              </React.Fragment>
            )}
          </div>
        </div>
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
