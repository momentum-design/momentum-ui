import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@momentum-ui/react';

class Feedback extends Component {

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {

  }


  render() {
    return (
      <div className={'site-con site-feedback'}>
        <div className={'site-warp'}>
          <h1>Didn’t find what you’re looking for? Let us know!</h1>
          <Button
            ariaLabel='Send feedback'
            className="md-button--blue"
            size={52}
          >Send feedback</Button>
        </div>
      </div>
    );
  }
}

Feedback.displayName = 'Feedback2020';

function mapStateToProps(state) {
  return {
  };
}

export default withRouter(
  connect(
    mapStateToProps,
  )(Feedback)
);
