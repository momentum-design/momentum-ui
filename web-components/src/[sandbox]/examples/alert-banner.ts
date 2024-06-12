import "@/components/alert-banner/AlertBanner";
import "@/components/button/Button";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("alert-banner-template-sandbox")
export class AlertBannerTemplateSandbox extends LitElement {
  @property({ type: Boolean }) default = false;
  @property({ type: Boolean }) warning = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) success = false;

  async openAlert(kind: string) {
    switch (kind) {
      case "default":
        this.default = true;
        break;
      case "warning":
        this.warning = true;
        break;
      case "error":
        this.error = true;
        break;
      case "success":
        this.success = true;
        break;
      default:
        break;
    }
    await this.requestUpdate();
  }

  async hideAlert(kind: string) {
    switch (kind) {
      case "default":
        this.default = false;
        break;
      case "warning":
        this.warning = false;
        break;
      case "error":
        this.error = false;
        break;
      case "success":
        this.success = false;
        break;
      default:
        break;
    }
    await this.requestUpdate();
  }

  render() {
    return html`
      <h2>Alert Banner</h2>
      <div style="margin-bottom: 15px;">
        <md-button @click=${() => this.openAlert("warning")}>Trigger Warning Alert</md-button>
      </div>
      <div style="margin-bottom: 15px;">
        <md-button @click=${() => this.openAlert("error")}>Trigger Error Alert</md-button>
      </div>
      <div style="margin-bottom: 15px;">
        <md-button @click=${() => this.openAlert("default")}>Trigger Default Alert</md-button>
      </div>
      <div style="margin-bottom: 15px;">
        <md-button @click=${() => this.openAlert("success")}>Trigger Success Alert</md-button>
      </div>
      <md-alert-banner ?show=${this.default} type="default" @alertBanner-hide=${() => this.hideAlert("default")}>
        Test Alert Message
      </md-alert-banner>
      <md-alert-banner
        ?show="${this.warning}"
        closable
        type="warning"
        @alertBanner-hide=${() => this.hideAlert("warning")}
      >
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
      </md-alert-banner>
      <md-alert-banner
        ?show=${this.error}
        closable
        type="error"
        @alertBanner-hide=${() => this.hideAlert("error")}
        message="text from a message attribute instead"
      ></md-alert-banner>
      <md-alert-banner
        ?show=${this.success}
        closable
        type="success"
        @alertBanner-hide=${() => this.hideAlert("success")}
        message="success text from a message attribute"
      ></md-alert-banner>
    `;
  }
}

export const alertBannerTemplate = html`
  <alert-banner-template-sandbox></alert-banner-template-sandbox>
`;
