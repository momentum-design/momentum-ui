import { Component } from '@angular/core';

@Component({
  selector: 'example-topbar-blue',
  template: `
    <header cui-top-bar color="blue">
      <ng-container *ngTemplateOutlet="brand" ngProjectAs="brand"></ng-container>
      <cui-top-bar-nav>
        <ng-container *ngTemplateOutlet="list"></ng-container>
      </cui-top-bar-nav>
      <cui-top-bar-right>
        <div class="cui-top-bar__user">
        </div>
        <div class="cui-top-bar__logged-out">
          <a href="javascript:void(0)">Log In</a>
          <button cui-button color="blue" aria-label="myAriaLabel">Button</button>
        </div>
      </cui-top-bar-right>
      <cui-top-bar-mobile [shouldCloseOnClick]="false">
        <ng-container *ngTemplateOutlet="brand" ngProjectAs="brand"></ng-container>
        <ng-container *ngTemplateOutlet="list"></ng-container>
      </cui-top-bar-mobile>
    </header>

    <ng-template #brand>
      <a href="javascript:void(0)" cui-top-bar-brand
      title="Collab UI"
      icon="icon-cisco-logo"
      ></a>
    </ng-template>

    <ng-template #list>
      <a cui-list-item link="javascript:void(0)" [active]="true">Develop</a>
      <a cui-list-item link="javascript:void(0)">Styles</a>
      <a cui-list-item link="javascript:void(0)">Layout</a>
      <a cui-list-item link="javascript:void(0)">Navigation</a>
    </ng-template>
  `,
})
export class ExampleTopbarBlueComponent { }
