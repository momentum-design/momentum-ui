import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@collab-ui/react';
/**
 *
 * @category containers
 * @component chip
 * @variations collab-ui-react
 *
 */

const Chip = ({
  className,
  leftContent,
  fileDownloadLink,
  fileType,
  rightContent,
  subTitle,
  title,
  type,
}) => {
  Chip.displayName = 'Chip';

  // This appears to be a false positive
  // See: https://github.com/yannickcr/eslint-plugin-react/issues/1181
  // eslint-disable-next-line react/no-multi-comp
  function buildChipLeft() {
    if (type === 'file') {
      return <Icon name={`file-${fileType}_32`} />;
    }

    if (type === 'recording') {
      return <Icon name="play-circle_32" color="white" />;
    }

    if (type === 'unauthorized') {
      return <Icon name="warning_32" />;
    }

    return leftContent;
  }

  // eslint-disable-next-line react/no-multi-comp
  function buildChipRight() {
    if (rightContent) {
      return rightContent;
    }

    if (type === 'file' && fileDownloadLink) {
      return (
        <a className="file-download" download href={fileDownloadLink}>
          <i className="icon icon-download_32" />
        </a>
      );
    }

    return null;
  }

  const chipLeft = buildChipLeft();
  const chipRight = buildChipRight();

  return (
    <div className={'cui-chip' + `${(className && ` ${className}`) || ''}`}>
      <div className={'cui-chip-left' + `${(type && ` ${type}`) || ''}`}>
        {chipLeft}
      </div>
      <div className="cui-chip-center">
        {title && <div className="cui-chip__title lead">{title}</div>}
        {subTitle && (
          <div className="cui-chip__sub-title subheader">{subTitle}</div>
        )}
      </div>
      {chipRight && <div className="cui-chip-right">{chipRight}</div>}
    </div>
  );
};

Chip.propTypes = {
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets file for anchor element to download | '' */
  fileDownloadLink: PropTypes.string,
  /** @prop Sets type of file | null */
  fileType: PropTypes.oneOf([
    'audio',
    'graph',
    'image',
    'locked',
    'missing',
    'pdf',
    'spreadsheet',
    'text',
    'video',
    'zip',
  ]),
  /** @prop Node that becomes the content on the left of Chip | null */
  leftContent: PropTypes.node,
  /** @prop NOde that becomes the content on the right of Chip | null */
  rightContent: PropTypes.node,
  /** @prop Text of the Chip's subtitle | '' */
  subTitle: PropTypes.string,
  /** @prop Text of the Chip's title | null */
  title: PropTypes.string,
  /** @prop Sets the type of icon for the Chip | null */
  type: PropTypes.oneOf(['file', 'recording', 'unauthorized']),
};

Chip.defaultProps = {
  className: '',
  fileDownloadLink: '',
  fileType: null,
  leftContent: null,
  rightContent: null,
  subTitle: '',
  title: null,
  type: null,
};

export default Chip;

/**
 * @component chip
 * @section recording
 * @react
 import { Chip } from '@collab-ui/react';

 export default function Chip() {
   return (
     <div className="row">
       <div className="docs-example docs-example--spacing">
         <h3>
           <p><code className="small">size=(16)</code></p>
         </h3>
         <Chip type="recording" title="Webex Teams Recording" subTitle="18 min"/>
       </div>
     </div>
   );
 }

 **/

/**
 * @component chip
 * @section file
 * @react
 import { Chip } from '@collab-ui/react';

 export default function Chip() {
   return (
     <div className="row">
       <div className="docs-example docs-example--spacing">
         <h3>
           <p><code className="small">size=(16)</code></p>
         </h3>
         <Chip type="file" fileType="audio" title="Filename.mp3" subTitle="23kb"  fileDownloadLink="https://www.google.com"/>
       </div>
     </div>
   );
 }
 **/
