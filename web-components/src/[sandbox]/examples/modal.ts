import "@/components/button/Button";
import "@/components/modal/Modal";
import "@/components/tabs/Tab";
import "@/components/tabs/TabPanel";
import "@/components/tabs/Tabs";
import { customElement, html, LitElement, property } from "lit-element";

@customElement("modal-template-sandbox")
export class ModalTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isModalOpen = false;
  @property({ type: Boolean }) isComplexModalOpen = false;
  @property({ type: Boolean }) isDialogOpen = false;

  private openModal() {
    this.isModalOpen = true;
  }

  private openComplexModal() {
    this.isComplexModalOpen = true;
  }

  private closeComplexModal() {
    this.isComplexModalOpen = false;
  }

  private closeModal() {
    this.isModalOpen = false;
  }

  private openDialog() {
    this.isDialogOpen = true;
  }

  private closeDialog() {
    this.isDialogOpen = false;
  }

  render() {
    return html`
      <md-button @click=${this.openModal}>Open Modal</md-button>
      <md-button @click=${this.openDialog}>Open Dialog</md-button>
      <md-button @click=${this.openComplexModal}>Open Complex Modal</md-button>
      <md-modal
        htmlId="modal-1"
        ?show=${this.isModalOpen}
        headerLabel="Test Header Text"
        headerMessage="Test Message Text In Header"
        size="small"
        hideFooter
        hideHeader
        backdropClickExit
        showCloseButton
        noExitOnEsc
        @close-modal="${this.closeModal}"
      >
        <div slot="header">
          <span>Test Slot Header</span>
        </div>
        <p>
          This pattern may seem inefficient, since the same style sheet is reproduced in a each instance of an element.
          However, the browser can deduplicate multiple instances of the same style sheet, so the cost of parsing the
          style sheet is only paid once.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem
          Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
          Renaissance.
        </p>
        <p>
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The
          standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32
          and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H. Rackham.
        </p>
        <p>
          This pattern may seem inefficient, since the same style sheet is reproduced in a each instance of an element.
          However, the browser can deduplicate multiple instances of the same style sheet, so the cost of parsing the
          style sheet is only paid once.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem
          Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
          Renaissance.
        </p>
        <p>
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The
          standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32
          and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H. Rackham.
        </p>

        <md-button slot="footer" type="reset">Reset</md-button>
        <md-button slot="footer" @click="${this.closeModal}" type="submit">Submit</md-button>
      </md-modal>

      <md-modal
        htmlId="modal-2"
        ?show=${this.isDialogOpen}
        headerLabel="Test Dialog Header"
        size="dialog"
        closeBtnName="Ok"
        showCloseButton
        @close-modal="${this.closeDialog}"
      >
        <input type="text" placeholder="Type Text" />
        <p>
          Curabitur nec leo sit amet sapien eleifend accumsan at eu magna. Suspendisse potenti. Aenean lobortis aliquet
          dui, id suscipit quam consectetur quis.
        </p>
      </md-modal>

      <md-modal ?show=${this.isComplexModalOpen} closeBtnName="Submit This" @close-modal="${this.closeComplexModal}">
        <md-tabs>
          <md-tab slot="tab">
            <span>Contact History</span>
            <md-icon name="recents_16"></md-icon>
          </md-tab>
          <md-tab-panel slot="panel">
            <span>Content for "Contact History"</span>
            <button type="button">Contact History</button>
          </md-tab-panel>
          <md-tab slot="tab">
            <span>Cisco WxM</span>
            <md-icon name="apps_16"></md-icon>
          </md-tab>
          <md-tab-panel slot="panel">
            <span>Content for "WxM"</span>
            <button type="button">Cisco WxM</button>
          </md-tab-panel>
        </md-tabs>
      </md-modal>
    `;
  }
}

export const modalTemplate = html`
  <modal-template-sandbox></modal-template-sandbox>
`;
