import React from 'react';
import PropTypes from 'prop-types';

const IconDownload = props => {
  const { header, subheader, link, linkDetails } = props;

  return (
    <div className="download-item">
      {
        link
        ?
        <a href={`${link}`}>{linkDetails}</a>
        :
        <div className="i-modal__class" tabIndex={0}>
          <code>{header}</code>
        </div>
      }
      {
        subheader 
        && 
        <p>{subheader}</p>
      }
    </div>
  );
};

IconDownload.defaultProps = {
  header: '',
  subheader: '',
  link: '',
  linkDetails: ''
};

IconDownload.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  link: PropTypes.string,
  linkDetails: PropTypes.string
};

export default IconDownload;