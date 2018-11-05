
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `<div class="cui-input-group cui--dark">
  <div class="search-input-states medium-8" style="padding-top: 1rem; background-color:rgba(40,40,40,0.72);">
    <div class="row default-state">
      <div class="medium-12 columns end">
        <div class="cui-input-group cui-select">
          <div class="cui-event-overlay cui-event-overlay--bottom" style="position: relative; width: 100%;">
            <div class="cui-event-overlay__children" style="position: relative; width: 100%;">
              <div class="cui-list" role="list" style="width: 100%;">
                <div class="cui-list-item active" role="listItem" tabindex="0" aria-current="true">test1</div>
                <div class="cui-list-item" role="listItem" tabindex="-1" aria-current="false">test2</div>
                <div class="cui-list-item" role="listItem" tabindex="-1" aria-current="false">test3</div>
                <div class="cui-list-item" role="listItem" tabindex="-1" aria-current="false">test4</div>
              </div>
            </div>
          </div>
          <button class="cui-button cui-button--small cui-button--input" type="button" role="" tabindex="0" name="cui-select-1" id="cui-select-1" aria-haspopup="listbox" aria-labelledby="cui-select-1__label">
            <div class="cui-select__label" id="cui-select-1__label">
              test4<i class="icon icon-arrow-down_20"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>`}} />

              /* eslint-enable */
              }
            }
          