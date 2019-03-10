export interface ITopNavItem {
  id: number;
  name: string;
  translation?: string;
  path?: string;
  link?: string;
  subRoutes?: Array<ITopNavItem>;
}

export class TopNavComponent implements ng.IComponentOptions {
  public template = `
    <nav>
      <ul>
        <li ng-repeat="item in $ctrl.navItems">
          <a ui-sref="{{item.path}}" ui-sref-active="active">{{item.name}}</a>
        </li>
      </ul>
    </nav>
  `;
  public bindings: { [binding: string]: string } = {
    navItems: '<',
  };
  public controller = TopNav;
}

export class TopNav {
  public navItems: Array<ITopNavItem>;
}
