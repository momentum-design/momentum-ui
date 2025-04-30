import "@/components/combobox/ComboBox";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { customArray } from "country-codes-list";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { CountryCode } from "libphonenumber-js";
import { LitElement, html, internalProperty, property, query } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { repeat } from "lit-html/directives/repeat.js";
import styles from "./scss/module.scss";
export namespace CountryCodePicker {
  export interface Country {
    name: string;
    value: string;
    code: string;
  }

  export type Attributes = {
    codePlaceholder: string;
    countryCallingCode: string;
    pill: boolean;
    flagClass: string;
  };

  export type CountryCalling = {
    id: string;
    value: string;
  };

  @customElementWithCheck("md-country-code-picker")
  export class ELEMENT extends LitElement {
    @property({ type: String, reflect: true }) codePlaceholder = "+1";
    @property({ type: String, attribute: "country-calling-code" }) countryCallingCode = "";
    @property({ type: Boolean, attribute: "show-flags" }) showFlags = false;
    @property({ type: Boolean }) pill = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String, attribute: "clear-icon-height" }) clearIconHeight = "auto";
    @property({ type: String }) ariaLabel = "";
    @property({ type: String }) clearAriaLabel = "Clear Country Code";
    @property({ type: String }) id = "";
    @property({ type: Boolean }) newMomentum = false;
    @property({ type: Boolean }) isDropdownArrow = true;

    @internalProperty() private countryCode: CountryCode = "US";
    @internalProperty() private codeList = [];

    @query("md-combobox") combobox!: HTMLElement;

    connectedCallback() {
      super.connectedCallback();
      this.codeList = customArray({
        name: "{countryNameEn}",
        value: "{countryCallingCode}",
        code: "{countryCode}"
      });
      if (this.id === "") {
        this.id = `md-country-code-picker-${Math.random().toString(36).substring(2, 6)}`;
      }
    }

    getCountryFlag(code: string) {
      return html`
        <span class="flag-svg-wrapper">
          <img src="${findFlagUrlByIso2Code(code)}" />
        </span>
      `;
    }

    countryCodeOptionTemplate(country: CountryCodePicker.Country, index: number) {
      return html`
        <div
          part="option"
          class="md-country-code-picker__option"
          display-value="+${country.value}"
          slot=${index}
          aria-label="+${country.value}, ${country.name}, ${country.code}"
        >
          ${this.showFlags ? this.getCountryFlag(country.code) : nothing}
          <span>${country.name}</span>
          <span>+${country.value}</span>
        </div>
      `;
    }

    handleCountryChange(event: CustomEvent) {
      if (!event.detail.value || !event.detail.value?.id) {
        this.countryCode = "US";
        this.countryCallingCode = "";
      } else {
        this.countryCallingCode = event.detail.value.id;
        this.countryCode = event.detail.value.id.split(",")[2]?.trim();
      }

      this.dispatchEvent(
        new CustomEvent("country-code-changed", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event
          }
        })
      );
    }

    get flagClassMap() {
      return { "new-momentum": this.newMomentum };
    }

    getFormatedCountryCallingCode() {
      return { id: this.countryCallingCode, value: this.countryCallingCode.split(",")[0]?.trim() };
    }

    getModStyle() {
      return html`
        <style>
          md-combobox::part(group) {
            border-left-style: none;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            padding-left: 0;
          }
        </style>
      `;
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        ${this.showFlags ? this.getModStyle() : nothing}
        <div class="md-country-code-picker__container">
          ${this.showFlags
            ? html`
                <span class="flag-box ${classMap(this.flagClassMap)}">${this.getCountryFlag(this.countryCode)}</span>
              `
            : nothing}
          <md-combobox
            part="combobox"
            exportparts="group: combobox-group, combobox-options: options-container"
            ?disabled=${this.disabled}
            shape="${this.pill ? "pill" : "none"}"
            ariaLabel=${this.ariaLabel}
            placeholder="${this.codePlaceholder}"
            .value="${this.countryCallingCode ? [this.getFormatedCountryCallingCode()] : []}"
            @change-selected="${(e: CustomEvent) => this.handleCountryChange(e)}"
            clear-icon-height="${this.clearIconHeight}"
            with-custom-content
            ?newMomentum=${this.newMomentum}
            ?is-dropdown-arrow=${this.isDropdownArrow}
            .clearAriaLabel="${this.clearAriaLabel}"
          >
            ${repeat(
              this.codeList,
              (country: CountryCodePicker.Country) => country.name,
              (country: CountryCodePicker.Country, index) => this.countryCodeOptionTemplate(country, index)
            )}
          </md-combobox>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-country-code-picker": CountryCodePicker.ELEMENT;
  }
}
