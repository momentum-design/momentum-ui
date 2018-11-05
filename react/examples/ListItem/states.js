
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `  <div class="list-states">
    <div class="row default-state">
      <div class="medium-12 row">
        <div class="medium-6 columns">
          <h4 class="text-center">Normal</h4>
          <div class="cui-list cui-list--vertical">
            <div class="cui-list-item">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <span class="cui-avatar__letter">M</span>
                </div>
              </div>
              <div class="cui-list-item__center">Normal</div>
            </div>
            <div class="cui-list-item hover">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <span class="cui-avatar__letter">M</span>
                </div>
              </div>
              <div class="cui-list-item__center">Hover</div>
            </div>
            <div class="cui-list-item active">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <span class="cui-avatar__letter">M</span>
                </div>
              </div>
              <div class="cui-list-item__center">Pressed</div>
            </div>
            <div class="cui-list-item focus">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <span class="cui-avatar__letter">M</span>
                </div>
              </div>
              <div class="cui-list-item__center">Focus</div>
            </div>
            <div class="cui-list-item disabled">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <span class="cui-avatar__letter">M</span>
                </div>
              </div>
              <div class="cui-list-item__center">Disabled</div>
            </div>
            <div class="cui-list-item">
              <div class="cui-list-item__left">
                <div class="cui-avatar">
                  <div class="cui-avatar__letter">UI</div>
                </div>
              </div>
              <div class="cui-list-item__center">
                <div class="cui-list-item__header">Normal</div>
                <div class="cui-list-item__subheader">Subheader</div>
              </div>
            </div>
            <div class="cui-list-item">
              <div class="cui-list-item__left">
                <div class="icon icon-record_20"></div>
              </div>
              <div class="cui-list-item__center">Normal Icon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`}} />

              /* eslint-enable */
              }
            }
          