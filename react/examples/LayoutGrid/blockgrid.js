
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="columns small-12">
   <div class="row">
     <div class="small-block-grid-2 medium-block-grid-3 large-block-grid-6">
       <div>one</div>
       <div>two</div>
       <div>three</div>
       <div>four</div>
       <div>five</div>
       <div>six</div>
     </div>
     <h5 class="small small-12 columns text-right">.small-12 .columns .small-block-grid-3 .collapse</h5>
     <div class="small-block-grid-2 medium-block-grid-3 large-block-grid-6 collapse">
       <div>one</div>
       <div>two</div>
       <div>three</div>
       <div>four</div>
       <div>five</div>
       <div>six</div>
     </div>
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          