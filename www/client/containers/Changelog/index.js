import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '@momentum-ui/react';
import { changelogTypes } from './changelogTypes';
import { fetchChangelogData } from './actions';
import ChangelogTab from '../../components/ChangelogTab';
import PageHeader from '../../momentum-ui/PageHeader';

class Changelog extends React.Component {
  componentDidMount() {
    this.props.fetchChangelogData();
  }

  render() {
    const {
      changelogs,
      loading,
      match,
    } = this.props;

    const changelogPath = '/changelog';

    return (
      <React.Fragment>        
        <PageHeader title="Release Notes" textAlign="left" />
        <div className="md-button-group md-button-group--blue">
          {
            changelogTypes.map((item, idx) => (
              <NavLink
                activeClassName="active"
                className="md-button md-button--36"
                key={`${item.path}-${idx}`}
                to={`${changelogPath}/${item.path}`}
              >
                {item.displayName}
              </NavLink>
            ))
          }
        </div>
        <div className="docs-content-area docs-content-area--with-pagenav">
          {
            loading ? (
              <div className="docs-changelog__spinner">
                <Spinner />
              </div>
            ) : (
              <Switch>
                {
                  changelogTypes.map((item, idx) =>
                    changelogs[item.name] && (
                      <Route
                        key={`${item.path}-${idx}-route`}
                        path={`${changelogPath}/${item.path}`}
                        render={props => (
                          <ChangelogTab
                            {...props}
                            content={changelogs[item.name].md}
                          />
                        )}
                      />
                    )
                  )
                }
                <Redirect
                  exact
                  path={`${match.path}`}
                  to={`${changelogPath}/${changelogTypes[0].path}`}
                />
              </Switch>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.changelogReducer,
  };
};

Changelog.propTypes = {
  changelogs: PropTypes.object,
  error: PropTypes.string,
  fetchChangelogData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
};

Changelog.defaultProps = {
  changelogs: {},
  error: null,
  loading: false,
};

Changelog.displayName = 'Changelog';

export default connect(
  mapStateToProps,
  { fetchChangelogData }
)(Changelog);
