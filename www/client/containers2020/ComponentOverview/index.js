import React from 'react';
import ComponentOverviewPage from './ComponentOverviewPage';
import Component from '../Component';
import { Route, withRouter, Switch } from 'react-router-dom';
import PageHero from '../../components2020/PageHero';

// Import page images
import componentBanner from '../../assets/2020/banner-components.svg';

class Components extends React.Component {
  render() {

    return (
      <div className="site-con">
        <PageHero
          backgroundColor='#BCF7BF'
          backgroundImage={componentBanner}
          backgroundSize='700px'
          figmaURL='https://www.figma.com/file/FKFSq0HQpjp8wYHnQDBRum/Web?node-id=0%3A1'
          githubURL='https://github.com/momentum-design/momentum-ui/tree/main/react/src/lib'
          heroTitle='Components'
        />
        <div className="site-con">
          <Switch>
            <Route path='/components' exact component={ComponentOverviewPage} />
            <Route
              path='/components/:component'
              render={({ match }) => <Component match={match} />}
            />
          </Switch>
        </div>
      </div>
    );
  }

}

export default Components;