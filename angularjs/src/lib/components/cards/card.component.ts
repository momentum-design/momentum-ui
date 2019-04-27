/** @component card */
import * as angular from 'angular';
import * as Masonry from 'masonry-layout';
import * as imagesLoaded from 'imagesloaded';

export class CardLayout implements ng.IDirective {
  private blockView: boolean;
  constructor(private $timeout: ng.ITimeoutService) {}

  public restrict: string = 'EA';
  public transclude: boolean = true;
  public scope = {
    blockView: '=',
  };
  public replace: boolean = true;
  public controller: any = angular.noop;
  public controllerAs: string = 'op';
  public bindToController: boolean = true;
  public template: string = `<div ng-transclude class="md-card-layout"
                              ng-class="{'md-card-block': op.blockView === true}">
                              </div>`;
  public link: ng.IDirectiveLinkFn = (_scope: ng.IScope, _element: ng.IAugmentedJQuery, _attrs: ng.IAttributes) => {
    this.blockView = _attrs.blockView || false;
    if (!this.blockView) {
      this.$timeout(function() {
        let $cardlayout;
        let cardElement = document.querySelector('.md-card-layout');
        if (cardElement) {
          imagesLoaded(cardElement, () => {
            $cardlayout = new Masonry(cardElement, {
              itemSelector: '.md-card',
              columnWidth: '.md-card',
              resize: true,
              percentPosition: true,
            });
          });
        }
      });
    }
  };
}

cardLayoutFactory.$inject = ['$timeout'];
export function cardLayoutFactory($timeout) {
  return new CardLayout($timeout);
}

export class CardCtrl implements ng.IComponentController {
  public menuOpen: boolean;

  constructor() {
    this.menuOpen = false;
  }

  public toggleSettings(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
    } else {
      this.menuOpen = true;
    }
  }

  public getMenuStatus(): boolean {
    return this.menuOpen;
  }
}

export class Card implements ng.IDirective {
  public restrict: string = 'EA';
  public template: string = `<div ng-transclude class="md-card"></div>`;
  public transclude: boolean = true;
  public replace: boolean = true;
  public controller: any = CardCtrl;
  public controllerAs: string = 'cc';
  public bindToController: boolean = true;

  constructor() {}

  public static factory() {
    return new Card();
  }
}

export class CardMenuCtrl implements ng.IComponentController {
  private menuOpen: boolean;
  public mdCardCtrl: any;

  constructor(private $scope: ng.IScope) {
    this.menuOpen = false;
  }

  public $onInit(): void {
    this.$scope.$watch('cm.mdCardCtrl.menuOpen', () => {
      this.menuOpen = this.mdCardCtrl.getMenuStatus();
    });
  }

  public toggleSettings(): void {
    this.mdCardCtrl.toggleSettings();
    this.menuOpen = this.mdCardCtrl.getMenuStatus();
  }
}

export class CardMenu implements ng.IDirective {
  public restrict: string = 'EA';
  public require: { [controller: string]: string } = {
    mdCardCtrl: '^mdCard',
  };
  public scope = {
    menutitle: '=',
  };
  public template: string = `
    <section class="card-menu" ng-class="{ open: cm.menuOpen === true }">
      <div class="card-menu-heading">
        <span>{{cm.menutitle}}</span>
        <button type="button" class="md-button md-button--none md-close" ng-click="cm.toggleSettings()"><span class="sr-only">Close</span></button>
      </div>
      <div ng-transclude></div>
    </section>
  `;
  public transclude: boolean = true;
  public replace: boolean = true;
  public controller: any = CardMenuCtrl;
  public controllerAs: string = 'cm';
  public bindToController: boolean = true;

  constructor() {}

  public static factory() {
    return new CardMenu();
  }
}

export class CardMenuFooterCtrl implements ng.IComponentController {
  private menuOpen: boolean;
  public mdCardCtrl: any;
  constructor() {
    this.menuOpen = false;
  }

  public toggleSettings(): void {
    this.mdCardCtrl.toggleSettings();
    this.menuOpen = this.mdCardCtrl.getMenuStatus();
  }
}

export class CardMenuFooter implements ng.IDirective {
  public restrict: string = 'EA';
  public require: { [controller: string]: string } = {
    mdCardCtrl: '^mdCard',
  };
  public scope = {
    icon: '=',
  };
  public template: string = `
    <footer class="footer-menu">
    <span class="footer-content" ng-transclude></span>
    <span class="footer-icons">
      <i class="menu-icon icon" ng-class="cfm.icon != undefined ? 'icon-{{cfm.icon}}' :'icon-settings'" ng-click="cfm.toggleSettings()"></i>
    </span>
  </footer>
  `;
  public transclude: boolean = true;
  public replace: boolean = true;
  public controller: any = CardMenuFooterCtrl;
  public controllerAs: string = 'cfm';
  public bindToController: boolean = true;

  constructor() {}

  public static factory() {
    return new CardMenuFooter();
  }
}
