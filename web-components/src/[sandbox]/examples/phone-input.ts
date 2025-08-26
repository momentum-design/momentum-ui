import "@/components/form/Form";
import "@/components/phone-input/PhoneInput";
import { html } from "lit-element";

export const phoneInputTemplate = html`
  <div>
    <div class="row">
      <md-phone-input
        show-flags
        errorMessage="This phone number is invalid"
        .value=${"9997770100"}
        @phoneinput-keydown=${(e: CustomEvent) => console.log("keydown: ", e.detail.value)}
        @phoneinput-blur=${(e: CustomEvent) => console.log("blur: ", e.detail.value, " is valid: ", e.detail.isValid)}
        @phoneinput-change=${(e: CustomEvent) =>
          console.log("change: ", e.detail.value, " is valid: ", e.detail.isValid)}
      ></md-phone-input>
    </div>
    <div class="row">
      <md-form>
        <md-phone-input
          showErrorMessage
          errorMessage="This phone number is invalid"
          .value=${"9997770100"}
          @phoneinput-keydown=${(e: CustomEvent) => console.log("keydown: ", e.detail.value)}
          @phoneinput-blur=${(e: CustomEvent) => console.log("blur: ", e.detail.value, " is valid: ", e.detail.isValid)}
          @phoneinput-change=${(e: CustomEvent) =>
            console.log("change: ", e.detail.value, " is valid: ", e.detail.isValid)}
        ></md-phone-input>
      </md-form>
    </div>
    <div class="row">
      <md-phone-input
        disabled
        errorMessage="This phone number is invalid"
        @phoneinput-keydown=${(e: CustomEvent) => console.log("keydown: ", e.detail.value)}
        @phoneinput-blur=${(e: CustomEvent) => console.log("blur: ", e.detail.value, " is valid: ", e.detail.isValid)}
        @phoneinput-change=${(e: CustomEvent) =>
          console.log("change: ", e.detail.value, " is valid: ", e.detail.isValid)}
      ></md-phone-input>
    </div>
    <div class="row">
      <md-phone-input
        pill
        errorMessage="This phone number is invalid"
        codePlaceholder="+7"
        numberPlaceholder="5555555555"
        @phoneinput-keydown=${(e: CustomEvent) => console.log("keydown: ", e.detail.value)}
        @phoneinput-blur=${(e: CustomEvent) => console.log("blur: ", e.detail.value, " is valid: ", e.detail.isValid)}
        @phoneinput-change=${(e: CustomEvent) =>
          console.log("change: ", e.detail.value, " is valid: ", e.detail.isValid)}
      ></md-phone-input>
    </div>
    <div>
      <h4>Example with Initial Value</h4>
      <div class="row">
        <md-form>
          <md-phone-input
            .countryCallingCode=${"+91, India, IN"}
            .errorMessage=${"This phone number is invalid"}
            .value=${"9997770100"}
            .countryCodeAriaLabel=${"International Dialing Code"}
            .dialNumberAriaLabel=${"Dial Number"}
            .numberPlaceholder=${"Enter The Phone Number"}
            @phoneinput-keydown=${(e: CustomEvent) => console.log("keydown: ", e.detail.value)}
            @phoneinput-blur=${(e: CustomEvent) =>
              console.log("blur: ", e.detail.value, " is valid: ", e.detail.isValid)}
            @phoneinput-change=${(e: CustomEvent) =>
              console.log("change: ", e.detail.value, " is valid: ", e.detail.isValid)}
          ></md-phone-input>
        </md-form>
      </div>
    </div>
    <div>
      <h4>Example for Strip the country code is already present at the beginning of the phone number on blur.</h4>
      <div class="row">
        <md-form>
          <md-phone-input
            .countryCallingCode=${"+91, India, IN"}
            .errorMessage=${"This phone number is invalid"}
            .value=${"+919997770101"}
            .countryCodeAriaLabel=${"International Dialing Code"}
            .dialNumberAriaLabel=${"Dial Number"}
            .numberPlaceholder=${"Enter The Phone Number"}
            @phoneinput-blur=${(e: CustomEvent) => console.log("blur: ", e.detail)}
          ></md-phone-input>
        </md-form>
      </div>
    </div>
  </div>
  <div>
    <h4>(New momentum) Example with Initial Value</h4>
    <div class="row">
      <md-form>
        <md-phone-input
          newMomentum
          .countryCallingCode=${"+91, India, IN"}
          .errorMessage=${"This phone number is invalid"}
          .value=${"9997770100"}
          .countryCodeAriaLabel=${"International Dialing Code"}
          .dialNumberAriaLabel=${"Dial Number"}
          .numberPlaceholder=${"Enter The Phone Number"}
          @phoneinput-keydown=${(e: CustomEvent) => console.log("keydown: ", e.detail.value)}
          @phoneinput-blur=${(e: CustomEvent) => console.log("blur: ", e.detail.value, " is valid: ", e.detail.isValid)}
          @phoneinput-change=${(e: CustomEvent) =>
            console.log("change: ", e.detail.value, " is valid: ", e.detail.isValid)}
        ></md-phone-input>
      </md-form>
    </div>
  </div>
`;
