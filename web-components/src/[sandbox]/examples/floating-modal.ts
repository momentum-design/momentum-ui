import "@/components/button/Button";
import "@/components/floating-modal/FloatingModal";
import '@/components/floating-modal/FloatingMinimizedModal';
import { css, customElement, html, LitElement, property } from "lit-element";

const data =
  "Group, Action, Shortcut Key \n Active Task List, Switch between tasks, Ctrl + Alt + T \n Active Task List, Expand and collapse task list, Ctrl + Alt + C \n Agent State, Available for all channels including call chat email and social channel, Ctrl + Alt + R \n Active Agent State List, Idle for all channels, Ctrl + Alt + N \n Application, Switch between popovers, Ctrl + Alt + E \n Application, Maximize and minimize popover view maximize and minimize, Ctrl + Alt + Q \n Call Handling, Open the list of chat templates, Ctrl + Alt + A \n Call Handling, Attach a file to the chat, Ctrl + Alt + S \n Edit CAD Variables, Save edited call variable values, Ctrl + Alt + O \n Edit CAD Variables, Revert edited call variable values, Ctrl + Alt + N \n Email Handling, Send email, Ctrl + Alt + S \n Email Handling, Reply, Ctrl + Alt + O";

@customElement("floating-template-sandbox")
export class FloatingTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Boolean }) isMin = false;
  @property({type: Object}) location = localStorage.getItem('location') !== null ? JSON.parse(localStorage.getItem('location') || "") : {x:0, y:0};
  @property({type: Object}) minLocation = localStorage.getItem('min-location') !== null? JSON.parse(localStorage.getItem('min-location') || "") : {x:0, y:0};
  private openFloatingModal() {
    this.isOpen = true;
  }

  private closeFloatingModal() {
    this.isOpen = false;
  }
  
  private saveLocation(event: any) {
    console.log('location', event);
    this.location = event.detail.transform;
    localStorage.setItem('location', JSON.stringify(event.detail.transform));
  }

  private saveMinLocation(event: any) {
    console.log('min-location', event);
    this.minLocation = event.detail.transform;
    localStorage.setItem('min-location', JSON.stringify(event.detail.transform));
  }

  private setFocus() {
    document.getElementsByName("youtube")[0].focus();
  }

  static get styles() {
    return css`
      .float-modal::part(floating) {
        overflow: hidden;
        height: 500px;
        width: 800px;
      }
      
      .float-modal::part(floatingg){
        right: 0;
        bottom: 0;
      }

      .flexi  {
        display: flex;
        width: 100px;
        margin-top: 4px;
      }
    .space {
      margin-right:10px;
    }
    `;
  }

  render() {
    return html`
      <md-button @button-click=${() => this.openFloatingModal()}>Open Floating Modal</md-button>
     
      <md-floating-modal
        class="float-modal"
        ?show=${this.isOpen}
        minimizable
        @floating-modal-close=${() => this.closeFloatingModal()}
        @floating-modal-minimize-location=${this.saveMinLocation}
        @floating-modal-location=${this.saveLocation}
      >
       <div slot="header" class="flexi"><md-icon class="space" name="youtube-circle_24" color="red"></md-icon>Youtube</div>
       <div slot="minimized-header" class="flexi"><md-icon class="space" name="youtube-circle_24" color="red"></md-icon>Youtube</div>
       <iframe id="youtube" style="height:100%; width:100%" src="https://youtube.com" onload="${this.setFocus}" >
        <iframe>
      </md-floating-modal>
     
    
     
    `;
  }
}

export const floatingModalTemplate = html`
  <floating-template-sandbox></floating-template-sandbox>
`;
