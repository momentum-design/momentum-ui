import PropTypes from 'prop-types';
import React from 'react';
import Media from 'react-media';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Spinner } from '@momentum-ui/react';
import CodeTab from '../../components2020/CodeTab';
import DesignTab from '../../components/DesignTab';
import GridTab from '../../components2020/GridTab';
import SectionHeader from '../../components2020/SectionHeader';
import Icon from '@momentum-ui/react/lib/Icon';

class ComponentPage extends React.Component {
  render() {
    const {
      child,
      codePreference,
      component,
      loading,
      location,
      match,
    } = this.props;

    const verifyCodeExamples = () => {
      const findCodeExamples = sections => (
        sections.reduce(
          (agg, section) => {

            if(
              agg
                || section.variations.core.example
                || section.variations.react.example
            ) {
              return true;
            } else return false;


          }, false)
        );

      return component
        && match.params.component === component.name
        && component.code
        && component.code.sections
        && findCodeExamples(component.code.sections);
    };

    const hasCodeExamples = verifyCodeExamples();

    const getDefaultTab = () => {
      if (match.params.component !== component.name) return match.url;

      return hasCodeExamples ? `${match.url}/code`
        : component.usage ? `${match.url}/usage`
          : component.style ? `${match.url}/style`
            : match.url
    };

    const allComponentsNavLink = (
      <div className="component-page-all-components-nav">
        <Icon name="icon-arrow-left_16"/>
        <NavLink to="/2020/components">All Components</NavLink>
      </div>
    );

    const properComponentLoaded = match.params.component === component.name;

    return (
      <Media query="(min-width: 1025px)">
        {isDesktop => {
          return !component && properComponentLoaded
            ? (
              <div className="site-warp">
                {allComponentsNavLink}
                <Spinner />
              </div>
            )
            : (
              <div className="site-warp">
                {allComponentsNavLink}
                {properComponentLoaded
                  &&
                    <>
                      <SectionHeader
                        title={component.displayName}
                        leadStr={component.description}
                      />
                      <GridTab matchUrl={match.url} component={component} hasCodeExamples={hasCodeExamples} isMobile={!isDesktop}/>
                    </>
                  || <div className="component-page-spinner-container"><Spinner /></div>
                }

                <div className='docs-content-area component-page-area'>
                  {loading
                    ? <Spinner />
                    : <Switch>
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
              </div>
            );
        }}
      </Media>
    );
  }
}

ComponentPage.propTypes = {
  codePreference: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
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
