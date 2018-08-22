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

const Chip = (props) => {
  let chipLeft;
  let chipRight;

  switch(props.type) {
    case 'file':
      chipLeft = <Icon name={`icon-file-${props.fileType}_32`}/>;
      break;
    case 'recording':
      chipLeft = <Icon color="white" name="icon-play-circle_32"/>;
      break;
    case 'unauthorized':
      chipLeft = <Icon name="icon-warning_32"/>;
      break;
    default:
      chipLeft = props.leftContent;
   }

   console.log('props.leftContent', props.leftContent);

  if (props.type === 'file' && props.fileDownloadLink) {
    chipRight = (
      <a
        className="file-download"
        download
        href={props.fileDownloadLink}>
          <Icon name="icon-download_32"/>
      </a>
    );
  }
  else if (props.rightContent) {
    chipRight = props.rightContent;
  }

  return (
    <div className={`cui-chip ${props.className ? props.className : ''}`}>
      <div className = {`cui-chip-left ${props.type}`}>
       {chipLeft}
      </div>
      <div className="cui-chip-center">
       {props.title && <div className="cui-chip__title lead">{props.title}</div> }
       {props.subTitle && <div className="cui-chip__sub-title subheader">{props.subTitle}</div>}
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
   title: PropTypes.string,
   type: PropTypes.oneOf(['file', 'recording', 'unauthorized']),
   fileDownloadLink: PropTypes.string,
   rightContent: PropTypes.node
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
