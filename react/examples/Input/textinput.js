
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="row">
   <div class="cui-input-group medium-5 columns">
     <label for="text">Text Input</label>
     <input class="cui-input" id="text" name="text" type="text" placeholder="Placeholder Text">
   </div>
   <div class="cui-input-group medium-5 columns">
     <label for="email">Email Input</label>
     <input class="cui-input" id="email" name="email" type="email" placeholder="Placeholder Text">
   </div>
 </div>
 <div class="row">
   <div class="cui-input-group medium-5 columns">
     <label for="number">Number Input</label>
     <input class="cui-input" id="number" name="number" type="number" placeholder="Placeholder Text">
   </div>
   <div class="cui-input-group medium-5 columns">
     <label for="password">Password Input</label>
     <input class="cui-input" id="password" name="password" type="password" placeholder="Placeholder Text">
   </div>
 </div>
 <div class="row">
   <div class="cui-input-group medium-5 columns">
     <label for="tel">Telephone Input</label>
     <input class="cui-input" id="tel" name="tel" type="tel" placeholder="Placeholder Text">
   </div>
   <div class="cui-input-group medium-5 columns">
     <label for="url">Url Input</label>
     <input class="cui-input" id="url" name="url" type="url" placeholder="Placeholder Text">
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          