
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="toggle-switch-states">
   <div class="row disabled-unchecked-state">
     <div class="medium-4 columns">
       <h4>Disabled & Unchecked</h4>
     </div>
     <div class="cui-input-group medium-6 columns end">
       <div class="cui-toggle-switch">
         <input type="checkbox" class="cui-input cui-toggle-switch__input" id="toggleSwitchDisabled" disabled>
         <label class="cui-toggle-switch__label" for="toggleSwitchDisabled">
           <span class="cui-toggle-switch__label__container"></span>
           <span class="cui-toggle-switch__label__text">Label</span>
         </label>
       </div>
     </div>
   </div>
   <div class="row unchecked-state">
     <div class="medium-4 columns">
       <h4>Unchecked</h4>
     </div>
     <div class="cui-input-group medium-6 columns end">
       <div class="cui-toggle-switch">
         <input type="checkbox" class="cui-input cui-toggle-switch__input" id="toggleSwitchUnchecked">
         <label class="cui-toggle-switch__label" for="toggleSwitchUnchecked">
           <span class="cui-toggle-switch__label__container"></span>
           <span class="cui-toggle-switch__label__text">Label</span>
         </label>
       </div>
     </div>
   </div>
   <div class="row hover-state">
     <div class="medium-4 columns">
       <h4>Hover Unchecked</h4>
     </div>
     <div class="cui-input-group medium-6 columns end">
       <div class="cui-toggle-switch">
         <input type="checkbox" class="cui-input cui-toggle-switch__input" id="toggleSwitchHoverUnchecked">
         <label class="cui-toggle-switch__label hover" for="toggleSwitchHoverUnchecked">
           <span class="cui-toggle-switch__label__container"></span>
           <span class="cui-toggle-switch__label__text">Label</span>
         </label>
       </div>
     </div>
   </div>
   <div class="row focus-state">
     <div class="medium-4 columns">
       <h4>Focus Unchecked</h4>
     </div>
     <div class="cui-input-group medium-6 columns end">
       <div class="cui-toggle-switch">
         <input type="checkbox" class="cui-input cui-toggle-switch__input focus" id="toggleSwitchFocusUnchecked">
         <label class="cui-toggle-switch__label" for="toggleSwitchFocusUnchecked">
           <span class="cui-toggle-switch__label__container"></span>
           <span class="cui-toggle-switch__label__text">Label</span>
         </label>
       </div>
     </div>
   </div>
   <div class="row disabled-checked-state">
     <div class="medium-4 columns">
       <h4>Disabled & Checked</h4>
     </div>
     <div class="cui-input-group medium-6 columns end">
       <div class="cui-toggle-switch">
         <input type="checkbox" class="cui-input cui-toggle-switch__input" id="toggleSwitchDisabledChecked" checked disabled>
         <label class="cui-toggle-switch__label" for="toggleSwitchDisabledChecked">
           <span class="cui-toggle-switch__label__container"></span>
           <span class="cui-toggle-switch__label__text">Label</span>
         </label>
       </div>
     </div>
   </div>
   <div class="row checked-state">
     <div class="medium-4 columns">
       <h4>Checked</h4>
     </div>
     <div class="cui-input-group medium-6 columns end">
       <div class="cui-toggle-switch">
         <input type="checkbox" class="cui-input cui-toggle-switch__input" id="toggleSwitchChecked" checked>
         <label class="cui-toggle-switch__label" for="toggleSwitchChecked">
           <span class="cui-toggle-switch__label__container"></span>
           <span class="cui-toggle-switch__label__text">Label</span>
         </label>
       </div>
     </div>
   </div>
   <div class="row checked-hover-state">
     <div class="medium-4 columns">
       <h4>Hover Checked</h4>
     </div>
     <div class="cui-input-group medium-6 columns end">
       <div class="cui-toggle-switch">
         <input type="checkbox" class="cui-input cui-toggle-switch__input" id="toggleSwitchHoverChecked" checked>
         <label class="cui-toggle-switch__label hover" for="toggleSwitchHoverChecked">
           <span class="cui-toggle-switch__label__container"></span>
           <span class="cui-toggle-switch__label__text">Label</span>
         </label>
       </div>
     </div>
   </div>
   <div class="row checked-focus-state">
     <div class="medium-4 columns">
       <h4>Focus Checked</h4>
     </div>
     <div class="cui-input-group medium-6 columns end">
       <div class="cui-toggle-switch">
         <input type="checkbox" class="cui-input cui-toggle-switch__input focus" id="toggleSwitchFocusChecked" checked>
         <label class="cui-toggle-switch__label" for="toggleSwitchFocusChecked">
           <span class="cui-toggle-switch__label__container"></span>
           <span class="cui-toggle-switch__label__text">Label</span>
         </label>
       </div>
     </div>
   </div>
 <div>`}} />

              /* eslint-enable */
              }
            }
          