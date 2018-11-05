
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <small>This line of text is meant to be treated as fine print.</small>`}} />

              /* eslint-enable */
              }
            }
          