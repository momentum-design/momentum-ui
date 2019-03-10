/**
* @name Spinners States
*
* @category communication
* @component loader-spinner
* @section states
* @hidecode true
*
* @html
  <div class="docs-example docs-example--spacing">
    <h3>Default <code class="small">cs-spinner</code></h3>
    <cs-spinner></cs-spinner>
  </div>
  <div class="docs-example docs-example--spacing">
    <h3>Default <code class="small">cs-spinner size:20</code></h3>
    <cs-spinner size="20"></cs-spinner>
  </div>
  <div class="docs-example docs-example--spacing">
    <h3>Default <code class="small">cs-spinner size:28</code></h3>
    <cs-spinner size="28"></cs-spinner>
  </div>
  <div class="docs-example docs-example--spacing">
    <h3>Default <code class="small">cs-spinner size:36</code></h3>
    <cs-spinner size="36"></cs-spinner>
  </div>
  <div class="docs-example docs-example--spacing">
    <h3>Blue <code class="small">cs-spinner color:blue</code></h3>
    <cs-spinner color="blue"></cs-spinner>
  </div>
  <div class="docs-example docs-example--spacing">
    <h3>Blue <code class="small">cs-spinner size:20 color:blue</code></h3>
    <cs-spinner color="blue" size="20"></cs-spinner>
  </div>
  <div class="docs-example docs-example--spacing">
    <h3>Blue <code class="small">cs-spinner size:28 color:blue</code></h3>
    <cs-spinner color="blue" size="28"></cs-spinner>
  </div>
  <div class="docs-example docs-example--spacing">
    <h3>Blue <code class="small">cs-spinner size:36 color:blue</code></h3>
    <cs-spinner color="blue" size="36"></cs-spinner>
  </div>
*
*
*/

/**
* @component spinner
* @category communication
*/
export class SpinnerCtrl implements ng.IComponentController {
  public size?: string;
  public color?: string;

  public $onInit() {
    this.size = this.size ? this.size : '20';
    this.color = this.color ? this.color : 'blue';
  }
}

export class SpinnerComponent implements ng.IComponentOptions {
  public controller = SpinnerCtrl;
  public template = `
    <i class="cui-spinner" ng-class="[{'cui-spinner--{{$ctrl.size}}': $ctrl.size, 'cui-spinner--{{$ctrl.color}}': $ctrl.color}, $ctrl.spinnerClass]"></i>
  `;
  public bindings = {
    size: '@',
    color: '@',
    spinnerClass: '@',
  };
}
