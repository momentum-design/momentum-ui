import "@/components/country-code-picker/CountryCodePicker";
import "@/components/form/Form";
import { html } from "lit-html";

const countryCodeChangedHandler = (e: CustomEvent) => {
  console.log("country code changed: ", e.detail.srcEvent.detail.value.id);
};

export const countryCodePickerTemplate = html`
  <style>
    .country-code-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  </style>

  <div class="country-code-container">
    <div class="row">
      <md-country-code-picker show-flags @country-code-changed=${countryCodeChangedHandler}></md-country-code-picker>
    </div>
    <div class="row">
      <md-country-code-picker disabled @country-code-changed=${countryCodeChangedHandler}></md-country-code-picker>
    </div>
    <div class="row">
      <md-country-code-picker
        pill
        codePlaceholder="+7"
        @country-code-changed=${countryCodeChangedHandler}
      ></md-country-code-picker>
    </div>
    <div class="row">
      <h4>Example with Initial Value</h4>
      <md-country-code-picker
        .countryCallingCode=${"+61 891, Cocos (Keeling) Islands, CC"}
        .countryCodeAriaLabel=${"International Dialing Code"}
        @country-code-changed=${countryCodeChangedHandler}
      ></md-country-code-picker>
    </div>
    <div class="row">
      <h4>(New momentum) Example with Initial Value</h4>
      <md-country-code-picker
        newMomentum
        ?isArrowDropdown=${true}
        .countryCallingCode=${"+61 891, Cocos (Keeling) Islands, CC"}
        .countryCodeAriaLabel=${"International Dialing Code"}
        @country-code-changed=${countryCodeChangedHandler}
      ></md-country-code-picker>
    </div>
  </div>
`;
