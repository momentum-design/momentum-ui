import "@/components/button/Button";
import "@/components/floating-modal/FloatingModal";
import { css, customElement, html, LitElement, property } from "lit-element";

const data =
  "Group, Action, Shortcut Key \n Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O";

@customElement("floating-template-sandbox")
export class FloatingTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isOpen = false;

  private openFloatingModal() {
    this.isOpen = true;
  }

  private closeFloatingModal() {
    this.isOpen = false;
  }

  static get styles() {
    return css`
      .float-modal::part(floating) {
        overflow: hidden;
        height: 700px;
        width: 800px;
        left: 100px;
        top: 50px;
      }
    `;
  }

  render() {
    return html`
      <md-button @button-click=${() => this.openFloatingModal()}>Open Floating Modal</md-button>

      <md-floating-modal
        class="float-modal"
        heading="Keyboard Shortcuts"
        .minHeight=${"400px"}
        .minWidth=${"400px"}
        ?show=${this.isOpen}
        @floating-modal-close=${() => this.closeFloatingModal()}
      >
        <md-table tabledata="${data}" sorting></md-table>
      </md-floating-modal>
    `;
  }
}

export const floatingModalTemplate = html`
  <floating-template-sandbox></floating-template-sandbox>
`;
