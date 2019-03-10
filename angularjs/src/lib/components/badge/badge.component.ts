/**
* @category communication
* @component badge
*/
export class BadgeCtrl implements ng.IComponentController {
  private isRounded: string;
  private color: string;
}

export class BadgeComponent implements ng.IComponentOptions {
  public controller = BadgeCtrl;
  public template = `
    <span class="cui-badge" ng-class="{'cui-badge--round': $ctrl.isRounded === 'true', 'cui-badge--{{$ctrl.color}}': $ctrl.color}" >
      <ng-transclude></ng-transclude>
    </span>
  `;
  public transclude = true;
  public bindings = {
    isRounded: '@round',
    color: '@'
  };
}

/*
* @name badge
* @description
* @category communication
* @component badge
* @section basic
*
*
 @html
   <div class="row default-state">
     <div class="small-2 columns">
       <h4>Colors</h4>
     </div>
     <div class="cui-input-group small-10 end">
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
   <div class="row round-state">
     <div class="small-2 columns">
       <h4>Round</h4>
     </div>
     <div class="cui-input-group small-10 end">
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
   </div>
*/

