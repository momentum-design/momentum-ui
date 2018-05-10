import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <docs-header title="Panels"></docs-header>
    <div class="row">
      <cui-card size="4" type="nav">
        <a routerLink="/panels/signin/1">
          <h4>Sign In 1.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/signin/2">
          <h4>Sign In 2.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/signin/3-2">
          <h4>Sign In 3.2</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/signin/4">
          <h4>Sign In 4.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/signup/1">
          <h4>Sign Up 1.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/signup/4">
          <h4>Sign Up 4.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/password-reset/1">
          <h4>Password Reset 1.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/password-reset/3">
          <h4>Password Reset 3.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/password-reset/5-1">
          <h4>Password Reset 5.1</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/error/1">
          <h4>Error Message 1.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/error/2">
          <h4>Error Message 2.0</h4>
        </a>
      </cui-card>
      <cui-card size="4" type="nav">
        <a routerLink="/panels/error/404">
          <h4>404 Not Found</h4>
        </a>
      </cui-card>
    </div>
  `,
})
export class PanelsComponent {}
