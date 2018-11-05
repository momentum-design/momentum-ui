
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="messagebox-backdrop">
   <div class="message-box">
     <div class="message-box__content">
       <i class="message-box__icon icon-circle-computer-negative"></i>
       <h3 class="message-box__title message-box__title--alert">Not Found</h3>
       <h5 class="message-box__details">Sorry, but the page you were trying to view does not exist.</h5>
     </div>
     <div class="message-box__footer">
     </div>
   </div>
   <div class="messagebox-backdrop__footer">
     <i class="icon icon-cisco-logo"></i>
     <div class="body-smallest">
       <a href="javascript:void(0)">Terms of Service</a> | Privacy Statement © 2016 Cisco and/or affiliates. All rights reserved.
     </div>
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          