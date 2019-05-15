import React from 'react';
import PropTypes from 'prop-types';
import HelmetWrapper from '../../components/HelmetWrapper';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Spinner } from '@momentum-ui/react';
import CodeTab from '../../components/CodeTab';
import DesignTab from '../../components/DesignTab';
import IconsTab from '../../containers/Icons';
import PageHeader from '../../momentum-ui/PageHeader';
import GridTab from '../../components/GridTab';
import Media from 'react-media';

class ComponentPage extends React.Component {
  render() {
    const {
      child,
      codePreference,
      components,
      loading,
      location,
      match,
    } = this.props;

    const component = components[child.object_id];

    const verifyCodeExamples = () => {
      const findCodeExamples = sections => (
        sections.reduce(
          (agg, section) => {

            if(
              agg
                || section.variations.core.example
                || section.variations.react.example
                || section.variations.angular.example
                || section.variations.angularjs.example
            ) {
              return true;
            } else return false;


          }, false)
        );

      return component
        && component.code
        && component.code.sections
        && findCodeExamples(component.code.sections);
    };

    const hasCodeExamples = verifyCodeExamples();

    const getDefaultTab = () => (
      component.name === 'icons' ? `${match.url}/library`
        : component.style ? `${match.url}/style`
          : component.usage ? `${match.url}/usage`
            : hasCodeExamples ? `${match.url}/code`
              : match.url
    );

    return (
      <Media query="(min-width: 1025px)">
        {isDesktop => {
          return !component
            ? (
              <PageHeader collapse={isDesktop} textAlign="left" />
            )
            : (
              <React.Fragment>
                <HelmetWrapper 
                  title={component.displayName}
                  description={component.description}
                  url={`https://momentum.design${location.pathname}`}
                />
                <PageHeader title={component.displayName} lead={component.description} textAlign="left" collapse={isDesktop} />
                <GridTab matchUrl={match.url} component={component} hasCodeExamples={hasCodeExamples} isMobile={!isDesktop}/>

                <div className={
                  'docs-content-area' +
                  `${!/library/.test(location.pathname) && ' docs-content-area--with-pagenav' || ''}`
                }>
                  {loading
                    ? <Spinner />
                    : <Switch>
                        {component.name === 'icons' && <Route path={`${match.url}/library`} render={props => <IconsTab {...props} />} />}
                        {component.style && <Route exact path={`${match.url}/style`} render={props => <DesignTab {...props} sections={component.style} />} />}
                        {component.usage && <Route exact path={`${match.url}/usage`} render={props => <DesignTab {...props} sections={component.usage} />} />}
                        {component.code && <Route exact path={`${match.url}/code`} render={props => hasCodeExamples &&
                          <CodeTab
                            codePreference={codePreference}
                            sections={component.code && component.code}
                            {...props}
                          />}
                        />}
                        <Route exact path={`${match.url}`}>
                          <Redirect to={getDefaultTab()}/>
                        </Route>
                      </Switch>
                  }
                </div>
              </React.Fragment>
            );
        }}
      </Media>
    );
  }
}

ComponentPage.propTypes = {
  child: PropTypes.object.isRequired,
  codePreference: PropTypes.string.isRequired,
  components: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
};

ComponentPage.defaultProps = {
  error: false,
  loading: false,
};

ComponentPage.displayName = 'ComponentPage';

export default ComponentPage;
