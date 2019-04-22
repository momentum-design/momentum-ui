/** @component badge */

export class BadgeComponent implements ng.IComponentOptions {
  public template = `
    <span class="md-badge" ng-class="{'md-badge--round': $ctrl.isRounded === 'true', 'md-badge--{{$ctrl.color}}': $ctrl.color, 'md-badge--outline': $ctrl.hasOutline === 'true' }" >
      <ng-transclude></ng-transclude>
    </span>
  `;
  public transclude = true;
  public bindings = {
    isRounded: '@round',
    hasOutline: '@outline',
    color: '@',
  };
}

/*
* @component badge
* @section default
*
*
 @html
   <div class="row default-state">
     <div class="small-2 columns">
       <h4>Colors</h4>
     </div>
     <div class="md-input-group small-10 end">
       <md-badge>Badge</md-badge>
       <md-badge color="blue">Blue</md-badge>
       <md-badge color="red">Red</md-badge>
       <md-badge color="yellow">Yellow</md-badge>
       <md-badge color="green">Green</md-badge>
       <md-badge color="mint">Mint</md-badge>
       <md-badge color="pastel">Mint</md-badge>
       <md-badge color="blue-pastel">Mint</md-badge>
       <md-badge color="red-pastel">Mint</md-badge>
       <md-badge color="yellow-pastel">Mint</md-badge>
       <md-badge color="green-pastel">Mint</md-badge>
       <md-badge color="mint-pastel">Mint</md-badge>
     </div>
   </div>
   <div class="row outline-state">
     <div class="small-2 columns">
       <h4>Round</h4>
     </div>
     <div class="md-input-group small-10 end">
       <md-badge outline="true">badge</md-badge>
       <md-badge outline="true" color="blue">blue</md-badge>
       <md-badge outline="true" color="red">red</md-badge>
       <md-badge outline="true" color="yellow">yellow</md-badge>
       <md-badge outline="true" color="green">green</md-badge>
       <md-badge outline="true" color="mint">mint</md-badge>
       <md-badge outline="true" color="pastel">pastel</md-badge>
       <md-badge outline="true" color="blue-pastel">blue-pastel</md-badge>
       <md-badge outline="true" color="red-pastel">red-pastel</md-badge>
       <md-badge outline="true" color="yellow-pastel">yellow-pastel</md-badge>
       <md-badge outline="true" color="green-pastel">green-pastel</md-badge>
       <md-badge outline="true" color="mint-pastel">mint-pastel</md-badge>
     </div>
   </div>
   <div class="row round-state">
     <div class="small-2 columns">
       <h4>Round</h4>
     </div>
     <div class="md-input-group small-10 end">
       <md-badge round="true">1</md-badge>
       <md-badge round="true" color="blue">2</md-badge>
       <md-badge round="true" color="red">3</md-badge>
       <md-badge round="true" color="yellow">4</md-badge>
       <md-badge round="true" color="green">5</md-badge>
       <md-badge round="true" color="mint">6</md-badge>
       <md-badge round="true" color="pastel">1</md-badge>
       <md-badge round="true" color="blue-pastel">2</md-badge>
       <md-badge round="true" color="red-pastel">3</md-badge>
       <md-badge round="true" color="yellow-pastel">4</md-badge>
       <md-badge round="true" color="green-pastel">5</md-badge>
       <md-badge round="true" color="mint-pastel">6</md-badge>
     </div>
   <div class="row round-outline-state">
     <div class="small-2 columns">
       <h4>Round</h4>
     </div>
     <div class="md-input-group small-10 end">
       <md-badge round="true" outline="true">1</md-badge>
       <md-badge round="true" outline="true" color="blue">2</md-badge>
       <md-badge round="true" outline="true" color="red">3</md-badge>
       <md-badge round="true" outline="true" color="yellow">4</md-badge>
       <md-badge round="true" outline="true" color="green">5</md-badge>
       <md-badge round="true" outline="true" color="mint">6</md-badge>
       <md-badge round="true" outline="true" color="pastel">1</md-badge>
       <md-badge round="true" outline="true" color="blue-pastel">2</md-badge>
       <md-badge round="true" outline="true" color="red-pastel">3</md-badge>
       <md-badge round="true" outline="true" color="yellow-pastel">4</md-badge>
       <md-badge round="true" outline="true" color="green-pastel">5</md-badge>
       <md-badge round="true" outline="true" color="mint-pastel">6</md-badge>
     </div>
   </div>
   </div>
*/
