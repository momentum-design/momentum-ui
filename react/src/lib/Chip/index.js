import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@collab-ui/react'
/**
 *
 * @category containers
 * @component chip
 * @variations collab-ui-react
 *
 */

const Chip = ({className, leftContent, fileDownloadLink, fileType, rightContent, subTitle, title, type}) => {
  Chip.displayName = 'Chip';

  // This appears to be a false positive
  // See: https://github.com/yannickcr/eslint-plugin-react/issues/1181
  // eslint-disable-next-line react/no-multi-comp
  function buildChipLeft() {
    if (type === 'file') {
      return <Icon name={`file-${fileType}_32`}/>;
    }

    if (type === 'recording') {
      return <Icon name="play-circle_32" color="white"/>;
    }

    if (type === 'unauthorized') {
      return <Icon name="warning_32"/>;
    }

    return leftContent;
  }

  // eslint-disable-next-line react/no-multi-comp
  function buildChipRight() {
    if (rightContent) {
      return rightContent;
    }

    if (type === 'file' && fileDownloadLink) {
      return(
        <a
          className="file-download"
          download
          href={fileDownloadLink}>
            <i className="icon icon-download_32"/>
        </a>
      );
    }

    return null;
  }

  const chipLeft = buildChipLeft();
  const chipRight = buildChipRight();

  return (
    <div className={'cui-chip' + `${className && ` ${className}` || ''}`}>
      <div className = {'cui-chip-left' + `${type && ` ${type}` || ''}`}>
       {chipLeft}
      </div>
      <div className="cui-chip-center">
       {title && <div className="cui-chip__title lead">{title}</div> }
       {subTitle && <div className="cui-chip__sub-title subheader">{subTitle}</div>}
      </div>
      {chipRight &&
        <div className="cui-chip-right">
          {chipRight}
        </div>
      }
    </div>
  );
};

Chip.propTypes = {
  className: PropTypes.string,
  fileType: PropTypes.oneOf(['audio', 'graph', 'image', 'locked', 'missing', 'pdf', 'spreadsheet', 'text', 'video', 'zip']),
  leftContent: PropTypes.node,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['file', 'recording', 'unauthorized']).isRequired,
  fileDownloadLink: PropTypes.string,
  rightContent: PropTypes.node
};

Chip.defaultProps = {
  className: '',
  fileType: null,
  leftContent: null,
  subTitle: '',
  fileDownloadLink: '',
  rightContent: null
};

 export default Chip;

 /**
 * @name Recording Chip
 *
 * @category containers
 * @component chip
 * @section recording
 * @js

 export default function Chip() {
   return (
     <div className="row">
       <div className="docs-example docs-example--spacing">
         <h3>
           <p><code className="small">size=(16)</code></p>
         </h3>
         <Chip type="recording"/>
       </div>
     </div>
   );
 }

 **/

 /**
 * @name File Chip
 *
 * @category containers
 * @component chip
 * @section file
 * @js

 export default function Chip() {
   return (
     <div className="row">
       <div className="docs-example docs-example--spacing">
         <h3>
           <p><code className="small">size=(16)</code></p>
         </h3>
         <Chip type="file" fileType="audio" fileDownloadLink="https://www.google.com"/>
       </div>
     </div>
   );
 }
 **/
