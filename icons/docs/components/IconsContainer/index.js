import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import IconsSearch from './IconsSearch';
import IconsList from './IconsList';
import IconModal from '../Modal';
import Header from '../Header';
import * as _ from 'lodash';

class IconsContainer extends React.Component {
  state = {
    icons: this.props.icons,
    currentIcon: null,
    isModalOpen: false,
    stickyClass: '',
  };

  // didScroll = false;
  // interval;

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // this.interval = setInterval(this.timeOut.bind(this), 1000);
    this.iSearch = document.getElementsByClassName('i-search');
    this.searchPosition = this.iSearch[0].offsetTop;
    this.lastScrollPosition = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.icons !== this.props.icons) {
      this.setState({ icons: nextProps.icons });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.newScrollPosition = window.scrollY;

    if (this.newScrollPosition < this.lastScrollPosition) {
      if (window.scrollY + 57 >= this.searchPosition) {
        this.setState({ stickyClass: 'sticky-search' });
      } else {
        this.setState({ stickyClass: '' });
      }
    } else {
      if (window.scrollY + 91 >= this.searchPosition) {
        this.setState({ stickyClass: 'sticky-search' });
      } else {
        this.setState({ stickyClass: '' });
      }
    }

    this.lastScrollPosition = this.newScrollPosition;

  }

  openModal = icon => {
    this.setState({ isModalOpen: true, currentIcon: icon });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  scrollTop = el => {
    const searchNode = el.target;
    window.scroll(0, searchNode.getBoundingClientRect().top - 70);
  };

  filterIcons = input => {
    const icons = [...this.props.icons];


    const normalizedInput = input.toLowerCase();

    const filteredList = _.reduce(icons, (agg, icon) => {
      const sizes = Object.keys(icon.sizes);
      const colors = Object.keys(icon.colors);

      return (
        sizes.includes(normalizedInput)
        || colors.includes(normalizedInput)
        || icon.name.includes(normalizedInput)
      )
        ? agg.concat(icon)
        : agg;
    }, []);

    this.setState({ icons: filteredList });
  };

  render() {
    const { icons, currentIcon, isModalOpen } = this.state;
    const { loading, error } = this.props;

    return (
      <React.Fragment>
        <Header
          title="Collab UI Icons"
          description="Search or type an icon name"
          hero
          headerClass={this.state.stickyClass}
        >
          <IconsSearch
            filterIcons={this.filterIcons}
            inputFocus={this.scrollTop}
            disabled={loading || error}
          />
        </Header>
        <div className="row">
          <div className="i-container docs-container">
            {
              error
                ?
                error
                :
                (
                  <React.Fragment>
                    <IconsList iconsList={icons} openModal={this.openModal} loading={loading} />
                    <IconModal
                      isOpen={isModalOpen}
                      onClose={this.closeModal}
                      currentIcon={currentIcon}
                    />
                  </React.Fragment>
                )
              }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

IconsContainer.defaultProps = {
  icons: [],
  error: null,
  loading: false
};

IconsContainer.propTypes = {
  icons: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.icons.loading,
  error: state.icons.error,
  icons: state.icons.icons
});

export default connect(mapStateToProps)(IconsContainer);
