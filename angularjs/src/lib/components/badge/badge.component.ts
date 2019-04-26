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
