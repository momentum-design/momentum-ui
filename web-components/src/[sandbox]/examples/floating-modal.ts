import "@/components/button/Button";
import "@/components/floating-modal/FloatingModal";
import { css, customElement, html, LitElement, property } from "lit-element";

const data =
  "Group, Action, Shortcut Key \n Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O";

@customElement("floating-template-sandbox")
export class FloatingTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Boolean }) isMin = false;
  @property({ type: Object }) location =
    localStorage.getItem("location") !== null ? JSON.parse(localStorage.getItem("location") || "") : { x: 0, y: 0 };
  @property({ type: Object }) minLocation =
    localStorage.getItem("min-location") !== null
      ? JSON.parse(localStorage.getItem("min-location") || "")
      : { x: 0, y: 0 };
  @property({ type: Object }) containerRect =
    localStorage.getItem("resize") !== null ? JSON.parse(localStorage.getItem("resize") || "") : null;
  private openFloatingModal() {
    this.isOpen = true;
  }

  private resetLocation() {
    this.minLocation = { x: 0, y: 0 };
    localStorage.removeItem("min-location");
  }

  connectedCallback() {
    super.connectedCallback();
  }
  private closeFloatingModal() {
    this.isOpen = false;
  }

  private resize(event: CustomEvent) {
    console.log("resize", event.detail.size);
    this.containerRect = event.detail.size;
    localStorage.setItem("resize", JSON.stringify(event.detail.size));
  }

  private saveLocation(event: CustomEvent) {
    console.log("location", event);
    this.location = event.detail.transform;
    localStorage.setItem("location", JSON.stringify(event.detail.transform));
  }

  private saveMinLocation(event: CustomEvent) {
    console.log("min-location", event);
    this.minLocation = event.detail.transform;
    localStorage.setItem("min-location", JSON.stringify(event.detail.transform));
  }

  static get styles() {
    return css`
      .float-modal::part(floating) {
        overflow: hidden;
        height: 500px;
        width: 800px;
      }

      .float-modal::part(minimize-floating) {
        right: 0;
        bottom: 0;
      }

      .flexi {
        display: flex;
        width: 100px;
        margin-top: 4px;
      }
      .space {
        margin-right: 10px;
      }
    `;
  }

  render() {
    return html`
      <md-button variant="secondary" @button-click=${() => this.openFloatingModal()}>Open Floating Modal</md-button>

      <md-floating-modal
        class="float-modal"
        heading="Shortcuts"
        ?show=${this.isOpen}
        .position=${this.location}
        .minPosition=${this.minLocation}
        .containerRect=${this.containerRect}
        minimizable
        @floating-modal-close=${() => this.closeFloatingModal()}
        @floating-modal-minimize-location=${this.saveMinLocation}
        @floating-modal-location=${this.saveLocation}
        @floating-modal-resize=${this.resize}
      >
        <md-table tabledata="${data}" sorting></md-table>
      </md-floating-modal>
    `;
  }
}

export const floatingModalTemplate = html` <floating-template-sandbox></floating-template-sandbox> `;
