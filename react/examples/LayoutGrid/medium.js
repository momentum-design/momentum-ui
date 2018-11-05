
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `<div class="row">
  <div class="medium-2 columns">2 columns</div>
  <div class="medium-10 columns">10 columns</div>
</div>
<div class="row">
  <div class="medium-3 columns">3 columns</div>
  <div class="medium-9 columns">9 columns</div>
</div>`}} />

              /* eslint-enable */
              }
            }
          