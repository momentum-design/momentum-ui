import React from 'react';
import PropTypes from 'prop-types';
import IconExample from './IconExample';
import { Spinner } from '@collab-ui/react';

export default class IconsList extends React.Component {
  render() {
    const { iconsList, loading, ...props } = this.props;

    return (
      <div className="i-list">
        {
          loading
          ?
          [...Array(20)].map((ele, idx) => {
            return (
              <div key={`${loading}-${idx}`} className="i-example">
                <div className='i-example__icon'>
                  <Spinner size={24} />
                </div>
                <div className="i-example__name">{'...Loading'}</div>
              </div>
            );
          })
          :
          iconsList.map((icon, index) => {
            return (
              <IconExample icon={icon} key={index} loading={loading} {...props} />
            );
          })
        }
      </div>
    );
  }
}

IconsList.propTypes = {
  iconsList: PropTypes.array,
  loading: PropTypes.bool
};


IconsList.defaultProps = {
  iconsList: [],
  loading: false
};
