
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `  <div class="list-states cui--contrast">
    <div class="row default-state">
      <div class="medium-12 row">
        <div class="medium-4 columns">
          <h4 class="text-center">Large</h4>
          <div class="cui-list cui-list--vertical" style="background-color:rgba(40,40,40,0.72);">
            <div class="cui-list-item cui-list-item--space">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <div class="cui-avatar__letter">UI</div>
                </div>
              </div>
              <div class="cui-list-item__center">
                <div class="cui-list-item__header">
                  Normal
                </div>
              </div>
            </div>
            <div class="cui-list-item cui-list-item--space hover">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <div class="cui-avatar__letter">UI</div>
                </div>
              </div>
              <div class="cui-list-item__center">
                <div class="cui-list-item__header">
                  Hover
                </div>
              </div>
            </div>
            <div class="cui-list-item cui-list-item--space active">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <div class="cui-avatar__letter">UI</div>
                </div>
              </div>
              <div class="cui-list-item__center">
                <div class="cui-list-item__header">
                  Pressed
                </div>
              </div>
            </div>
            <div class="cui-list-item cui-list-item--space focus">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <div class="cui-avatar__letter">UI</div>
                </div>
              </div>
              <div class="cui-list-item__center">
                <div class="cui-list-item__header">
                  Focused
                </div>
              </div>
            </div>
            <div class="cui-list-item cui-list-item--space disabled">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <div class="cui-avatar__letter">UI</div>
                </div>
              </div>
              <div class="cui-list-item__center">
                <div class="cui-list-item__header">
                  Disabled
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`}} />

              /* eslint-enable */
              }
            }
          