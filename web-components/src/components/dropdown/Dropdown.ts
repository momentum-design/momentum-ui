import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElement, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { html } from "lit-html";
import { repeat } from "lit-html/directives/repeat.js";
import { styleMap } from "lit-html/directives/style-map";
import styles from "./scss/module.scss";

type OptionMember = { [key: string]: string };
type RenderOptionMember = { key: string; value: string };

@customElement("md-dropdown")
export class Dropdown extends FocusMixin(LitElement) {
  @property({ type: String }) label = "Select...";
  @property({ type: Array }) options: (string | OptionMember)[] = [];

  @internalProperty() renderOptions: RenderOptionMember[] = [];
  @internalProperty() isExpanded = false;

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    changedProperties.forEach((oldValue, name) => {
      if (name === "options") {
        const existingKeys: string[] = [];

        this.renderOptions = this.options.reduce((acc, opt) => {
          const key = typeof opt === "string" ? opt.trim() : Object.keys(opt as OptionMember)[0];
          const value = typeof opt === "string" ? opt : Object.values(opt as OptionMember)[0];
          if (existingKeys.indexOf(key) !== -1) {
            console.error(`Dropdown already have option key: "${key}". Ignoring `);
          } else {
            existingKeys.push(key);
            acc.push({ key, value });
          }
          return acc;
        }, [] as RenderOptionMember[]);
      }
    });
  }

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <div class="md-dropdown">
        <select class="md-dropdown-select">
          ${repeat(
            this.renderOptions,
            o => o.key,
            o => html`
              <option value="${o.key}">${o.value}</option>
            `
          )}
        </select>
        <label class="md-dropdown-label" @click="${() => console.log("CLICK")}">
          ${this.label}
        </label>
        <ul class="md-dropdown-list" style="${styleMap({ display: this.isExpanded ? "block" : "none" })}">
          ${repeat(
            this.renderOptions,
            o => o.key,
            o => html`
              <li class="md-dropdown-option">${o.value}</li>
            `
          )}
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-dropdown": Dropdown;
  }
}
