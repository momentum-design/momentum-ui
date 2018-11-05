
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="row">
   <div class="columns medium-9">.medium-9</div>
   <div class="columns medium-3">.medium-3</div>
   <div class="columns small-12">
     <div class="row collapse">
       <h5 class="small columns small-12 text-right">.small-12 .{small|medium|large}-block-grid-* collapse</h5>
       <div class="small-12 columns small-block-grid-2 medium-block-grid-3 large-block-grid-6 collapse">
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=1st%20image&w=200&h=200"/>
         </div>
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=2nd%20image&w=200&h=200"/>
         </div>
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=3rd%20image&w=200&h=200"/>
         </div>
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=4th%20image&w=200&h=200"/>
         </div>
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=5th%20image&w=200&h=200"/>
         </div>
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=6th%20image&w=200&h=200"/>
         </div>
       </div>
       <div class="small-12 columns small-block-grid-2 medium-block-grid-3 collapse">
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=7th%20image&w=200&h=200"/>
         </div>
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=8th%20image&w=200&h=200"/>
         </div>
         <div class="">
           <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=9th%20image&w=200&h=200"/>
         </div>
       </div>
     </div>
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          