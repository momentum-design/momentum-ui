
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="search-input-states">
   <div class="row default-state">
     <div class="medium-4 columns">
       <h4>Normal</h4>
     </div>
     <div class="cui-input-group cui-search-input medium-4 columns end">
       <input class="cui-input" id="default" name="default" type="text">
       <i class="icon icon-search_20"></i>
     </div>
   </div>
   <div class="row hover-state">
     <div class="medium-4 columns">
       <h4>Hover</h4>
     </div>
     <div class="cui-input-group cui-search-input medium-4 columns end">
       <input class="cui-input hover" id="hover" name="hover" type="text">
       <i class="icon icon-search_20"></i>
     </div>
   </div>
   <div class="row disabled-state">
     <div class="medium-4 columns">
       <h4>Disabled</h4>
     </div>
     <div class="cui-input-group cui-search-input medium-4 columns end">
       <input class="cui-input" id="disabled" name="disabled" type="text" disabled>
       <i class="icon icon-search_20"></i>
     </div>
   </div>
   <div class="row active-state">
     <div class="medium-4 columns">
       <h4>Active</h4>
     </div>
     <div class="cui-input-group cui-search-input medium-4 columns end">
       <input class="cui-input active" id="active" name="active" type="text">
       <i class="icon icon-search_20"></i>
     </div>
   </div>
   <div class="row focus-state">
     <div class="medium-4 columns">
       <h4>Focus</h4>
     </div>
     <div class="cui-input-group cui-search-input medium-4 columns end">
       <input class="cui-input focus" id="focus" name="focus" type="text">
       <i class="icon icon-search_20"></i>
     </div>
   </div>
   <div class="row normal-state">
     <div class="medium-4 columns">
       <h4>Normal with text</h4>
     </div>
     <div class="cui-input-group cui-search-input medium-4 columns end">
       <input class="cui-input active" id="normal" name="normal" type="text" value="Search Text">
       <i class="icon icon-search_20"></i>
     </div>
   </div>
   <div class="row default-state">
     <div class="medium-4 columns">
       <h4>Normal Pill</h4>
     </div>
     <div class="cui-input-group cui-search-input cui-search-input--pill medium-4 columns end">
       <input class="cui-input" id="default-pill" name="default-pill" type="text">
       <i class="icon icon-search_16"></i>
     </div>
   </div>
   <div class="row hover-state">
     <div class="medium-4 columns">
       <h4>Hover Pill</h4>
     </div>
     <div class="cui-input-group cui-search-input cui-search-input--pill medium-4 columns end">
       <input class="cui-input hover" id="hover-pill" name="-pill" type="text">
       <i class="icon icon-search_16"></i>
     </div>
   </div>
   <div class="row disabled-state">
     <div class="medium-4 columns">
       <h4>Disabled Pill</h4>
     </div>
     <div class="cui-input-group cui-search-input cui-search-input--pill medium-4 columns end">
       <input class="cui-input" id="disabled-pill" name="-pill" type="text" disabled>
       <i class="icon icon-search_16"></i>
     </div>
   </div>
   <div class="row active-state">
     <div class="medium-4 columns">
       <h4>Active Pill</h4>
     </div>
     <div class="cui-input-group cui-search-input cui-search-input--pill medium-4 columns end">
       <input class="cui-input active" id="active-pill" name="active-pill" type="text">
       <i class="icon icon-search_16"></i>
     </div>
   </div>
   <div class="row focus-state">
     <div class="medium-4 columns">
       <h4>Focus Pill</h4>
     </div>
     <div class="cui-input-group cui-search-input cui-search-input--pill medium-4 columns end">
       <input class="cui-input focus" id="focus-pill" name="focus-pill" type="text">
       <i class="icon icon-search_16"></i>
     </div>
   </div>
   <div class="row normal-state">
     <div class="medium-4 columns">
       <h4>Normal Pill with text</h4>
     </div>
     <div class="cui-input-group cui-search-input cui-search-input--pill medium-4 columns end">
       <input class="cui-input active" id="normal-pill-text" name="normal-pill-text" type="text" value="Search Text">
       <i class="icon icon-search_16"></i>
     </div>
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          