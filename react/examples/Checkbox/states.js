
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `  <div class="checkbox-states medium-4 columns">
    <h3>Light</h3>
    <h5><code>.cui-checkbox</code></h5>
    <div class="checkbox-states">
      <div class="disabled-unchecked-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input" disabled>
          <label class="cui-checkbox__label">
            <span>Disabled & Unchecked</span>
          </label>
        </div>
      </div>
      <div class="unchecked-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input">
          <label class="cui-checkbox__label">
            <span>Unchecked</span>
          </label>
        </div>
      </div>
      <div class="hover-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input">
          <label class="cui-checkbox__label hover">
            <span>Hover Unchecked</span>
          </label>
        </div>
      </div>
      <div class="focus-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input focus">
          <label class="cui-checkbox__label">
            <span>Focus Unchecked</span>
          </label>
        </div>
      </div>
      <div class="disabled-checked-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input" disabled checked>
          <label class="cui-checkbox__label">
            <span>Disabled & Checked</span>
          </label>
        </div>
      </div>
      <div class="checked-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input" checked>
          <label class="cui-checkbox__label">
            <span>Checked</span>
          </label>
        </div>
      </div>
      <div class="checked-hover-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input" checked>
          <label class="cui-checkbox__label hover">
            <span>Hover Checked</span>
          </label>
        </div>
      </div>
      <div class="checked-focus-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input focus" checked>
          <label class="cui-checkbox__label">
            <span>Focus Checked</span>
          </label>
        </div>
      </div>
      <div class="disabled-indeterminate-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input indeterminate" disabled indeterminate>
          <label class="cui-checkbox__label">
            <span>Disabled & Indeterminate</span>
          </label>
        </div>
      </div>
      <div class="indeterminate-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input indeterminate" indeterminate>
          <label class="cui-checkbox__label">
            <span>Indeterminate</span>
          </label>
        </div>
      </div>
      <div class="indeterminate-hover-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input indeterminate" indeterminate>
          <label class="cui-checkbox__label hover">
            <span>Indeterminate Hover</span>
          </label>
        </div>
      </div>
      <div class="indeterminate-focus-state">
        <div class="cui-input-group cui-checkbox">
          <input type="checkbox" class="cui-input cui-checkbox__input focus indeterminate" indeterminate>
          <label class="cui-checkbox__label">
            <span>Indeterminate Focus</span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="checkbox-states medium-4 end columns cui--dark" style="background-color: #333333;">
    <h3 style="color: white;">Dark</h3>
    <h5><code style="color: white; line-break">.cui--dark</code></h5>
    <div class="disabled-unchecked-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input" disabled>
        <label class="cui-checkbox__label">
          <span>Disabled & Unchecked</span>
        </label>
      </div>
    </div>
    <div class="unchecked-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input">
        <label class="cui-checkbox__label">
          <span>Unchecked</span>
        </label>
      </div>
    </div>
    <div class="hover-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input">
        <label class="cui-checkbox__label hover">
          <span>Hover Unchecked</span>
        </label>
      </div>
    </div>
    <div class="focus-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input focus">
        <label class="cui-checkbox__label">
          <span>Focus Unchecked</span>
        </label>
      </div>
    </div>
    <div class="disabled-checked-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input" disabled checked>
        <label class="cui-checkbox__label">
          <span>Disabled & Checked</span>
        </label>
      </div>
    </div>
    <div class="checked-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input" checked>
        <label class="cui-checkbox__label">
          <span>Checked</span>
        </label>
      </div>
    </div>
    <div class="checked-hover-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input" checked>
        <label class="cui-checkbox__label hover">
          <span>Hover Checked</span>
        </label>
      </div>
    </div>
    <div class="checked-focus-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input focus" checked>
        <label class="cui-checkbox__label">
          <span>Focus Checked</span>
        </label>
      </div>
    </div>
    <div class="disabled-indeterminate-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input indeterminate" disabled indeterminate>
        <label class="cui-checkbox__label">
          <span>Disabled & Indeterminate</span>
        </label>
      </div>
    </div>
    <div class="indeterminate-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input indeterminate" indeterminate>
        <label class="cui-checkbox__label">
          <span>Indeterminate</span>
        </label>
      </div>
    </div>
    <div class="indeterminate-hover-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input indeterminate" indeterminate>
        <label class="cui-checkbox__label hover">
          <span>Indeterminate Hover</span>
        </label>
      </div>
    </div>
    <div class="indeterminate-focus-state">
      <div class="cui-input-group cui-checkbox">
        <input type="checkbox" class="cui-input cui-checkbox__input focus indeterminate" indeterminate>
        <label class="cui-checkbox__label">
          <span>Indeterminate Focus</span>
        </label>
      </div>
    </div>
  </div>`}} />

              /* eslint-enable */
              }
            }
          