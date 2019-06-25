import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarNavItemComponent } from '../sidebar-nav-item/sidebar-nav-item.component';
import { SidebarNavService } from './sidebar-nav.service';

@Component({
  selector: 'md-sidebar-nav',
  template: `
    <div
      class="md-sidebar-nav"
      [ngClass]="{
        'md-sidebar-nav--header': title
      }"
    >
      <div *ngIf="title" class="md-sidebar-nav__header">
        {{ title }}
      </div>

      <div
        class="md-list md-sidebar-nav__group md-sidebar-nav__group--primary"
        [ngClass]="[listClass]"
        role="list"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [],
  providers: [SidebarNavService],
})
export class SidebarNavComponent implements AfterContentInit, OnDestroy {
  /** @prop Optional string to be used for Section Title | ''  */
  @Input() title: string = '';
  /** @prop Optional css class string with md-list | ''  */
  @Input() listClass: string = '';

  // Need descendants true to include nested nav items
  @ContentChildren(SidebarNavItemComponent, { descendants: true }) navItemLists: QueryList<
    SidebarNavItemComponent
  >;

  public navItems: SidebarNavItemComponent[] = [];
  private subs = new Subscription();

  constructor(private sidebarNavService: SidebarNavService) {}

  ngAfterContentInit() {
    this.sidebarNavService.setSidebarNavItems(this.navItemLists.toArray());

    this.subs.add(
      this.navItemLists.changes.subscribe(navItems => {
        this.sidebarNavService.setSidebarNavItems(navItems.toArray());
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
