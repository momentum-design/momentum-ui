import { customElement, html, css, LitElement } from "lit-element";
//import "@momentum-ui/web-components/dist/comp/md-button";
// import "@momentum-ui/web-components-4";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  //
  connectedCallback() {
    super.connectedCallback();

    console.log(this.isRegistered("momentum-ui-web-components-sandbox"));
    console.log(this.isRegistered("md-button"));
    console.log(this.isRegistered("md-icon"));
  }

  isRegistered(name: string) {
    return document.createElement(name).constructor !== HTMLElement;
  }

  static get styles() {
    return css`
      .container {
        margin: 20px;
      }
    `;
  }

  render() {
    return html`
      <div class="container">

        <h3>Button</h3>
        <div>
          <md-button disabled><span slot="text">disabled</span></md-button>
          <md-button variant="primary" disabled><span slot="text">disabled</span></md-button>
          <md-button variant="primary" tab-index="-1" color="violet"><span slot="text">no disabled</span></md-button>
          <md-button loading circle><span slot="text">loading</span></md-button>
          <md-button loading><span slot="text">loading</span></md-button>
          <md-button variant="green" circle loading>
            <md-icon slot="icon" name="pause_16"></md-icon>
            <span slot="text">loading</span>
          </md-button>
        </div>

        <h3>Icon</h3>
        <div>
          <md-icon name="arrow-up_16" class="testClass"></md-icon>
          <md-icon name="accessibility" class="testClass" size="50" color="red"></md-icon>
          <md-icon name="admin_32" class="testClass" color="green"></md-icon>
          <md-icon name="chat_28" class="testClass" color="#008094"></md-icon>
        </div>

      </div>
    `;
  }
}
