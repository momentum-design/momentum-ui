import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

class HelmetWrapper extends React.Component {
  render() {
    const { description, title, url } = this.props;

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>>
        <meta itemProp="name" content={title}/>
        <meta itemProp="description" content={description}/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:url" content={url}/>
      </Helmet>
    );
  }
}

HelmetWrapper.defaultProps = {
  description: "The design system for Cisco Collaboration products including Cisco Webex",
  title: 'Cisco Momentum Design',
  url: 'https://momentum.design',
};

HelmetWrapper.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
};

HelmetWrapper.displayName = 'HelmetWrapper';

export default HelmetWrapper;
