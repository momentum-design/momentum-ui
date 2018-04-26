import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@collab-ui/react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { ICON_URL } from '../../constants';

export default class MainContainer extends React.Component {
  render() {
    const { match, navData } = this.props;

    const navCards = navData.children.map((ele, idx) => {
      if (!ele.name) return null;

      if (ele.name === 'Icons') {
        return (
          <a key={`${ele}-${idx}`} href={ICON_URL} target="_blank">
            <Card label={ele.name} nav sizeNum={4} size="small" />
          </a>
        );
      }

      return (
        <Link key={`${ele}-${idx}`} to={`${match.url}/${ele.component}`}>
          <Card label={ele.name} nav sizeNum={4} size="small" />
        </Link>
      );
    });

    return (
      <div>
        <Header
          title={navData.name}
          description={navData.description}
        />
        {navData.children && (
          <div className="row">
            {navCards}
          </div>
        )}
      </div>
    );
  }
}

MainContainer.propTypes = {
  match: PropTypes.object.isRequired,
  navData: PropTypes.object.isRequired,
};
