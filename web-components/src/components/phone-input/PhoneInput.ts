import "@/components/combobox/ComboBox";
import "@/components/input/Input";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { customArray } from "country-codes-list";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { AsYouType, CountryCode, isValidNumberForRegion } from "libphonenumber-js";
import { html, internalProperty, LitElement, property } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import { Input } from "../input/Input"; // Keep type import as a relative path
import styles from "./scss/module.scss";

export namespace PhoneInput {
  export interface Country {
    name: string;
    value: string;
    code: string;
  }

  export type Attributes = {
    codePlaceholder: string;
    numberPlaceholder: string;
    countryCallingCode: string;
    pill: boolean;
    value: string;
    errorMessage: string;
    flagClass: string;
  };

  @customElementWithCheck("md-phone-input")
  export class ELEMENT extends LitElement {
    @property({ type: String, reflect: true }) codePlaceholder = "+1";
    @property({ type: String }) flagClass = "flag__usa";
    @property({ type: String }) numberPlaceholder = "Enter Phone Number";
    @property({ type: String, attribute: "country-calling-code" }) countryCallingCode = "";
    @property({ type: Boolean }) pill = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) value = "";
    @property({ type: String }) errorMessage = "";

    @internalProperty() private countryCode: CountryCode = "US";
    @internalProperty() private codeList = [];
    @internalProperty() private formattedValue = "";
    @internalProperty() private isValid = true;

    connectedCallback() {
      super.connectedCallback();
      this.codeList = customArray({
        name: "{countryNameEn}",
        value: "{countryCallingCode}",
        code: "{countryCode}"
      });
    }

    attributeChangedCallback(name: string, oldval: any, newval: any) {
      super.attributeChangedCallback(name, oldval, newval);
      if (name.toLowerCase() === "codePlaceholder".toLowerCase()) {
        this.flagClass = newval === "+1" ? "flag__usa" : "";
      }
    }

    updated(changedProperties: any) {
      changedProperties.forEach((oldValue: any, propName: any) => {
        if (propName === "countryCallingCode") {
          this.flagClass =
            this.countryCode === "US" &&
            (this.countryCallingCode.startsWith("+1") ||
              (this.countryCallingCode === "" && this.codePlaceholder == "+1"))
              ? "flag__usa"
              : "";
        }
      });
    }

    static get styles() {
      return [reset, styles];
    }

    countryCodeOptionTemplate(country: PhoneInput.Country, index: number) {
      return html`
        <div
          class="md-phone-input__option"
          display-value="+${country.value}"
          slot=${index}
          aria-label="+${country.value}, ${country.name}, ${country.code}"
        >
          <img src="${findFlagUrlByIso2Code(country.code)}" style="max-height:.5rem;" />
          <span>${country.name}</span>
          <span>+${country.value}</span>
        </div>
      `;
    }

    handleCountryChange(event: CustomEvent) {
      this.flagClass = this.codePlaceholder === "+1" ? "flag__usa" : "";
      if (!event.detail.value || !event.detail.value.id) {
        return;
      }
      this.countryCallingCode = event.detail.value.id;
      this.countryCode = event.detail.value.id.split(",")[2];
      this.flagClass = this.countryCode === "US" ? "flag__usa" : "";
    }

    handlePhoneChange(event: CustomEvent) {
      this.value = event.detail.value;
      this.validateInput(this.value);
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("phoneinput-change", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event,
            value: `${this.countryCallingCode}${this.value}`,
            isValid: this.isValid
          }
        })
      );
    }

    handleKeydown(event: Event) {
      this.isValid = true;
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("phoneinput-keydown", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event,
            value: `${this.countryCallingCode}${this.value}`
          }
        })
      );
    }

    handleBlur(event: Event) {
      this.isValid = this.value ? isValidNumberForRegion(this.value, this.countryCode) : false;
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("phoneinput-blur", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event,
            value: `${this.countryCallingCode}${this.value}`,
            isValid: this.isValid
          }
        })
      );
    }

    validateInput(input: string) {
      this.formattedValue = new AsYouType(this.countryCode).input(input);
    }

    handleCountryFocusOut({ detail }: any) {
      this.flagClass =
        (detail.value === "" && this.codePlaceholder === "+1") ||
        (detail.value === "+1" && this.countryCode === "US" && this.countryCallingCode.startsWith("+1"))
          ? "flag__usa"
          : "";
    }

    render() {
      return html`
        <div class="md-phone-input__container">
          <div part="testDiv" class="test-div"></div>
          <md-combobox
            class="${this.flagClass}"
            part="combobox"
            ?disabled=${this.disabled}
            shape="${this.pill ? "pill" : "none"}"
            placeholder="${this.codePlaceholder}"
            .value="${this.countryCallingCode ? [this.countryCallingCode] : []}"
            @change-selected="${(e: CustomEvent) => this.handleCountryChange(e)}"
            @combobox-input="${this.handleCountryFocusOut}"
            with-custom-content
          >
            ${repeat(
              this.codeList,
              (country: PhoneInput.Country) => country.name,
              (country: PhoneInput.Country, index) => this.countryCodeOptionTemplate(country, index)
            )}
          </md-combobox>
          <md-input
            part="md-input"
            ?disabled=${this.disabled}
            placeholder=${this.numberPlaceholder}
            @input-change="${(e: CustomEvent) => this.handlePhoneChange(e)}"
            @input-blur="${(e: Event) => this.handleBlur(e)}"
            @input-keydown="${(e: Event) => this.handleKeydown(e)}"
            shape="${this.pill ? "pill" : "none"}"
            clear
            type="tel"
            value="${this.formattedValue}"
            .messageArr="${!this.isValid
              ? [
                  {
                    type: "error",
                    message: this.errorMessage
                  } as Input.Message
                ]
              : []}"
          ></md-input>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-phone-input": PhoneInput.ELEMENT;
  }
}
