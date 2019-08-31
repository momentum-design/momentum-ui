import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AvatarComponent } from '../avatar';

@NgModule({
  imports: [BrowserModule],
  entryComponents: [AvatarComponent],
})
export class AvatarElementModule {
  constructor(injector: Injector) {
    const element = createCustomElement(AvatarComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('avatar-element', element);
  }
}
