
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="row">
   <div class="small-12 columns small-block-grid-3">
     <p>first</p>
     <p>second</p>
     <p>third</p>
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          