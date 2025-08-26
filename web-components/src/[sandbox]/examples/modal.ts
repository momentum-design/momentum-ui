import { comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import "@/components/button/Button";
import "@/components/checkbox/Checkbox";
import "@/components/combobox/ComboBox";
import "@/components/form/Form";
import "@/components/input/Input";
import { Input } from "@/components/input/Input";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/modal/Modal";
import "@/components/phone-input/PhoneInput";
import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import "@/components/tabs/Tab";
import "@/components/tabs/TabPanel";
import "@/components/tabs/Tabs";
import "@/components/tooltip/Tooltip";
import { debounce } from "@/utils/helpers";
import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { dropdownObjectLongOptions } from "./dropdown";

@customElement("modal-template-sandbox")
export class ModalTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isModalOpen = false;
  @property({ type: Boolean }) isComplexModalOpen = false;
  @property({ type: Boolean }) isDialogOpen = false;
  @property({ type: Boolean }) isComplexTabsModal = false;
  @property({ type: Boolean }) isStationLoginModal = false;
  @property({ type: Boolean }) isSignoutModalOpen = false;
  @property({ type: Boolean }) isNotificationModalOpen = false;
  @property({ type: Boolean }) otherInput = false;
  @property({ type: Boolean }) isExtensionTooltipOpened = false;

  @query(".dial-number") dialInput!: Input.ELEMENT;
  @query(".international-checkbox-wrapper") checkboxWrapper!: Element;
  @query(".queueDropdown") menuOverlay!: Element;

  connectedCallback() {
    super.connectedCallback();
  }

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

  private openComplexTabsModal() {
    this.isComplexTabsModal = true;
  }

  private closeComplexTabsModal() {
    this.isComplexTabsModal = false;
  }

  private openStationLogin() {
    this.isStationLoginModal = true;
  }

  private closeStationLogin() {
    this.isStationLoginModal = false;
  }

  private toggleSignoutModal() {
    this.isSignoutModalOpen = !this.isSignoutModalOpen;
  }

  private toggleNotificationModal() {
    this.isNotificationModalOpen = !this.isNotificationModalOpen;
  }

  private handleFormatChange() {
    this.otherInput = !this.otherInput;
    document.dispatchEvent(new CustomEvent("on-widget-update"));
  }

  private readonly handleInputChange = debounce(() => {
    if (this.dialInput) {
      const shadowInput = this.dialInput.shadowRoot!.querySelector("input");
      shadowInput!.dispatchEvent(
        new CustomEvent("focus-visible", {
          composed: true,
          bubbles: true
        })
      );
    }
  }, 150);

  get signOutModalTemplate() {
    return html` <md-modal
      ?show=${this.isSignoutModalOpen}
      id="signoutModal"
      size="dialog"
      .hideFooter=${true}
      headerLabel="Sign Out Agent"
      aria-label="Sign Out Agent"
      tabindex="${"-1"}"
      ?showclosebutton=${false}
      ariaLabelClose="Close Sign Out Agent"
    >
      <div class="modal-body">
        <span> Do you want to sign out Joe Blogs? </span>
      </div>
      <div slot="footer" class="signout-btn-wrapper">
        <md-button
          class="signout-close"
          variant="secondary"
          ariaLabel="Cancel"
          type="reset"
          @click=${this.toggleSignoutModal}
        >
          Cancel
        </md-button>
        <md-button
          class="signout-submit"
          variant="primary"
          @click=${this.toggleSignoutModal}
          type="submit"
          ariaLabel="Sign out"
        >
          Sign out
        </md-button>
      </div>
    </md-modal>`;
  }

  get notificationModalTemplate() {
    return html`
      <md-modal
        .show=${this.isNotificationModalOpen}
        size="dialog"
        headerMessage="Notification header message"
        hideFooter
      >
        <p>Notification body message</p>
        <div slot="footer">
          <md-button variant="primary" @click=${this.toggleNotificationModal} type="submit" ariaLabel="OK">
            OK
          </md-button>
        </div>
      </md-modal>
    `;
  }

  render() {
    return html`
    <div style="display: flex; flex-direction: row; gap: 0.5rem; margin-bottom: 1rem;">
      <md-button @click=${this.openStationLogin} variant="primary">Open Station Login Modal</md-button>
      <md-button @click=${this.openModal} variant="primary">Open Modal</md-button>
      <md-button @click=${this.openDialog} variant="primary">Open Dialog</md-button>
      <md-button @click=${this.openComplexModal} variant="primary">Open Complex Modal</md-button>
      <md-button @click=${this.openComplexTabsModal} variant="primary">Open Complex Tabs Modal</md-button>
      <md-button @click=${this.toggleSignoutModal} variant="secondary">Open Sign Out Modal</md-button>
      <md-button @click=${this.toggleNotificationModal} variant="secondary">Open Notification Modal</md-button>
    </div>
      <md-modal ?show=${this.isStationLoginModal} closeBtnName="Submit This" @close-modal=${this.closeStationLogin}>
        <md-form class="form-class" id="international-form">
          <div class="international-checkbox-wrapper">
            <md-checkbox 
              slot="checkbox"
              .checked=${true}
              @checkbox-change=${() => {
                this.handleFormatChange();
              }}
            >
              International dialing format
            </md-checkbox>
          <md-tooltip
            ?opened=${this.isExtensionTooltipOpened}
            message="tooltip opened"
            placement="top"
          >
            <md-button
              circle
              variant="white"
              class="info-icon"
              size="20"
              @focus=${() => (this.isExtensionTooltipOpened = true)}
              @blur=${() => (this.isExtensionTooltipOpened = false)}
            >
              <md-icon name="info_16"></md-icon>
            </md-button>
          </md-tooltip>
          </div>
          ${
            this.otherInput
              ? html`
                  <md-input
                    type="tel"
                    id="international"
                    name="international-value"
                    value="88997755664"
                    countryCallingCode="+91"
                    numberPlaceholder="station Login"
                    .autofocus=${true}
                    newMomentum
                    @phoneinput-keydown=${(e: CustomEvent) => {
                      e.stopImmediatePropagation();
                    }}
                    @phoneinput-change=${(e: CustomEvent) => {
                      e.stopImmediatePropagation();
                    }}
                    @phoneinput-blur=${(e: CustomEvent) => {
                      e.stopImmediatePropagation();
                    }}
                  ></md-input>
                `
              : html`
                  <md-phone-input
                    type="tel"
                    id="national"
                    name="national-value"
                    value="222"
                    countryCallingCode="+91"
                    numberPlaceholder="station Login"
                    newMomentum
                    .autofocus=${true}
                    @phoneinput-keydown=${(e: CustomEvent) => {
                      e.stopImmediatePropagation();
                    }}
                    @phoneinput-change=${(e: CustomEvent) => {
                      e.stopImmediatePropagation();
                    }}
                    @phoneinput-blur=${(e: CustomEvent) => {
                      e.stopImmediatePropagation();
                    }}
                  ></md-phone-input>
                `
          }
        </md-form>
      </md-modal>

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
        @close-modal=${this.closeModal}
      >
        <div slot="header">
          <span>Test Slot Header</span>
        </div>

        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem
          Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
          Renaissance.
        </p>
        <md-combobox
          disabled
          .options=${comboBoxOptions}
          placeholder="Placeholder"
          .value=${[comboBoxOptions[5]]}
          newMomentum
        ></md-combobox>
        <p>
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The
          standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32
          and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H. Rackham.
        </p>
        <md-combobox .options=${comboBoxOptions} placeholder="Placeholder" .value=${[comboBoxOptions[5]]} newMomentum></md-combobox>
        <p>
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The
          standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32
          and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H. Rackham.
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
        <md-dropdown
          .options="${dropdownObjectLongOptions}"
          option-id="id"
          option-value="country"
          newMomentum
        ></md-dropdown>

        <md-button slot="footer" type="reset" variant="secondary">Reset</md-button>
        <md-button slot="footer" @click=${this.closeModal} type="submit" variant="primary">Submit</md-button>
      </md-modal>

      <md-modal
        htmlId="modal-2"
        ?show=${this.isDialogOpen}
        headerLabel="Test Dialog Header"
        size="dialog"
        closeBtnName="Ok"
        showCloseButton
        @close-modal=${this.closeDialog}
      >
        <md-input type="text" newMomentum placeholder="Type Text" style="margin-top: 4px;"></md-input>
        <p>
          Curabitur nec leo sit amet sapien eleifend accumsan at eu magna. Suspendisse potenti. Aenean lobortis aliquet
          dui, id suscipit quam consectetur quis.
        </p>
      </md-modal>

      <md-modal ?show=${this.isComplexModalOpen} closeBtnName="Submit This" @close-modal=${this.closeComplexModal}>
        <md-tabs>
          <md-tab slot="tab">
            <span>Contact History</span>
            <md-icon name="recents-bold" size="16" iconSet="momentumDesign"></md-icon>
          </md-tab>
          <md-tab-panel slot="panel">
            <span>Content for "Contact History"</span>
            <md-radiogroup checked="0">
              <md-radio slot="radio" value="Option 1">Option 1</md-radio>
              <md-radio slot="radio" value="Option 2">Option 2</md-radio>
              <md-radio slot="radio" value="Option 3">Option 3</md-radio>
              <md-radio slot="radio" value="Option 4">Option 4</md-radio>
            </md-radiogroup>
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

      <md-modal
        ?show=${this.isComplexTabsModal}
        size="small"
        hideFooter
        hideHeader
        @close-modal=${this.closeComplexTabsModal}
      >
        <div slot="header">
          <h3 class="sl-form-label">Station Login</h3>
        </div>
        <md-form @form-submitted=${() => console.info("Form Submitted!!!")} is-valid>
          <md-tabs justified>
            <md-tab slot="tab" aria-label="Dial Number">
              <span>Dial Number</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <div class="phone-fromat">
                <md-radiogroup group-label="phone-fromat" alignment="horizontal" checked="0">
                  <md-radio slot="radio" value="US" aria-label="US Format">US Format</md-radio>
                  <md-radio slot="radio" value="Other" ariaLabel="Other">Other</md-radio>
                </md-radiogroup>
              </div>

              <md-input
                type="tel"
                id="dn"
                class="dial-number"
                placeholder="Dial Number"                
                autofocus
                clear
                newMomentum
                @input-change=${this.handleInputChange}
              ></md-input>
            </md-tab-panel>
            <md-tab slot="tab" aria-label="Extension">
              <span>Extension</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <div class="extension-format">
                <md-input aria-label="Team X" type="tel" id="ext" placeholder="Team X" newMomentum></md-input>
              </div>
              <md-combobox placeholder="Choose Team" .options=${comboBoxOptions} newMomentum></md-combobox>
            </md-tab-panel>
          </md-tabs>
        </md-form>
        <div class="sl-footer" slot="footer">
          <md-button class="footer-btn" aria-label="Cancel" variant="secondary" @click=${this.closeComplexTabsModal}>
            Cancel
          </md-button>
          <md-button
            class="footer-btn"
            variant="primary"
            aria-label="Submit"
            type="submit"
            @click=${this.closeComplexTabsModal}
          >
            Submit
          </md-button>
        </div>
      </md-modal>
      <md-menu-overlay class="queueDropdown" size="large">
        <md-input
          placeholder="Search field with tabs"
          slot="menu-trigger"
          clear
          newMomentum
          autoFocus>
        </md-input>
        <div style="padding:1.25rem; width: 100%;">
        <md-tabs justified selected="0" ref={tabElm}>
        <md-tab slot="tab" aria-label={transferModal.entryPointSectionLabel} label="entry-point">
          <span>Entry Point</span>
        </md-tab>
        <md-tab-panel slot="panel">
        <md-list role="listbox">
            <md-list-item
              slot="list-item"
              type="auto"
              aria-label="item-1">
              <div
                aria-label="item-1-div"
                display-value="12345678"
                style="display: flex; alignItems: center;">
                <div style={{ paddingLeft: '12px' }}>
                  <div className="address-dn"></div>
                  <p>
                    Item-1
                  </p>
                  <p>
                    Item-1-sub
                  </p>
                </div>
              </div>
            </md-list-item>
            <md-list-item
              slot="list-item"
              type="auto"
              aria-label="item-2">
              <div
                aria-label="item-2-div"
                display-value="12345678"
                style="display: flex, alignItems: center">
                <div style={{ paddingLeft: '12px' }}>
                  <div className="address-dn"></div>
                  <p>
                    Item-2
                  </p>
                  <p>
                    Item-2-sub
                  </p>
                </div>
              </div>
            </md-list-item>
      </md-list>
        </md-tab-panel>
        <md-tab slot="tab" aria-label={transferModal.addressBookSectionLabel} label="address-book">
          <span>Address Book</span>
        </md-tab>
        <md-tab-panel slot="panel" class="address-panel">
        <md-list role="listbox">
            <md-list-item
              slot="list-item"
              type="auto"
              aria-label="item-1">
              <div
                aria-label="item-1-div"
                display-value="12345678"
                style="display: flex, alignItems: center">
                <div style={{ paddingLeft: '12px' }}>
                  <div className="address-dn"></div>
                  <p>
                    Item-1
                  </p>
                  <p>
                    Item-1-sub
                  </p>
                </div>
              </div>
            </md-list-item>
            <md-list-item
              slot="list-item"
              type="auto"
              aria-label="item-2">
              <div
                aria-label="item-2-div"
                display-value="12345678"
                style="display: flex, alignItems: center">
                <div style={{ paddingLeft: '12px' }}>
                  <div className="address-dn"></div>
                  <p>
                    Item-2
                  </p>
                  <p>
                    Item-2-sub
                  </p>
                </div>
              </div>
            </md-list-item>
      </md-list>
        </md-tab-panel>
      </md-tabs>
        </div>
      </md-menu-overlay>
      ${this.signOutModalTemplate}${this.notificationModalTemplate}
    `;
  }
}

export const modalTemplate = html` <modal-template-sandbox></modal-template-sandbox> `;
