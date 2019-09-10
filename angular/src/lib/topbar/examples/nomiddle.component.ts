import { Component } from '@angular/core';

@Component({
  selector: 'example-topbar-nomiddle',
  template: `
    <header md-top-bar color="light" [fixed]="true">
      <ng-container
        *ngTemplateOutlet="brand"
        ngProjectAs="brand"
      ></ng-container>
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
      </md-top-bar-mobile>
    </header>

    <ng-template #brand>
      <a
        href="javascript:void(0)"
        md-top-bar-brand
        title="Momentum UI"
        icon="icon-cisco-logo"
      ></a>
    </ng-template>

  `,
})
export class ExampleTopbarNomiddleComponent {}
