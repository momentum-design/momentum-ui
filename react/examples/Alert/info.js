
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="cui-alert">
   <div class="cui-alert__icon"></div>
   <div class="cui-alert__content">
     <div class="cui-alert__title">Title goes here</div>
     <div class="cui-alert__message">Info text here. Lorem ipsum dolor sit amet, consectetur.</div>
   </div>
   <div class="cui-alert__button">
     <button type="button" class="cui-button cui-button--circle cui-button--large">
       <span class="cui-button__children icon icon-cancel_14"></span>
     </button>
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          