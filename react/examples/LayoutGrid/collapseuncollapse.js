
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `<div class="row medium-uncollapse large-collapse">
    <div class="small-6 columns">
        Removes gutter at large media query
    </div>
    <div class="small-6 columns">
        Removes gutter at large media query
    </div>
</div>`}} />

              /* eslint-enable */
              }
            }
          