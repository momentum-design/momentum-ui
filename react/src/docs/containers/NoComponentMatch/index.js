import React from 'react';
import PropTypes from 'prop-types';
import angularJsImg from '@collab-ui/core/docs/assets/angularjs-inline.png';
import angularImg from '@collab-ui/core/docs/assets/angular-inline.png';
import htmlImg from '@collab-ui/core/docs/assets/html-css.png';

export default function NoComponentMatch(category, component, section) {
  const path = `${category}/${component}#{this.section.section}`;
  const angularUrl = `http://collab-ui-angular/${path}`;
  const angularJsUrl = `http://collab-ui-angularjs/${path}`;
  const htmlUrl = `http://collab-ui/${path}`;

  return (
    <p className="coming-soon">
      {section &&
        section.name &&
        `${
          section.name
        } does not yet exist in this version of the Collab UI Library
        or has not yet been updated to the new Collaboration Design. Try one of
        our other libraries`}
      {section &&
        category &&
        component && [
          <a href={htmlUrl} key="1-nocomp">
            <img src={htmlImg} alt="Collab UI" title="Collab UI" />
            &nbsp;Collab&nbsp;UI
          </a>,
          <a href={angularUrl} key="2-nocomp">
            <img
              src={angularImg}
              alt="Collab UI Angular"
              title="Collab UI Angular"
            />
          </a>,
          <a className="" href={angularJsUrl} key="3-nocomp">
            <img
              src={angularJsImg}
              alt="Collab UI AngularJS"
              title="Collab UI AngularJS"
            />
          </a>,
          <span key="4-nocomp">or the </span>,
          <a href="http://collab-ui-ng.cisco.com" key="5-nocomp">
            Symphony documentation
          </a>
        ]}
    </p>
  );
}

NoComponentMatch.propTypes = {
  category: PropTypes.string,
  component: PropTypes.string,
  section: PropTypes.shape({
    name: PropTypes.string
  })
};

NoComponentMatch.defaultProps = {
  category: '',
  component: '',
  section: null
};
