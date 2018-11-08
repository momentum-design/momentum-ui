import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Icon } from '@collab-ui/react';
/* eslint-disable no-console */
class KitchenSink extends React.Component {
  state = {
    icons: this.props.icons,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.icons !== this.props.icons) {
      this.setState({ icons: nextProps.icons });
    }
  }

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
    const { icons } = this.state;
    return icons.map(icon => {
        const sizes = Object.keys(icon.sizes);
        return sizes.map((size, idx) => (
          <Icon key={idx} name={`${icon.name}_${size}`} />
        ));
      })
    ;
  }
}

KitchenSink.defaultProps = {
  icons: [],
};

KitchenSink.propTypes = {
  icons: PropTypes.array,
};

const mapStateToProps = state => ({
  icons: state.icons.icons
});

export default connect(mapStateToProps)(KitchenSink);
/* eslint-enable no-console */
