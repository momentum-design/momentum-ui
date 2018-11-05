
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `   <div class="row default-state">
     <div class="small-2 columns">
       <h4>Colors</h4>
     </div>
     <div class="docs-example--spacing">
       <span class="cui-badge">Default</span>
       <span class="cui-badge cui-badge--blue">Blue</span>
       <span class="cui-badge cui-badge--red">Red</span>
       <span class="cui-badge cui-badge--yellow">Yellow</span>
       <span class="cui-badge cui-badge--green">Green</span>
       <span class="cui-badge cui-badge--mint">Mint</span>
       <span class="cui-badge cui-badge--pastel">Default</span>
       <span class="cui-badge cui-badge--blue-pastel">Blue</span>
       <span class="cui-badge cui-badge--red-pastel">Red</span>
       <span class="cui-badge cui-badge--yellow-pastel">Yellow</span>
       <span class="cui-badge cui-badge--green-pastel">Green</span>
       <span class="cui-badge cui-badge--mint-pastel">Mint</span>
     </div>
   </div>
   <div class="row round-state">
     <div class="small-2 columns">
       <h4>Round</h4>
     </div>
     <div class="docs-example--spacing">
       <span class="cui-badge cui-badge--round">1</span>
       <span class="cui-badge cui-badge--round cui-badge--blue">2</span>
       <span class="cui-badge cui-badge--round cui-badge--red">3</span>
       <span class="cui-badge cui-badge--round cui-badge--yellow">4</span>
       <span class="cui-badge cui-badge--round cui-badge--green">5</span>
       <span class="cui-badge cui-badge--round cui-badge--mint">6</span>
       <span class="cui-badge cui-badge--round cui-badge--pastel">1</span>
       <span class="cui-badge cui-badge--round cui-badge--blue-pastel">2</span>
       <span class="cui-badge cui-badge--round cui-badge--red-pastel">3</span>
       <span class="cui-badge cui-badge--round cui-badge--yellow-pastel">4</span>
       <span class="cui-badge cui-badge--round cui-badge--green-pastel">5</span>
       <span class="cui-badge cui-badge--round cui-badge--mint-pastel">6</span>
     </div>
   </div>`}} />

              /* eslint-enable */
              }
            }
          