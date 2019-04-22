import { Component } from '@angular/core';

@Component({
  selector: 'example-topbar-light',
  template: `
    <header md-top-bar color="light" [fixed]="true">
      <ng-container
        *ngTemplateOutlet="brand"
        ngProjectAs="brand"
      ></ng-container>
      <md-top-bar-nav>
        <ng-container *ngTemplateOutlet="list"></ng-container>
      </md-top-bar-nav>
      <md-top-bar-right>
        <div class="md-top-bar__user"></div>
        <div class="md-top-bar__logged-out">
          <a href="javascript:void(0)">Log In</a>
          <button md-button color="blue" aria-label="myAriaLabel">
            Button
          </button>
        </div>
      </md-top-bar-right>
      <md-top-bar-mobile [shouldCloseOnClick]="false">
        <ng-container
          *ngTemplateOutlet="brand"
          ngProjectAs="brand"
        ></ng-container>
        <ng-container *ngTemplateOutlet="list"></ng-container>
      </md-top-bar-mobile>
    </header>

    <ng-template #brand>
      <a
        href="javascript:void(0)"
        md-top-bar-brand
        title="Collab UI"
        icon="icon-cisco-logo"
      ></a>
    </ng-template>

    <ng-template #list>
      <a md-list-item link="javascript:void(0)" [active]="true">Develop</a>
      <a md-list-item link="javascript:void(0)">Styles</a>
      <a md-list-item link="javascript:void(0)">Layout</a>
      <a md-list-item link="javascript:void(0)">Navigation</a>
    </ng-template>
  `,
})
export class ExampleTopbarLightComponent {}
