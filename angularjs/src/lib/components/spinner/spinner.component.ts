/**
* @name Spinners States
*
* @category communication
* @component loader-spinner
* @section states
* @hidecode true
*
* @html
  <div class="domd-example domd-example--spacing">
    <h3>Default <code class="small">md-spinner</code></h3>
    <md-spinner></md-spinner>
  </div>
  <div class="domd-example domd-example--spacing">
    <h3>Default <code class="small">md-spinner size:20</code></h3>
    <md-spinner size="20"></md-spinner>
  </div>
  <div class="domd-example domd-example--spacing">
    <h3>Default <code class="small">md-spinner size:28</code></h3>
    <md-spinner size="28"></md-spinner>
  </div>
  <div class="domd-example domd-example--spacing">
    <h3>Default <code class="small">md-spinner size:36</code></h3>
    <md-spinner size="36"></md-spinner>
  </div>
  <div class="domd-example domd-example--spacing">
    <h3>Blue <code class="small">md-spinner color:blue</code></h3>
    <md-spinner color="blue"></md-spinner>
  </div>
  <div class="domd-example domd-example--spacing">
    <h3>Blue <code class="small">md-spinner size:20 color:blue</code></h3>
    <md-spinner color="blue" size="20"></md-spinner>
  </div>
  <div class="domd-example domd-example--spacing">
    <h3>Blue <code class="small">md-spinner size:28 color:blue</code></h3>
    <md-spinner color="blue" size="28"></md-spinner>
  </div>
  <div class="domd-example domd-example--spacing">
    <h3>Blue <code class="small">md-spinner size:36 color:blue</code></h3>
    <md-spinner color="blue" size="36"></md-spinner>
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
    <i class="md-spinner" ng-class="[{'md-spinner--{{$ctrl.size}}': $ctrl.size, 'md-spinner--{{$ctrl.color}}': $ctrl.color}, $ctrl.spinnerClass]"></i>
  `;
  public bindings = {
    size: '@',
    color: '@',
    spinnerClass: '@',
  };
}
