
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <form name="myFormHtml" novalidate>
   <div class="row">
     <div class="cui-input-group medium-6 columns error">
       <label for="firstName">Error Input</label>
       <input class="cui-input" id="firstName" name="firstName" type="text" placeholder="Placeholder" minlength="5" maxlength="10" required>
       <p class="cui-input__help-text">Possible errors include: required, min length = 5 and max length = 10</p>
       <div class="cui-input__messages" role="alert">
         <div class="message">This field is required</div>
       </div>
       <div class="cui-input__messages" role="alert">
         <div class="message">Your field is too short</div>
       </div>
       <div class="cui-input__messages" role="alert">
         <div class="message">Your input is WAAAAY too long!</div>
       </div>
     </div>
   </div>
 </form>`}} />

              /* eslint-enable */
              }
            }
          