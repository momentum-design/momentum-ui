import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TopBarComponent, TopBarRightComponent, TopNavComponent } from '@collab-ui/angular';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public appTitle = 'Collab UI';
  public appIcon = 'icon-cisco-logo';
  public navItems = [
    {
      id: 0,
      name: 'Develop',
      path: '/develop'
    }, {
      id: 1,
      name: 'Styles',
      path: '/styles'
    }, {
      id: 2,
      name: 'Layout',
      path: '/layout'
    }, {
      id: 3,
      name: 'Navigation',
      path: '/navigation'
    }, {
      id: 4,
      name: 'Containers',
      path: '/containers'
    }, {
      id: 5,
      name: 'Controls',
      path: '/controls'
    }, {
      id: 6,
      name: 'Communication',
      path: '/communication'
    }

  ];
  public libraryIcon = '/assets/html-css.png';
  public libraryName = 'Collab UI Core (HTML/CSS)';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
       (window as any).ga('set', 'page', event.urlAfterRedirects);
       (window as any).ga('send', 'pageview');
     }
   });
 }
}
