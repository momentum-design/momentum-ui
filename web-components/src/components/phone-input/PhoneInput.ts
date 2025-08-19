import "@/components/combobox/ComboBox";
import "@/components/country-code-picker/CountryCodePicker";
import "@/components/input/Input";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { AsYouType, CountryCode, isValidNumberForRegion } from "libphonenumber-js";
import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Input } from "../input/Input"; // Keep type import as a relative path
import styles from "./scss/module.scss";
export namespace PhoneInput {
  export type Attributes = {
    codePlaceholder: string;
    numberPlaceholder: string;
    countryCallingCode: string;
    pill: boolean;
    value: string;
    errorMessage: string;
    flagClass: string;
    showErrorMessage: string;
  };

  @customElementWithCheck("md-phone-input")
  export class ELEMENT extends LitElement {
    @property({ type: String, reflect: true }) codePlaceholder = "+1";
    @property({ type: String }) numberPlaceholder = "Enter Phone Number";
    @property({ type: String, attribute: "country-calling-code" }) countryCallingCode = "";
    @property({ type: Boolean, attribute: "show-flags" }) showFlags = false;
    @property({ type: Boolean }) pill = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) value = "";
    @property({ type: String }) errorMessage = "";
    @property({ type: Boolean }) showErrorMessage = false;
    @property({ type: String }) countryCodeAriaLabel = "";
    @property({ type: String }) dialNumberAriaLabel = "";
    @property({ type: String }) clearAriaLabel = "Clear Input";
    @property({ type: String }) clearCountryCodeAriaLabel = "Clear Country Code";
    @property({ type: String }) id = "";
    @property({ type: Boolean }) newMomentum = false;

    @state() private countryCode: CountryCode = "US";
    @state() private formattedValue = "";
    @state() private isValid = true;

    private get isRtl(): boolean {
      try {
        if (!this.isConnected) {
          return false;
        }
        const computedStyle = getComputedStyle(this);
        return computedStyle?.direction === "rtl";
      } catch (_) {
        return false;
      }
    }

    connectedCallback() {
      super.connectedCallback();
      if (this.id === "") {
        this.id = `md-phone-input-${Math.random().toString(36).substring(2, 6)}`;
      }
      this.validateInput(this.value);
    }

    validateNumber() {
      this.isValid = this.value ? isValidNumberForRegion(this.value, this.countryCode) : true;
    }

    handleCountryChange(e: CustomEvent) {
      const event = e.detail.srcEvent;
      if (!event.detail.value || !event.detail.value?.id) {
        this.countryCode = "US";
        this.countryCallingCode = "";
      } else {
        this.countryCallingCode = event.detail.value.id;
        this.countryCode = event.detail.value.id.split(",")[2]?.trim();
      }
      this.validateNumber();
      this.dispatchEvent(
        new CustomEvent("countrycode-change", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event,
            isValid: this.isValid
          }
        })
      );
    }

    handlePhoneChange(event: CustomEvent) {
      this.value = event.detail.value;
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("phoneinput-change", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event,
            value: `${this.countryCallingCode}${this.value}`,
            isValid: this.isValid,
            phoneNumber: this.value
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
            value: `${this.countryCallingCode}${this.value}`,
            isValid: this.isValid,
            phoneNumber: this.value
          }
        })
      );
    }

    handleBlur(event: Event) {
      this.validateInput(this.value);
      this.validateNumber();
      event.stopPropagation();
      this.removeCountryCode();
      this.dispatchEvent(
        new CustomEvent("phoneinput-blur", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event,
            value: `${this.countryCallingCode}${this.value}`,
            isValid: this.isValid,
            phoneNumber: this.value
          }
        })
      );
    }

    removeCountryCode() {
      // Strip when Phone number starts with selected Country Code.
      const countryCodeValue = this.countryCallingCode.split(",")[0]?.trim();

      if (this.value.startsWith(countryCodeValue)) {
        // If yes, remove the country code and any following hyphen
        const validPhoneNumber = this.value.slice(countryCodeValue.length).replace(/^-/, "");
        this.value = validPhoneNumber;
      }
    }

    validateInput(input: string) {
      this.formattedValue = new AsYouType(this.countryCode).input(input);
    }

    get flagClassMap() {
      return { "new-momentum": this.newMomentum };
    }

    private get containerClassMap() {
      return { "md-phone-input__container": true, rtl: this.isRtl };
    }

    static get styles() {
      return [styles];
    }

    render() {
      return html`
        <div class=${classMap(this.containerClassMap)}>
          <md-country-code-picker
            part="md-country-code-picker"
            exportparts="option: option"
            ?disabled=${this.disabled}
            ?pill=${this.pill}
            ?show-flags=${this.showFlags}
            ariaLabel=${this.countryCodeAriaLabel}
            codePlaceholder="${this.codePlaceholder}"
            .countryCallingCode="${this.countryCallingCode}"
            @country-code-changed=${(e: CustomEvent) => this.handleCountryChange(e)}
            ?newMomentum=${this.newMomentum}
            ?isDropdownArrow=${true}
            .clearAriaLabel="${this.clearCountryCodeAriaLabel}"
          ></md-country-code-picker>

          <md-input
            part="md-input"
            ?disabled=${this.disabled}
            placeholder=${this.numberPlaceholder}
            .ariaInvalid=${!this.isValid ? "true" : "false"}
            .ariaLabel=${`${this.dialNumberAriaLabel}`}
            @input-change=${(e: CustomEvent) => this.handlePhoneChange(e)}
            @input-blur=${(e: Event) => this.handleBlur(e)}
            @input-keydown=${(e: Event) => this.handleKeydown(e)}
            shape="${this.pill ? "pill" : "none"}"
            .ariaControls=${this.id}
            clear
            ?newMomentum=${this.newMomentum}
            clearAriaLabel="${this.clearAriaLabel}"
            type="tel"
            value="${this.formattedValue}"
            .messageArr="${!this.isValid || this.showErrorMessage
              ? [
                  {
                    type: "error",
                    id: this.id,
                    ariaLive: "polite",
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
