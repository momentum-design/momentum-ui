/** @component alert-banner */
import * as angular from 'angular';

export class AlertBannerCtrl implements ng.IComponentController {
  private closed: boolean;
  private type: string;
  private canBeClosed: boolean;
  private closeable: string;
  private onCloseFn?: Function;

  constructor () {
    this.closed = false;
    this.canBeClosed = this.closeable === 'true';
  }

  public $onInit(): void {
    if (!angular.isDefined(this.type)) {
      this.type = 'info';
    }
  }

  public close(): void {
    this.closed = true;
    if (angular.isFunction(this.onCloseFn)) {
      this.onCloseFn();
    }
  }
}

export class AlertBannerComponent implements ng.IComponentOptions {
  public controller = AlertBannerCtrl;
  public template = `
    <div ng-if="!$ctrl.closed" class="md-alert-banner md-alert-banner--{{$ctrl.type}}">
      <div class='row'>
        <div class="columns medium-1"></div>
        <div class="md-alert-banner__text columns medium-10" ng-transclude></div>
        <div class="columns medium-1"></div>
      </div>
      <button class="md-alert-banner__close" ng-if="$ctrl.canBeClosed" ng-click="$ctrl.close()">
        <i class="icon icon-close"></i>
      </button>
    </div>
  `;
  public bindings = {
    type: '@',
    closeable: '@',
    onCloseFn: '&?',
  };
  public transclude = true;
}

/**
* @component alert-banner
* @section default
*
* @param type - info
* @param closable - boolean (false)
* @html
* <md-alert-banner type="info" closeable="true">Special announcement with a <a>call to action</a></md-alert-banner>
*/

/**
* @component alert-banner
* @section warning
*
* @param type - warning
*
* @html
* <md-alert-banner type="warning">You are in Read-Only mode, <a>learn more</a></md-alert-banner>
*/

/**
* @component alert-banner
* @section error
*
* @param type - danger
*
* @html
* <md-alert-banner type="danger">This critical announcement that has a lot of copy that breaks onto a new line which is centered and has a max width and a <a>call to action</a></md-alert-banner>
*/
