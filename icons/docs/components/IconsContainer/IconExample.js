import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import Icon from '../Icon';

export default class IconExample extends React.PureComponent {

  // getClosest = (sizeArray, target) => {
  //   const closestSize = _.reduce(sizeArray, (agg, size) => {
  //     const difference = Math.abs(size - target);
  //     return !agg || difference < agg[1]
  //       ? [size, difference]
  //       : agg;
  //   }, null);
  //   return closestSize[0];
  // };

  getClosest = (array, target) => {
    const sizeArray = _.map(array, (val) =>  [val, Math.abs(val - target)]);
    return _.reduce(sizeArray, (memo, val) => {
      return (memo[1] < val[1])
        ? memo
        : val;
    }, [-1, 999])[0];
  }

  render() {
    const { openModal, icon } = this.props;

    const modifiedIcon = {
      ...icon,
      defaultSize: this.getClosest(icon.colors.default, 36)
    };

    return (
      <div className="i-example" onClick={() => openModal(modifiedIcon)}>
      <div className={`i-example__icon icon-${icon.name}_${modifiedIcon.defaultSize} icon-${icon.name}`} />
      <div className="i-example__name">{icon.name}</div>
      </div>
    );
  }
}

IconExample.propTypes = {
  icon: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired
};

// <Icon className={'i-example__icon'} name={`${icon.name}_${modifiedIcon.defaultSize}`} />
