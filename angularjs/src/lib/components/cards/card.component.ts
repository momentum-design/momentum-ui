/** @component card */
import * as angular from 'angular';
import * as Masonry from 'masonry-layout';
import * as imagesLoaded from 'imagesloaded';

export class CardLayout implements ng.IDirective {
  /**
   * Usage: <cs-card-layout></cs-card-layout>
   */
  private blockView: boolean;
  constructor(
    private $timeout: ng.ITimeoutService,
  ) { }

  public restrict: string = 'EA';
  public transclude: boolean = true;
  public scope = {
    blockView: '=',
  };
  public replace: boolean = true;
  public controller: any = angular.noop;
  public controllerAs: string = 'op';
  public bindToController: boolean = true;
  public template: string = `<div ng-transclude class="cui-card-layout"
                              ng-class="{'cui-card-block': op.blockView === true}">
                              </div>`;
  public link: ng.IDirectiveLinkFn = (
    _scope: ng.IScope,
    _element: ng.IAugmentedJQuery,
    _attrs: ng.IAttributes,
  ) => {
    this.blockView = _attrs.blockView || false;
    if (!this.blockView) {
      this.$timeout(function () {
        let $cardlayout;
        let cardElement = document.querySelector('.cui-card-layout');
        if (cardElement) {
          imagesLoaded(cardElement, () => {
            $cardlayout = new Masonry(cardElement, {
              itemSelector: '.cui-card',
              columnWidth: '.cui-card',
              resize: true,
              percentPosition: true,
            });
          });
        }
      });
    }
  };

  /* @ngInject */
  public static factory($timeout) {
    return new CardLayout($timeout);
  }
}

export class CardCtrl implements ng.IComponentController {
  public menuOpen: boolean;

  constructor() {
    this.menuOpen = false;
  }

  public toggleSettings (): void {
    if (this.menuOpen) {
      this.menuOpen = false;
    } else {
      this.menuOpen = true;
    }
  }

  public getMenuStatus (): boolean {
    return this.menuOpen;
  }

}

export class Card implements ng.IDirective {
  /**
   * Usage: <cs-card></cs-card>
   */
  public restrict: string = 'EA';
  public template: string = `<div ng-transclude class="cui-card"></div>`;
  public transclude: boolean = true;
  public replace: boolean = true;
  public controller: any = CardCtrl;
  public controllerAs: string = 'cc';
  public bindToController: boolean = true;

  constructor() {}

  /* @ngInject */
  public static factory() {
    return new Card();
  }
}

export class CardMenuCtrl implements ng.IComponentController {
  private menuOpen: boolean;
  public csCardCtrl: any;

  constructor (
    private $scope: ng.IScope
  ) {
    this.menuOpen = false;
  }

  public $onInit(): void {
    this.$scope.$watch('cm.csCardCtrl.menuOpen', () => {
      this.menuOpen = this.csCardCtrl.getMenuStatus();
    });
  }

  public toggleSettings(): void {
    this.csCardCtrl.toggleSettings();
    this.menuOpen = this.csCardCtrl.getMenuStatus();
  }
}

export class CardMenu implements ng.IDirective {
//
 // Usage: <cs-card-menu></cs-card-menu>
 // @param cardMenuTitle - The title dispayed in the menu header
 //
  public restrict: string = 'EA';
  public require: { [controller: string]: string } = {
    csCardCtrl: '^csCard',
  };
  public scope = {
    menutitle: '=',
  };
  public template: string = `
    <section class="card-menu" ng-class="{ open: cm.menuOpen === true }">
      <div class="card-menu-heading">
        <span>{{cm.menutitle}}</span>
        <button type="button" class="cui-button cui-button--none cui-close" ng-click="cm.toggleSettings()"><span class="sr-only">Close</span></button>
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

  // @ngInject
  public static factory() {
    return new CardMenu();
  }
}

export class CardMenuFooterCtrl implements ng.IComponentController {
  private menuOpen: boolean;
  public csCardCtrl: any;
  constructor() {
    this.menuOpen = false;
  }

  public toggleSettings(): void {
    this.csCardCtrl.toggleSettings();
    this.menuOpen = this.csCardCtrl.getMenuStatus();
  }
}

export class CardMenuFooter implements ng.IDirective {
  //
  // Usage: <cs-card-menu-footer></cs-card-menu-footer>
  //
  public restrict: string = 'EA';
  public require: { [controller: string]: string } = {
    csCardCtrl: '^csCard',
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

  // @ngInject
  public static factory() {
    return new CardMenuFooter();
  }
}

/**
* @component card
* @section default
*
* @html
<cs-card>
    <article>
        <section>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </section>
    </article>
</cs-card>
*/

/**
* @component card
* @section masonry
*
* @html
<div class="cui-card-container" ng-controller="masonryExampleController as cd">
  <cs-card-layout>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Header</h4>
        </header>
        <section>
          <p>CARD 1 Boudin landjaeger pork frankfurter prosciutto sirloin flank cow tri-tip filet mignon. Brisket alcatra biltong
            andouille, shoulder beef ribs strip steak salami venison meatball sausage ball tip. Salami picanha spare ribs, flank
            jowl ham hock tail fatback meatloaf cow chicken drumstick. Short loin doner tongue pork alcatra flank. T-bone picanha
            hamburger, kielbasa boudin meatloaf bacon capicola turkey salami swine shoulder flank. Short loin porchetta chicken,
            spare ribs doner kevin meatball t-bone pancetta filet mignon turducken andouille venison pork chop. Cow brisket tail
            spare ribs cupim corned beef. Biltong sirloin swine pork belly strip steak shank. Ground round leberkas beef, shankle
            drumstick ball tip porchetta biltong. Porchetta pancetta pork chop kevin filet mignon ham alcatra andouille shank fatback
            short loin sirloin pork belly drumstick chicken. Tri-tip shank brisket, jerky pork chop meatball tenderloin beef shankle
            leberkas pastrami doner capicola pork loin. Pork shank porchetta andouille doner flank spare ribs pancetta drumstick
            swine short ribs meatloaf meatball. Turkey spare ribs ball tip venison shank picanha sausage fatback pig kielbasa tongue.
            Jerky ribeye spare ribs, tenderloin meatloaf meatball shoulder boudin. Meatloaf leberkas turkey salami, cow short ribs
            rump shoulder chicken frankfurter.</p>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Header</h4>
        </header>
        <section>
          <p>CARD 2 Bacon ipsum dolor amet cow corned beef deserunt shankle officia esse non jowl chicken capicola. Elit chuck enim
            ground round pig. Do kevin adipisicing chuck sausage nisi. Sausage flank tongue in. Voluptate swine chicken jowl meatloaf
            veniam boudin turkey nulla pastrami mollit. Bresaola ground round qui, tempor pork loin proident commodo corned beef
            ball tip fatback ipsum shank reprehenderit. Ham qui salami chuck voluptate, pork chop meatball t-bone ut capicola sint.
            Dolore swine nulla, picanha fugiat leberkas mollit qui. Dolore in veniam flank non minim nulla pork chop salami tri-tip
            jowl brisket ut shoulder. Veniam tri-tip id laboris capicola salami, laborum sunt ad shankle ipsum labore ham. Ea doner
            sint fugiat. Esse bresaola pork chop t-bone, pork loin frankfurter turducken magna andouille short loin swine excepteur
            kevin pastrami ball tip. Ball tip id ut quis, culpa spare ribs ipsum picanha. Pariatur exercitation pork loin sirloin
            swine sausage ex tenderloin ham non. Nostrud ex aliquip dolore laboris short ribs cupim capicola kielbasa ground round
            magna in shoulder dolore voluptate. Alcatra pork chop ut exercitation. Consectetur ea enim, tenderloin chuck meatloaf
            occaecat cow drumstick. Shoulder bacon aliqua jerky, beef ribs frankfurter doner laborum dolore boudin. Commodo sed
            aliquip nostrud.</p>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Header</h4>
        </header>
        <section>
          <p>CARD 3 Qui non ea, sed cillum magna bresaola. Tail ut pork chop minim excepteur nostrud, dolor quis exercitation pariatur
            laboris. Aute exercitation kevin leberkas ut. Ipsum aute minim salami drumstick. Shankle spare ribs biltong officia
            laboris. Duis salami ham, aliqua meatball officia sirloin consequat jowl ad.</p>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Header</h4>
        </header>
        <section>
          <p>CARD 4 Culpa magna ullamco est dolore chuck ham hock, qui sirloin ut short loin spare ribs in. Boudin tri-tip ut, meatball
            pork ribeye rump short loin aliquip voluptate. Do sirloin ex, officia doner picanha pork belly shankle. Ham nisi kielbasa,
            enim mollit meatball picanha jowl nulla sint est consectetur. Consequat pork loin sint, ball tip hamburger doner fugiat
            mollit bacon aliqua laboris. Ut picanha rump commodo, t-bone bacon labore elit et laborum in fugiat. Sed ut incididunt,
            ad corned beef chicken turducken. Magna laborum non reprehenderit bresaola shank fugiat veniam bacon incididunt nulla
            ham hock tenderloin. Esse culpa et sunt. Spare ribs swine cillum do commodo. Ad nostrud culpa anim leberkas. Incididunt
            pariatur elit, in tenderloin qui deserunt culpa jowl flank quis. Pork belly est brisket, cow short ribs hamburger tenderloin
            turducken non fatback in aliquip frankfurter ribeye. Adipisicing enim ut ut kevin aliquip alcatra chicken frankfurter
            nisi jowl incididunt. Pancetta eu porchetta, pork belly corned beef short loin pastrami beef spare ribs lorem jowl
            meatloaf ham hock. Culpa proident alcatra ham hock sunt occaecat mollit ut id, est laboris meatball pork belly beef
            ribs.</p>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Header</h4>
        </header>
        <section>
          <p>CARD 5 Sed ut incididunt, ad corned beef chicken turducken. Magna laborum non reprehenderit bresaola shank fugiat veniam
            bacon incididunt nulla ham hock tenderloin. Esse culpa et sunt. Spare ribs swine cillum do commodo.</p>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Header</h4>
        </header>
        <section>
          <p>CARD 6 Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!</p>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Header</h4>
        </header>
        <section>
          <p>CARD 7 Pariatur exercitation pork loin sirloin swine sausage ex tenderloin ham non. Nostrud ex aliquip dolore laboris
            short ribs cupim capicola kielbasa ground round magna in shoulder dolore voluptate. Alcatra pork chop ut exercitation.
            Consectetur ea enim, tenderloin chuck meatloaf occaecat cow drumstick. Shoulder bacon aliqua jerky, beef ribs frankfurter
            doner laborum dolore boudin. Commodo sed aliquip nostrud. Qui non ea, sed cillum magna bresaola. Tail ut pork chop
            minim excepteur nostrud, dolor quis exercitation pariatur laboris. Aute exercitation kevin leberkas ut. Ipsum aute
            minim salami drumstick. Shankle spare ribs biltong officia laboris. Duis salami ham, aliqua meatball officia sirloin
            consequat jowl ad. Culpa magna ullamco est dolore chuck ham hock, qui sirloin ut short loin spare ribs in. Boudin tri-tip
            ut, meatball pork ribeye rump short loin aliquip voluptate. Do sirloin ex, officia doner picanha pork belly shankle.
            Ham nisi kielbasa, enim mollit meatball picanha jowl nulla sint est consectetur. Consequat pork loin sint, ball tip
            hamburger doner fugiat mollit bacon aliqua laboris. Ut picanha rump commodo, t-bone bacon labore elit et laborum in
            fugiat. Sed ut incididunt, ad corned beef chicken turducken. Magna laborum non reprehenderit bresaola shank fugiat
            veniam bacon incididunt nulla ham hock tenderloin. Esse culpa et sunt. Spare ribs swine cillum do commodo. Ad nostrud
            culpa anim leberkas. Incididunt pariatur elit, in tenderloin qui deserunt culpa jowl flank quis. Pork belly est brisket,
            cow short ribs hamburger tenderloin turducken non fatback in aliquip frankfurter ribeye. Adipisicing enim ut ut kevin
            aliquip alcatra chicken frankfurter nisi jowl incididunt. Pancetta eu porchetta, pork belly corned beef short loin
            pastrami beef spare ribs lorem jowl meatloaf ham hock. Culpa proident alcatra ham hock sunt occaecat mollit ut id,
            est laboris meatball pork belly beef ribs.</p>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Header</h4>
        </header>
        <section>
          <p>CARD 8 Ribeye pork chop in ground round. Biltong ham hock corned beef kielbasa jerky nostrud bresaola. Ham spare ribs
            pancetta, alcatra velit commodo capicola pariatur qui aliquip venison tri-tip. Salami qui flank dolore, pork chop shankle
            quis corned beef bacon anim brisket pancetta. Tail ham hock capicola in, eiusmod t-bone cupim est jerky reprehenderit
            pig. Duis fatback short ribs ullamco drumstick id tenderloin pork chop sunt shank jowl ea quis shoulder. Ex esse brisket
            kielbasa cupidatat pork loin ullamco aliquip nulla velit magna. Does your lorem ipsum text long for something a little
            meatier? Give our generator a try… it’s tasty!</p>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>List</h4>
        </header>
        <section>
          <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Coca Cola</li>
          </ul>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium section-background">
      <article>
        <header>
          <h4>Checkboxes</h4>
        </header>
        <section>
          <div class="card-checkbox">
            <cs-checkbox ckid="ckbox1" ng-model="cb.checkboxValue0" label="Checkbox 1"></cs-checkbox>
            <cs-checkbox ckid="ckbox2" ng-model="cb.checkboxValue1" label="Checkbox 2"></cs-checkbox>
            <cs-checkbox ckid="ckbox3" ng-model="cb.checkboxValue2" label="Checkbox 3"></cs-checkbox>
            <cs-checkbox ckid="ckbox4" ng-model="cb.checkboxValue3" label="Checkbox 4"></cs-checkbox>
          </div>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium header-background">
      <article>
        <header class="align-center"><img src="images/cards/intelpeer.png" alt="Intelepeerlogo"></header>
        <section>
          <h4>IntelePeer Pro</h4>
          <div class="card-checkbox">
            <cs-checkbox ckid="ckbox1" ng-model="cb.checkboxValue0" label="Lorem ipsum dolor sit amet"></cs-checkbox>
            <cs-checkbox ckid="ckbox2" ng-model="cb.checkboxValue1" label="Consectetur adipiscing"></cs-checkbox>
            <cs-checkbox ckid="ckbox3" ng-model="cb.checkboxValue2" label="Donec viverra risus et urna rhoncus"></cs-checkbox>
            <cs-checkbox ckid="ckbox4" ng-model="cb.checkboxValue3" label="Fusce sit amet orci"></cs-checkbox>
          </div>
        </section>
        <footer class="text-center">
          <button>Select</button>
        </footer>
      </article>
    </cs-card>
    <cs-card class="medium section-background">
      <article>
        <header>
          <h4>Radio Buttons</h4>
        </header>
        <section>
          <div class="card-radio" ng-controller="RadioDirectiveExampleController as individualRadio">
            <form name="myRadioForm">
              <div class="cui-radio-group">
                <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio1" name="individualRadio" value="1" cs-input-label="Radio Example 1">
                <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio2" name="individualRadio" value="2" cs-input-label="Radio Example 2">
                <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio3" name="individualRadio" value="3" cs-input-label="Radio Example 3"
                  cs-input-help-text="This is help text for the cs-input radio">
                <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio4" name="individualRadio" value="4" cs-input-label="Radio Example 4"
                  cs-input-help-text="This is help text for the cs-input radio">
              </div>
            </form>
          </div>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium header-bar">
      <article>
        <header class="align-center">
          <h4><img src="images/cards/webexLogo.png" alt="Webex Logo"> WebEx</h4>
        </header>
        <section>
          <p>Duis dictum rutrum elementum. Donec placera ultricies venenatis. Aliquam mauris. Lorem ipsum dolor sit amet, consectetur.</p>
          <div class="card-button">
            <button>site_Name1.webex.com</button>
            <button>site_Name2.webex.com</button>
            <button>site_Name3.webex.com</button>
          </div>
        </section>
        <footer class="text-center">
          <a href="">View More</a>
        </footer>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <section>
          <div class="service-card">
            <div class="left-side">
              <div class="service-name">
                <img src="images/cards/webexLogo.png" alt="Webex Logo" />
                <span>WebEx</span>
              </div>
            </div>
            <div class="right-side">
              <div class="overview-title">MEETINGS</div>
              <div class="overview-count current">27,998</div>
              <div class="overview-time current">This month</div>
              <div class="overview-count last">28,469</div>
              <div class="overview-time last">Last month</div>
            </div>
          </div>
        </section>
        <cs-card-menu-footer icon="cd.icon">
          <i class="icon icon-circle"></i>
          <span>Excellent</span>
        </cs-card-menu-footer>
        <cs-card-menu menutitle="cd.menutitle">
          <ul class="service-menu-list no-bullet">
            <li><a class="service-menu-item" href="">pg_event.webex.com</a></li>
            <li><a class="service-menu-item" href="">pg_finance.webex.com</a></li>
            <li><a class="service-menu-item" href="">pg_marketing.webex.com</a></li>
            <li><a class="service-menu-item" href="">pg_operations.webex.com</a></li>
          </ul>
        </cs-card-menu>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>Card header</h4>
        </header>
        <section class="section-img">
          <img src="images/cards/cardsample.png" alt="example image">
          <p>You can put other content under the image in the section</p>
        </section>
        <footer class="text-center">
          <button>Push Me</button>
        </footer>
      </article>
    </cs-card>
    <cs-card class="medium header-img">
      <article>
        <header>
          <img src="images/cards/cardsample.png" alt="example image">
        </header>
        <section>
          <p>Image is in the header. You can still put stuff in the section</p>
        </section>
        <footer class="text-center">
          <button>Push Me</button>
        </footer>
      </article>
    </cs-card>
    <cs-card class="medium">
      <article>
        <header>
          <h4>List</h4>
        </header>
        <section>
          <ul ng-repeat="quote in cd.listofStuff">
            <li>{{quote}}</li>
          </ul>
        </section>
      </article>
    </cs-card>
  </cs-card-layout>
</div>
*/

/**
* @component card
* @section block-layout
*
* @html
<div class="cs-card-container">
  <cs-card-layout block-view="true">
    <cs-card class="medium">
      <article>
        <header>
          <h4>List</h4>
        </header>
        <section>
          <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Coca Cola</li>
          </ul>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium section-background">
      <article>
        <header>
          <h4>Checkboxes</h4>
        </header>
        <section>
          <div class="card-checkbox">
            <cs-checkbox ckid="ckbox1" ng-model="cb.checkboxValue0" label="Checkbox 1"></cs-checkbox>
            <cs-checkbox ckid="ckbox2" ng-model="cb.checkboxValue1" label="Checkbox 2"></cs-checkbox>
            <cs-checkbox ckid="ckbox3" ng-model="cb.checkboxValue2" label="Checkbox 3"></cs-checkbox>
            <cs-checkbox ckid="ckbox4" ng-model="cb.checkboxValue3" label="Checkbox 4"></cs-checkbox>
          </div>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium header-background">
      <article>
        <header class="align-center"><img src="images/cards/intelpeer.png" alt="Intelepeerlogo"></header>
        <section>
          <h4>IntelePeer Pro</h4>
          <div class="card-checkbox">
            <cs-checkbox ckid="ckbox1" ng-model="cb.checkboxValue0" label="Lorem ipsum dolor sit amet"></cs-checkbox>
            <cs-checkbox ckid="ckbox2" ng-model="cb.checkboxValue1" label="Consectetur adipiscing"></cs-checkbox>
            <cs-checkbox ckid="ckbox3" ng-model="cb.checkboxValue2" label="Donec viverra risus et urna rhoncus"></cs-checkbox>
            <cs-checkbox ckid="ckbox4" ng-model="cb.checkboxValue3" label="Fusce sit amet orci"></cs-checkbox>
          </div>
        </section>
        <footer class="text-center">
          <button>Select</button>
        </footer>
      </article>
    </cs-card>
    <cs-card class="medium section-background">
      <article>
        <header>
          <h4>Radio Buttons</h4>
        </header>
        <section>
          <div class="card-radio" ng-controller="RadioDirectiveExampleController as individualRadio">
            <form name="myRadioForm">
              <div class="cui-input-group cui-input-radio">
                <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio1" name="individualRadio" value="1" cs-input-label="Radio Example 1">
                <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio2" name="individualRadio" value="2" cs-input-label="Radio Example 2">
                <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio3" name="individualRadio" value="3" cs-input-label="Radio Example 3"
                  cs-input-help-text="This is help text for the cs-input radio">
                <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio4" name="individualRadio" value="4" cs-input-label="Radio Example 4"
                  cs-input-help-text="This is help text for the cs-input radio">
              </div>
            </form>
          </div>
        </section>
      </article>
    </cs-card>
    <cs-card class="medium header-bar">
      <article>
        <header class="align-center">
          <h4><img src="images/cards/webexLogo.png" alt="Webex Logo"> WebEx</h4>
        </header>
        <section>
          <p>Duis dictum rutrum elementum. Donec placera ultricies venenatis. Aliquam mauris. Lorem ipsum dolor sit amet, consectetur.</p>
          <div class="card-button">
            <button>site_Name1.webex.com</button>
            <button>site_Name2.webex.com</button>
            <button>site_Name3.webex.com</button>
          </div>
        </section>
        <footer class="text-center">
          <a href="">VIEW MORE</a>
        </footer>
      </article>
    </cs-card>
    <cs-card class="small header-background primary">
      <article>
        <header>
          <div class="header-with-right-icon">
            <h5 class="ellipsis" title="reallylongHuntGroupName"> reallylongHuntGroupName</h5>
            <span dropdown>
                        <a class="cui-button cui-button--none card-action-btn" >
                          <i class="icon icon-three-dots"></i>
                        </a>
                      </span>
          </div>
        </header>
        <section>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </section>
        <footer>
          <span class="pull-right card-circle-icon">AA</span>
        </footer>
      </article>
    </cs-card>
  </cs-card-layout>
</div>
*/

/**
* @component card
* @section card-sizes
*
* @html
<cs-card-layout>
    <cs-card class="small">
        <article>
            <header>
                <h4>Small Card - 4 across</h4></header>
            <section>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </section>
        </article>
    </cs-card>
    <cs-card class="medium">
        <article>
            <header>
                <h4>Medium Card 3 across</h4></header>
            <section>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </section>
        </article>
    </cs-card>
    <cs-card class="large">
        <article>
            <header>
                <h4>Large Card 2 across</h4></header>
            <section>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </section>
        </article>
    </cs-card>
    <cs-card class="full">
        <article>
            <header>
                <h4>Full Card 1 across</h4></header>
            <section>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </section>
        </article>
    </cs-card>
</cs-card-layout>
*/

/**
* @component card
* @section header
*
* @html
<cs-card class="medium">
    <article>
        <header>
            <h4>Header</h4></header>
        <section>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
        </section>
    </article>
</cs-card>
*/

/**
* @component card
* @section header-borders
*
* @html
<cs-card class="medium header-border">
    <article>
        <header>
            <h4>Header Border</h4></header>
        <section>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
        </section>
    </article>
</cs-card>
*/

/**
* @component card
* @section header-background
*
* @html
<cs-card class="medium header-background">
    <article>
        <header>
            <h4>Header</h4></header>
        <section>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
        </section>
    </article>
</cs-card>
*/

/**
* @component card
* @section header-background-colors
*
* @html
<cs-card-layout>
    <cs-card class="small header-background primary">
        <article>
            <header>
                 <div class="header-with-right-icon">
                    <h5 class="ellipsis" title="reallylongHuntGroupName"> reallylongHuntGroupName</h5>
                    <span  dropdown>
                      <a class="cui-button cui-button--none card-action-btn" >
                        <i class="icon icon-three-dots"></i>
                      </a>
                    </span>
                  </div>
              </header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="small header-background gray">
        <article>
            <header>
                <div class="header-with-right-icon">
                  <h5 class="ellipsis">GroupName</h5>
                  <span  dropdown>
                    <button class="cui-button cui-button--none card-action-btn" >
                      <i class="icon icon-three-dots"></i>
                    </button>
                  </span>
                </div>
            </header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="small header-background people">
        <article>
            <header>
                <h5>Header</h5></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="small header-background meetings">
        <article>
            <header>
                <h5>Header</h5></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="small header-background eggplant">
        <article>
            <header>
                <h5>Header</h5></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="small header-background negative">
        <article>
            <header>
                <h5>Header</h5></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="small header-background cta">
        <article>
            <header>
                <h5>Header</h5></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="small header-background attention">
        <article>
            <header>
                <h5>Header</h5></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="small header-background alerts">
        <article>
            <header>
                <h5>Header</h5></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
</cs-card-layout>
*/

/**
* @component card
* @section header-bar
*
* @html
<cs-card class="medium header-bar">
    <article>
        <header>
            <h4>Header</h4></header>
        <section>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
        </section>
    </article>
</cs-card>
*/

/**
* @component card
* @section header-alignment
*
* @html
<cs-card-layout>
    <cs-card class="medium header-border">
        <article>
            <header>
                <h4>To the Left</h4></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="medium header-border">
        <article>
            <header class="align-center">
                <h4>Centered</h4></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
        </article>
    </cs-card>
</cs-card-layout>
*/

/**
* @component card
* @section without-a-header
*
* @html
<cs-card  class="medium">
    <article>
        <section>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
        </section>
        <footer class="text-center">
            <a href="">VIEW MORE</a>
        </footer>
    </article>
</cs-card >
*/

/**
* @component card
* @section section-background
*
* @html
<cs-card-layout>
    <cs-card class="medium">
        <article>
            <header>
                <h4>Section White</h4></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
            </section>
        </article>
    </cs-card>
    <cs-card class="medium section-background">
        <article>
            <header>
                <h4>Section Gray</h4></header>
            <section>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
            </section>
        </article>
    </cs-card>
</cs-card-layout>
*/

/**
* @component card
* @section section-content
*
* @html
<cs-card-layout>
  <cs-card class="medium">
    <article>
      <header>
        <h4>List</h4>
      </header>
      <section>
        <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Coca Cola</li>
        </ul>
      </section>
    </article>
  </cs-card>
  <cs-card class="medium section-background">
    <article>
      <header>
        <h4>Checkboxes</h4>
      </header>
      <section>
        <div class="card-checkbox">
          <cs-checkbox ckid="ckbox1" ng-model="cb.checkboxValue0" label="Checkbox 1"></cs-checkbox>
          <cs-checkbox ckid="ckbox2" ng-model="cb.checkboxValue1" label="Checkbox 2"></cs-checkbox>
          <cs-checkbox ckid="ckbox3" ng-model="cb.checkboxValue2" label="Checkbox 3"></cs-checkbox>
          <cs-checkbox ckid="ckbox4" ng-model="cb.checkboxValue3" label="Checkbox 4"></cs-checkbox>
        </div>
      </section>
    </article>
  </cs-card>
  <cs-card class="medium header-background">
    <article>
      <header class="align-center"><img src="images/cards/intelpeer.png" alt="Intelepeerlogo"></header>
      <section>
        <h4>IntelePeer Pro</h4>
        <div class="card-checkbox">
          <cs-checkbox ckid="ckbox1" ng-model="cb.checkboxValue0" label="Lorem ipsum dolor sit amet"></cs-checkbox>
          <cs-checkbox ckid="ckbox2" ng-model="cb.checkboxValue1" label="Consectetur adipiscing"></cs-checkbox>
          <cs-checkbox ckid="ckbox3" ng-model="cb.checkboxValue2" label="Donec viverra risus et urna rhoncus"></cs-checkbox>
          <cs-checkbox ckid="ckbox4" ng-model="cb.checkboxValue3" label="Fusce sit amet orci"></cs-checkbox>
        </div>
      </section>
      <footer class="text-center">
        <button>Select</button>
      </footer>
    </article>
  </cs-card>
  <cs-card class="medium section-background">
    <article>
      <header>
        <h4>Radio Buttons</h4>
      </header>
      <section>
        <div class="card-radio" ng-controller="RadioDirectiveExampleController as individualRadio">
          <form name="myRadioForm">
            <div class="cui-radio-group">
              <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio1" name="individualRadio" value="1" cs-input-label="Radio Example 1">
              <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio2" name="individualRadio" value="2" cs-input-label="Radio Example 2">
              <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio3" name="individualRadio" value="3" cs-input-label="Radio Example 3"
                cs-input-help-text="This is help text for the cs-input radio">
              <input cs-input type="radio" ng-model="individualRadio.model" id="individualRadio4" name="individualRadio" value="4" cs-input-label="Radio Example 4"
                cs-input-help-text="This is help text for the cs-input radio">
            </div>
          </form>
        </div>
      </section>
    </article>
  </cs-card>
  <cs-card class="medium header-bar">
    <article>
      <header class="align-center">
        <h4><img src="images/cards/webexLogo.png" alt="Webex Logo"> WebEx</h4>
      </header>
      <section>
        <p>Duis dictum rutrum elementum. Donec placera ultricies venenatis. Aliquam mauris. Lorem ipsum dolor sit amet, consectetur.</p>
        <div class="card-button">
          <button>site_Name1.webex.com</button>
          <button>site_Name2.webex.com</button>
          <button>site_Name3.webex.com</button>
        </div>
      </section>
      <footer class="text-center">
        <a href="">View More</a>
      </footer>
    </article>
  </cs-card>
  <cs-card class="medium header-bar">
    <article>
      <header class="align-center">
        <h4><img src="images/cards/webexLogo.png" alt="Webex Logo"> WebEx</h4>
      </header>
      <section>
        <p>Duis dictum rutrum elementum. Donec placera ultricies venenatis. Aliquam mauris. Lorem ipsum dolor sit amet, consectetur.</p>

      </section>
      <footer class="text-center">
        <div class="cui-button-group text-center" dropdown is-open="db.isOpen">
          <button type="button" class="cui-button cui-button--blue dropdown-toggle" ng-disabled="db.disabled">
                    Button dropdown <span class="caret"></span>
                </button>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </div>
      </footer>
    </article>
  </cs-card>
</cs-card-layout>
*/

/**
* @component card
* @section cards-with-images
*
* @html
<cs-card-layout>
    <cs-card class="medium">
        <article>
            <header>
                <h4>Card header</h4></header>
            <section class="section-img">
                <img src="images/cards/cardsample.png" alt="example image">
                <p>You can put other content under the image in the section</p>
            </section>
            <footer class="text-center">
                <button>Push Me</button>
            </footer>
        </article>
    </cs-card>
    <cs-card class="medium header-img">
        <article>
            <header>
                <img src="images/cards/cardsample.png" alt="example image">
            </header>
            <section>
                <p>Image is in the header. You can still put stuff in the section</p>
            </section>
            <footer class="text-center">
                <button>Push Me</button>
            </footer>
        </article>
    </cs-card>
</cs-card-layout>
*/

/**
* @component card
* @section cards-with-menu
*
* @html
<div ng-controller="cardwithmenuExampleController as cd">
    <cs-card class="medium menu-card header-bar people overview-card">
        <article>
            <header>
                <div class="overview-header"><i class="icon icon-circle-call"></i>Call</div>
            </header>
            <section>
                <div class="overview-info">
                    <div>Total Calls</div>
                    <div class="overview-count">875</div>
                    <div>Last Month: 302</div>
                </div>
            </section>
            <cs-card-menu-footer class="overview-footer-content-trial">
                <span class="label warning">Trial</span>
                <i class="icon icon-circle"></i>
            </cs-card-menu-footer>
            <cs-card-menu menutitle="cd.menutitle">
                <ul class="service-menu-list no-bullet">
                    <li>
                        <a class="service-menu-item" href="">item 1</a>
                    </li>
                    <li>
                        <a class="service-menu-item" href="">item 2</a>
                    </li>
                </ul>
            </cs-card-menu>
        </article>
    </cs-card>
</div>
*
* @js
* (function () {
*  'use strict';
*
*  angular
*    .module('app.containers')
*    .controller('cardwithmenuExampleController', cardwithmenuExampleController);
*
* function cardwithmenuExampleController() {
*    var vm = this;
*    vm.icon = 'settings';
*    vm.menutitle = 'SETTINGS';
*
*  }
*})();
*/

/**
* @component card
* @section configure-services-card
*
* @html
<cs-card-layout block-view="true">
    <cs-card class="full header-background">
        <article>
            <header>
                <h4>pg_marketing.webex.com</h4>
            </header>
            <section>
                <div class="configure-card">
                    <div class="left-side">
                        <div class="service-name">
                            <!-- <img src="images/cards/webexLogo.png" alt="Webex Logo"/> -->
                            <img src="images/cards/webex_logo_48px.png" alt="Webex Logo" />
                            <span>WebEx</span>
                        </div>
                    </div>
                    <div class="right-side">
                        <div class="configure-card-heading">HOST ACCOUNTS</div>
                        <div class="configure-content">
                            <div class="text-center">
                                <div class="overview-count">204</div>
                                <div>Active</div>
                            </div>
                            <div class="text-center">
                                <div class="overview-count">6</div>
                                <div>Available</div>
                            </div>
                            <div class="overview-icon text-center">
                                <a><i class="icon icon-circle-webex" /></a>
                                <a>Site Information</a>
                            </div>
                            <div class="overview-icon text-center">
                                <a><i class="icon icon-circle-star" /></a>
                                <a>Site Features</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </cs-card>
</cs-card-layout>
*/


