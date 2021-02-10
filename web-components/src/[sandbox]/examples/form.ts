import "@/components/form/Form";
import "@/components/button/Button";
import { html } from "lit-element";

export const formTemplate = html`
  <h3>Default (Valid)</h3>
  <md-form is-valid>
    <md-input label="Name" name="name"></md-input>
    <md-input label="Address" name="address"></md-input>
    <md-input label="Email" name="email"></md-input>
    <md-input label="Phone" name="phone"></md-input>
    <md-button type="submit" label="Please Submit Form" size="52" color="blue">Submit</md-button>
  </md-form>
  <h3>Target (Valid)</h3>
  <md-form target="_blank" is-valid>
    <md-input name="name"></md-input>
  </md-form>
  <h3>Not Valid</h3>
  <md-form>
    <md-input name="address"></md-input>
    <button type="submit">Submit</button>
  </md-form>
  <h3>No Validation</h3>
  <md-form no-validate>
    <md-input name="address"></md-input>
    <md-button type="submit" color="green">Submit</md-button>
  </md-form>
  <h3>Autofill Name Attribute</h3>
  <md-form no-validate autofill-name="address">
    <md-input></md-input>
    <md-button type="submit" color="green">Submit</md-button>
  </md-form>
`;
