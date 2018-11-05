
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="row">
   <div class="cui-input-group medium-5 columns">
     <label for="textArea">Text Area</label>
     <textarea  class="cui-input" id="textArea" name="textArea" rows="10" placeholder="Placeholder Textarea"></textarea>
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          