/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElement, html, internalProperty, LitElement, property } from "lit-element";
import { lumosDark, lumosLight, momentumDark, momentumLight } from "./index";

declare global {
  interface Window {
    ShadyCSS: {
      nativeShadow: boolean;
      prepareTemplate(template: HTMLTemplateElement, elementName: string, typeExtension?: string): void;
      styleElement(host: HTMLElement): void;
      ScopingShim: {
        prepareAdoptedCssText(cssTextArray: string[], elementName: string): void;
      };
    };
  }
  interface ShadowRoot {
    adoptedStyleSheets?: CSSStyleSheet[];
  }

  interface CSSStyleSheet {
    replaceSync: Function;
  }
}
export namespace Theme {
  export type Attributes = {
    darkTheme: boolean;
    mdTheme: boolean;
  };
}

@customElement("md-theme")
export class Theme extends LitElement {
  @property({ type: Boolean }) darkTheme = false;
  @property({ type: Boolean }) lumos = false;
  @internalProperty({}) private activeTheme = momentumLight;

  private setTheme() {
    if (this.lumos) {
      if (this.darkTheme) {
        return lumosDark;
      } else {
        return lumosLight;
      }
    } else {
      if (this.darkTheme) {
        return momentumDark;
      } else {
        return momentumLight;
      }
    }
  }

  applyStyle() {
    const shadow = this.shadowRoot as ShadowRoot;
    /* c8 ignore next 4 */
    if ("adoptedStyleSheets" in document) {
      const newTheme = new CSSStyleSheet();
      newTheme.replaceSync(this.activeTheme);
      shadow.adoptedStyleSheets = [newTheme];
    } else {
      const styleNode = document.createElement("style");
      styleNode.textContent = this.activeTheme.cssText;
      shadow.appendChild(styleNode);
    }
  }

  updated() {
    this.activeTheme = this.setTheme();
    this.applyStyle();
  }

  static get styles() {
    return [momentumLight];
  }

  render() {
    return html`
      <div class="theme-wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-theme": Theme;
  }
}
