import "@/components/alert/Alert";
import "@/components/badge/Badge";
import { html } from "lit";

export const alertTemplate = html`
  <md-alert
    title="EXPLORE NEW HORIZONS Maecenas fermentum est ut elementum vulputate."
    message="EXPLORE NEW HORIZONS Maecenas fermentum est ut elementum vulputate. Ut vel consequat urna. Ut aliquet ornare massa, quis dapibus quam condimentum id. GET READYEXPLORE NEW HORIZONS Maecenas fermentum est ut elementum vulputate. Ut vel consequat urna. Ut aliquet ornare massa, quis dapibus quam condimentum id."
    type="success"
    closable
    show
  ></md-alert>
  <md-alert title="Warning" message="Who's awesome? You are!" type="warn" closable show></md-alert>
  <md-alert title="Error" message="Who's awesome? You are!" type="error" closable show></md-alert>
  <md-alert message="Who's awesome? You are!" show closable>
    <md-badge slot="alert-icon" color="darkmint" circle>
      <md-icon name="sms_16" color="white"></md-icon>
    </md-badge>
  </md-alert>
  <md-alert message="Who's awesome? You are!" show>
    <a slot="alert-body" href="/">Test</a>
    <div slot="alert-footer">
      <md-button variant="primary"><span slot="text">Blue</span></md-button>
    </div>
  </md-alert>
  <md-alert title="Success" message="Who's awesome? You are!" type="success" inline show></md-alert>
`;
