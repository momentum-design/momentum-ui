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
       <cs-badge>Badge</cs-badge>
       <cs-badge color="blue">Blue</cs-badge>
       <cs-badge color="red">Red</cs-badge>
       <cs-badge color="yellow">Yellow</cs-badge>
       <cs-badge color="green">Green</cs-badge>
       <cs-badge color="mint">Mint</cs-badge>
       <cs-badge color="pastel">Mint</cs-badge>
       <cs-badge color="blue-pastel">Mint</cs-badge>
       <cs-badge color="red-pastel">Mint</cs-badge>
       <cs-badge color="yellow-pastel">Mint</cs-badge>
       <cs-badge color="green-pastel">Mint</cs-badge>
       <cs-badge color="mint-pastel">Mint</cs-badge>
     </div>
   </div>
   <div class="row outline-state">
     <div class="small-2 columns">
       <h4>Round</h4>
     </div>
     <div class="md-input-group small-10 end">
       <cs-badge outline="true">badge</cs-badge>
       <cs-badge outline="true" color="blue">blue</cs-badge>
       <cs-badge outline="true" color="red">red</cs-badge>
       <cs-badge outline="true" color="yellow">yellow</cs-badge>
       <cs-badge outline="true" color="green">green</cs-badge>
       <cs-badge outline="true" color="mint">mint</cs-badge>
       <cs-badge outline="true" color="pastel">pastel</cs-badge>
       <cs-badge outline="true" color="blue-pastel">blue-pastel</cs-badge>
       <cs-badge outline="true" color="red-pastel">red-pastel</cs-badge>
       <cs-badge outline="true" color="yellow-pastel">yellow-pastel</cs-badge>
       <cs-badge outline="true" color="green-pastel">green-pastel</cs-badge>
       <cs-badge outline="true" color="mint-pastel">mint-pastel</cs-badge>
     </div>
   </div>
   <div class="row round-state">
     <div class="small-2 columns">
       <h4>Round</h4>
     </div>
     <div class="md-input-group small-10 end">
       <cs-badge round="true">1</cs-badge>
       <cs-badge round="true" color="blue">2</cs-badge>
       <cs-badge round="true" color="red">3</cs-badge>
       <cs-badge round="true" color="yellow">4</cs-badge>
       <cs-badge round="true" color="green">5</cs-badge>
       <cs-badge round="true" color="mint">6</cs-badge>
       <cs-badge round="true" color="pastel">1</cs-badge>
       <cs-badge round="true" color="blue-pastel">2</cs-badge>
       <cs-badge round="true" color="red-pastel">3</cs-badge>
       <cs-badge round="true" color="yellow-pastel">4</cs-badge>
       <cs-badge round="true" color="green-pastel">5</cs-badge>
       <cs-badge round="true" color="mint-pastel">6</cs-badge>
     </div>
   <div class="row round-outline-state">
     <div class="small-2 columns">
       <h4>Round</h4>
     </div>
     <div class="md-input-group small-10 end">
       <cs-badge round="true" outline="true">1</cs-badge>
       <cs-badge round="true" outline="true" color="blue">2</cs-badge>
       <cs-badge round="true" outline="true" color="red">3</cs-badge>
       <cs-badge round="true" outline="true" color="yellow">4</cs-badge>
       <cs-badge round="true" outline="true" color="green">5</cs-badge>
       <cs-badge round="true" outline="true" color="mint">6</cs-badge>
       <cs-badge round="true" outline="true" color="pastel">1</cs-badge>
       <cs-badge round="true" outline="true" color="blue-pastel">2</cs-badge>
       <cs-badge round="true" outline="true" color="red-pastel">3</cs-badge>
       <cs-badge round="true" outline="true" color="yellow-pastel">4</cs-badge>
       <cs-badge round="true" outline="true" color="green-pastel">5</cs-badge>
       <cs-badge round="true" outline="true" color="mint-pastel">6</cs-badge>
     </div>
   </div>
   </div>
*/
