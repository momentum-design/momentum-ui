import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElement, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { repeat } from "lit-html/directives/repeat.js";
import { styleMap } from "lit-html/directives/style-map";
import styles from "./scss/module.scss";

type OptionMember = { [key: string]: string };
type RenderOptionMember = { key: string; value: string };

@customElement("md-dropdown")
export class Dropdown extends FocusMixin(LitElement) {
  @property({ type: String }) label = "Select...";
  @property({ type: Array }) options: (string | OptionMember)[] = [];
  @property({ type: String, attribute: "option-id", reflect: true }) optionId = "";
  @property({ type: String, attribute: "option-value", reflect: true }) optionValue = "";

  @internalProperty() renderOptions: RenderOptionMember[] = [];
  @internalProperty() isExpanded = false;
  @internalProperty() isDisabled = false;

  connectedCallback() {
    super.connectedCallback();

    this.setupEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.teardownEvents();
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    changedProperties.forEach((oldValue, name) => {
      if (name === "options") {
        const existingKeys: string[] = [];

        this.renderOptions = this.options.reduce((acc, option) => {
          const { key, value } = this.getOptionKeyValuePair(option);

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

  setupEvents() {
    document.addEventListener("click", this.handleOutsideClick);
  }

  teardownEvents() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  expand() {
    this.isExpanded = true;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  handleOutsideClick = (e: MouseEvent) => {
    let insideSelfClick = false;
    const path = e.composedPath();
    if (path.length) {
      insideSelfClick = !!path.find(element => element === this);
      if (!insideSelfClick) {
        this.collapse();
      }
    }
  };

  onLabelClick() {
    this.toggle();
  }

  getOptionKeyValuePair(option: string | OptionMember) {
    if (typeof option === "string") {
      return { key: option.trim(), value: option };
    }

    if (option && typeof option === "object") {
      const optionKeys = Object.keys(option as OptionMember);
      const optionValues = Object.values(option as OptionMember);

      if (optionKeys.length) {
        if (optionKeys.length === 1 || !this.optionId) {
          return { key: optionKeys[0], value: optionValues[0] };
        } else if (this.optionId) {
          return { key: option[this.optionId], value: option[this.optionValue || this.optionId] };
        }
      }
    }

    return { key: "undefined", value: "undefined" };
  }

  render() {
    return html`
      <div
        class="${classMap({
          "md-dropdown": true,
          "md-dropdown__expanded": this.isExpanded
        })}"
      >
        <select class="md-dropdown-select">
          ${repeat(
            this.renderOptions,
            o => o.key,
            o => html`
              <option value="${o.key}">${o.value}</option>
            `
          )}
        </select>
        <label class="md-dropdown-label" @click="${() => this.onLabelClick()}">
          <span class="md-dropdown-label--text">${this.label}</span>
          <span class="md-dropdown-label--icon">
            <md-icon name="icon-arrow-down_16"></md-icon>
          </span>
        </label>
        <ul class="md-dropdown-list" style="${styleMap({ display: this.isExpanded ? "block" : "none" })}">
          ${repeat(
            this.renderOptions,
            o => o.key,
            o => html`
              <li class="md-dropdown-option" role="option" aria-label="${o.value}">
                <span class="select-label">
                  <span>${o.value}</span>
                </span>
              </li>
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
