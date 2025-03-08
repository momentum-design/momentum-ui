/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, PropertyValues } from "lit-element";
import { score } from "wcag-color";

@customElementWithCheck("sass-stats")
export class SassStats extends LitElement {
  @property({ type: String }) component = "";
  @property({ type: String }) size = "";
  @property({ type: String }) gzipSize = "";
  @property({ type: String }) selectors = "";
  @property({ type: String }) declarations = "";
  @property({ type: Array }) repeatedSelectors = [];

  static get styles() {
    return [reset];
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.loopInstances(this.querySelectorAll("*"));
  }

  private loopInstances(instances: NodeListOf<Element>) {
    for (const element of instances) {
      if (element !== undefined) {
        this.getContrast(element).catch((err) => err);
      }
    }
  }

  private getContrast(element: Element) {
    return new Promise<void>((resolve, reject) => {
      if (element.shadowRoot) {
        const shadowContent = element.shadowRoot.querySelector("*:not(style)")!;
        const style = getComputedStyle(shadowContent);
        const backgroundColor = style.backgroundColor;
        const foreground = style.color;
        const ratioScore = score(backgroundColor, foreground);
        shadowContent.setAttribute("data-contrastScore", `Contrast Score: ${ratioScore}`);
        shadowContent.setAttribute("data-bgcolor", `bg color: ${backgroundColor}`);
        shadowContent.setAttribute("data-textcolor", `text color: ${foreground}`);
        resolve();
      } else reject(Error("Invalid Instance"));
    });
  }

  private formatNumber(number: string) {
    const fixedNumber = parseFloat(number).toFixed(2);
    return Number(fixedNumber).toLocaleString("en");
  }

  private async fetchComponentStats() {
    const response = await fetch(`/stats/${this.component}.json`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchComponentStats()
      .then((data) => {
        const { humanizedSize, humanizedGzipSize, selectors, declarations } = data;
        this.size = humanizedSize;
        this.gzipSize = humanizedGzipSize;
        this.selectors = this.formatNumber(selectors.total);
        this.declarations = this.formatNumber(declarations.total);
        this.repeatedSelectors = selectors.repeated.length;
      })
      .catch((error) => error);
  }

  render() {
    return html`
      <style>
        .stat-output {
          font-weight: bold;
        }
      </style>
      <h4 class="stat-output">Sass Stats</h4>
      <p>Compiled CSS Size: <span class="stat-output">${this.size}</span></p>
      <p>Compiled CSS Gzip Size: <span class="stat-output">${this.gzipSize}</span></p>
      <p>Total # of Selectors: <span class="stat-output">${this.selectors}</span></p>
      <p>Total # of Declarations: <span class="stat-output">${this.declarations}</span></p>
      <p>Repeated Selectors: <span class="stat-output">${this.repeatedSelectors}</span></p>
      <p>Inspect custom elements for contrast ratio score <i>(experimental)</i></p>
      <slot title="Component Sandbox"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sass-stats": SassStats;
  }
}
