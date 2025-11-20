import "@/components/alert/Alert";
import "@/components/avatar/Avatar";
import "@/components/badge/Badge";
import { html } from "lit-element";

const nextLineMessage =
  "You couldn’t take this call because of a country-specific regulation. Your availability state is now set to Idle. \n\nReach out to your supervisor or administrator to help get it resolved. You can switch back to Available anytime.";

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
      <md-icon name="sms-filled" size="16" iconSet="momentumDesign" color="var(--md-white-text-color)"></md-icon>
    </md-badge>
  </md-alert>
  <md-alert message="Who's awesome? You are!" show>
    <md-link slot="alert-body" href="/">Test</md-link>
    <div slot="alert-footer">
      <md-button variant="primary">
        <span slot="text">primary</span>
      </md-button>
    </div>
  </md-alert>
  <md-alert title="Success" message="Who's awesome? You are!" type="success" inline show></md-alert>
  <br />
  <h3>New Momentum</h3>
  <md-alert
    title="Header"
    message="Turpis id scelerisque porta purus ut vel nisl a. Pulvinar felis convallis praesent viverra porta."
    type="info"
    closable
    show
    newMomentum
    secondaryButton="Label"
    primaryButton="Label"
    link
    showMore
    href="/"
    .primaryButtonClickFunction="${() => console.log("Primary button clicked")}"
    .secondaryButtonClickFunction="${() => console.log("Secondary button clicked")}"
  ></md-alert>
  <md-alert
    title="Error"
    message="Your session has expired. Please log in again to retrieve your session."
    type="error"
    closable
    show
    newMomentum
    secondaryButton="Cancel"
    primaryButton="Ok"
  ></md-alert>
  <md-alert
    title="Warning"
    message="Warning: Your password will expire in 3 days. Please update your password to ensure continued access."
    type="warning"
    closable
    show
    newMomentum
    primaryButton="Ok"
  ></md-alert>
  <md-alert
    title="Success"
    message="Success: Your account has been successfully created! Verify your email address by clicking the link sent to your inbox."
    type="success"
    closable
    show
    newMomentum
    secondaryButton="Close"
  ></md-alert>
  <md-alert
    title="Username"
    message="New message received."
    type="message"
    secondaryButton="Label"
    primaryButton="Label"
    closable
    show
    newMomentum
  ></md-alert>
  <md-alert closable show newMomentum>
    <md-avatar
      slot="alert-icon"
      title="avatar"
      size="24"
      alt="avatar"
      src="https://placekitten.com/200/300"
    ></md-avatar>
    <span slot="alert-body"><b>Username</b> joined the session</span></md-alert
  >
  <md-alert type="loading" title="Connecting" closable show newMomentum></md-alert>
  <div style="position: absolute; right: 48px; top: 48px; width: 340px;">
    <md-alert
      title="Ready to pause and recharge?"
      message="Hey there, you're on a roll. How about a wellness break? This break is pre-approved by your organization for your well-being. You deserve it."
      primaryButton="Take a Break"
      secondaryButton="Later"
      closable
      show
      newMomentum
    >
      <md-icon slot="alert-icon" size="24" iconSet="momentumBrandVisuals" name="cisco-ai-assistant-color-gradient">
      </md-icon>
    </md-alert>
  </div>
  <h3>New Momentum with slotted footer</h3>
  <md-alert
    title="Ready to pause and recharge?"
    message="Hey there, you're on a roll. How about a wellness break? This break is pre-approved by your organization for your well-being. You deserve it."
    closable
    show
    newMomentum
  >
    <md-icon slot="alert-icon" size="24" iconSet="momentumBrandVisuals" name="cisco-ai-assistant-color-gradient">
    </md-icon>
    <div slot="alert-footer">
      <md-button variant="primary">
        <span slot="text">primary</span>
      </md-button>
      <md-button variant="secondary">
        <span slot="text">secondary</span>
      </md-button>
      <md-button variant="secondary">
        <span slot="text">secondary</span>
      </md-button>
    </div>
  </md-alert>

  <h3>New Momentum Loading Alert with new line string</h3>
  <md-alert title="Ready to pause and recharge?" message=${nextLineMessage} closable show newMomentum>
    <md-icon slot="alert-icon" size="24" iconSet="momentumBrandVisuals" name="cisco-ai-assistant-color-gradient">
    </md-icon>
    <div slot="alert-footer">
      <md-button variant="primary">
        <span slot="text">primary</span>
      </md-button>
      <md-button variant="secondary">
        <span slot="text">secondary</span>
      </md-button>
      <md-button variant="secondary">
        <span slot="text">secondary</span>
      </md-button>
    </div>
  </md-alert>
`;
