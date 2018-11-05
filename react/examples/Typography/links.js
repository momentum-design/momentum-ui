
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <p><a href="/styles/colors">Learn more about Collab UI's global colors.</a></p>`}} />

              /* eslint-enable */
              }
            }
          