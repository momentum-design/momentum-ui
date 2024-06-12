import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/menu-overlay/MenuOverlay";
import "@/components/tabs/Tab";
import { TabCloseClickEvent } from "@/components/tabs/Tab";
import "@/components/tabs/TabPanel";
import "@/components/tabs/Tabs";
import "@/components/tooltip/Tooltip";
import svgWxm from "@img/wxm.svg";
import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { nanoid } from "nanoid";
import { comboBoxOptions } from "@/[sandbox]/sandbox.mock";

const tabsOverlayHtmlList = ["All templates", "Only Fb Template", ...Array(20)].map(
  (value, index, array) => html`
    <md-tab slot="tab">
      <md-icon name="recents_16"></md-icon>
      <span>${value || "Tab " + index}</span>
    </md-tab>
    <md-tab-panel slot="panel">
      <span>Content for "Tab ${index}"</span>
    </md-tab-panel>
  `
);

@customElement("tabs-order-prefs-example")
export class TabsOrderPrefsExample extends LitElement {
  static get styles() {
    return [
      css`
        .menu-trigger-button {
          height: 100%;
          background-color: white;
          border: none;
        }

        .menu-trigger-button:focus {
          box-shadow: 0 0 0 1.5px var(--md-blue-60);
          outline: none;
          border-radius: 4px;
        }

        .menu-trigger-button:hover {
          background-color: #dcdcdc;
          border-radius: 4px;
        }
      `
    ];
  }

  handleResetTabs(e: any) {
    this.shadowRoot!.querySelector("md-tabs")!.dispatchEvent(
      new CustomEvent("clear-tab-order-prefs", {
        detail: {
          compUniqueId: "tabs-test-component"
        },
        composed: true,
        bubbles: true
      })
    );
  }

  moreOptions = () => html`
    <md-menu-overlay slot="settings" size="small" style="display: flex; justify-content: center;height: 100%;">
      <button class="menu-trigger-button" slot="menu-trigger">
        <md-icon name="icon-more-adr_16"></md-icon>
      </button>
      <div style="padding: 16px">
        <div>
          <md-button
            @click=${(e: MouseEvent) => {
              this.handleResetTabs(e);
            }}
            variant="primary"
            ><span slot="text">Reset</span></md-button
          >
        </div>
      </div>
    </md-menu-overlay>
  `;

  render() {
    return html`
      <div style="max-width: 600px; padding-bottom: 35px;">
        <h3 style="margin: 0;">Retainable md-tabs order and reset to default order - Inbuilt feature</h3>
        <p style="margin: 0; padding-bottom: 8px;">
          Inbuilt feature to store tabsOrder in <code>localStorage</code> and reset to default order using an event
        </p>
        <p style="margin: 0; padding-bottom: 8px;">
          This inbuilt feature will work only if the below conditions are satisfied.
        </p>
        <ul>
            <li><code>md-tabs</code> tag must have <i>draggable</i> and <i>comp-unique-id</i> attributes.</li>
            <li><i>comp-unique-id</i> attribute value should be unique in the application, to avoid conflict of tabs order</li>
            <li>Each pair of <code>md-tab</code> and <code>md-tab-panel</code> should have <i>name</i> attribute </li>
          </ul>
        <md-tabs persist-selection tabs-id="tabOrder" draggable comp-unique-id="tabs-test-component">
          <md-tab slot="tab" name="History" closable="custom" label="History">
            <md-icon name="recents_16"></md-icon>
            <span>Contact History</span>
          </md-tab>
          <md-tab-panel name="History" slot="panel">
            <span>Content for "Contact History"</span>
          </md-tab-panel>
          <md-tab slot="tab" name="WxM" closable="custom" label="WxM">
            <md-icon name="apps_16"></md-icon>
            <span>Cisco WxM</span>
          </md-tab>
          <md-tab-panel name="WxM" slot="panel">
            <span>Content for "WxM"</span>
          </md-tab-panel>
          <md-tab name="Answer" slot="tab">
            <md-icon name="alarm_16"></md-icon>
            <span>Cisco Answer</span>
          </md-tab>
          <md-tab-panel name="Answer" slot="panel">
            <span>Content for "Cisco Answer"</span>
          </md-tab-panel>
          <md-tab slot="tab" name="Widgets" closable="auto">
            <md-icon name="alert_16"></md-icon>
            <span>Cisco Widgets</span>
          </md-tab>
          <md-tab-panel name="Widgets" slot="panel">
            <span>Content for "Cisco Widgets"</span>
          </md-tab-panel>
          <md-tab slot="tab" name="News" closable="auto">
            <md-icon name="browser_16"></md-icon>
            <span>Cisco News</span>
          </md-tab>
          <md-tab-panel name="News" slot="panel">
            <span>Content for "Cisco News"</span>
          </md-tab-panel>
          <md-tab slot="tab" name="Weather" closable="auto">
            <md-icon name="calendar-month_16"></md-icon>
            <span>Cisco Weather</span>
          </md-tab>
          <md-tab-panel name="Weather" slot="panel">
            <span>Content for "Cisco Weather"</span>
          </md-tab-panel>
          ${this.moreOptions()}
        </md-tabs>
      </div>
    `;
  }
}


@customElement("default-tabs-sandbox")
export class TabsTemplateSandbox extends LitElement {
  @internalProperty() private tabs: any = {};
  @internalProperty() private isModalOpen = false;
  defaultTabsOrder = ["WxM", "History", "Answer", "Admins", "Widgets", "News", "Weather", "Turbo"];
  @internalProperty() private currentTabsOrder = this.defaultTabsOrder;
  @internalProperty() private isSingleButtonResetEnabled = false;
  closeTabName = "";

  private setUpTabs() {
    this.tabs = {
      History: `
        <md-tab slot="tab" name="History" closable="custom" label="History">
          <md-icon name="recents_16"></md-icon>
          <span>Contact History</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
      `,
      WxM: `
        <md-tab slot="tab" name="WxM" closable="custom" label="WxM">
          <md-icon name="apps_16"></md-icon>
          <span>Cisco WxM</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
      `,
      Answer: `
        <md-tab slot="tab" name="Answer">
          <md-icon name="alarm_16"></md-icon>
          <span>Cisco Answer</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Answer"</span>
        </md-tab-panel>
      `,
      Admins: `
        <md-tab slot="tab" name="Admins" closable="auto">
          <md-icon name="admin_16"></md-icon>
          <span>Cisco Admins</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Admins"</span>
        </md-tab-panel>
      `,
      Widgets: `
        <md-tab slot="tab" name="Widgets" closable="auto">
          <md-icon name="alert_16"></md-icon>
          <span>Cisco Widgets</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Widgets"</span>
        </md-tab-panel>
      `,
      News: `
        <md-tab slot="tab" name="News" closable="auto">
          <md-icon name="browser_16"></md-icon>
          <span>Cisco News</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco News"</span>
        </md-tab-panel>
      `,
      Weather: `
        <md-tab slot="tab" name="Weather" closable="auto">
          <md-icon name="calendar-month_16"></md-icon>
          <span>Cisco Weather</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Weather"</span>
        </md-tab-panel>
      `,
      Turbo: `
        <md-tab slot="tab" name="Turbo" closable="auto">
          <md-icon name="camera-photo_16"></md-icon>
          <span>Cisco Turbo</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Turbo"</span>
        </md-tab-panel>
      `
    };
  }

  static get styles() {
    return [
      css`
        .menu-trigger-button {
          height: 100%;
          background-color: white;
          border: none;
        }

        .menu-trigger-button:focus {
          box-shadow: 0 0 0 1.5px var(--md-blue-60);
          outline: none;
          border-radius: 4px;
        }

        .menu-trigger-button:hover {
          background-color: #dcdcdc;
          border-radius: 4px;
        }
      `
    ];
  }

  private handleTabClick(event: any) {
    console.log(event);
    const draggableTabsOrder = event.detail.tabsOrder;
    localStorage.setItem("tabsOrder", draggableTabsOrder);
  }

  private handleTabCustomClose(event: CustomEvent<TabCloseClickEvent>) {
    console.log(event);
    this.closeTabName = event.detail.name;
    this.isModalOpen = true;
  }

  private closeTab() {
    this.currentTabsOrder = this.currentTabsOrder.filter((tabName: any) => {
      return tabName !== this.closeTabName;
    });
    this.isModalOpen = false;
  }

  private setupTabsEvents() {
    this.addEventListener("selected-changed", this.handleTabClick as EventListener);
    this.addEventListener("tab-close-click", this.handleTabCustomClose as EventListener);
  }

  private handleCheckboxChange(event: any, tabLabel: string) {
    if (event && tabLabel) {
      const path = event.composedPath();
      const checkboxElement = Array.from(path).find(
        element => (element as HTMLElement).nodeName.toLowerCase() === "md-checkbox"
      );
      if (checkboxElement) {
        const isCheckboxChecked = (checkboxElement as HTMLInputElement).checked;
        const tabsOrderCopy = [...this.currentTabsOrder];
        if (!isCheckboxChecked) {
          const index = this.currentTabsOrder.indexOf(tabLabel);
          tabsOrderCopy.splice(index, 1);
        } else {
          const index = this.defaultTabsOrder.indexOf(tabLabel);
          tabsOrderCopy.splice(index, 0, tabLabel);
        }
        this.currentTabsOrder = tabsOrderCopy;
      }
    }
  }

  handleResetTabs(event: MouseEvent) {
    event.preventDefault();
    this.currentTabsOrder = [...this.defaultTabsOrder];
    localStorage.setItem("tabsOrder", this.currentTabsOrder.join(","));
  }

  handleCloseAll(event: MouseEvent) {
    event.preventDefault();
    this.currentTabsOrder = [];
  }

  handleToggleClick() {
    this.isSingleButtonResetEnabled = !this.isSingleButtonResetEnabled;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupTabsEvents();
    this.setUpTabs();
    const draggableTabsOrder: any = localStorage.getItem("tabsOrder");
    if (draggableTabsOrder) this.currentTabsOrder = draggableTabsOrder.split(",");
  }

  render() {
    return html`
      <div style="max-width: 600px; padding-top: 16px;">
        <h3 style="margin: 0;">Retainable Horizontal md-tabs with More button</h3>
        <p style="margin: 0; padding-bottom: 8px;">Stores tabOrder in Local Storage and also has custom close action</p>
        <md-toggle-switch @click=${() => this.handleToggleClick()} htmlId="toggleSwitch1">
          Single Button Reset
        </md-toggle-switch>
        <div>
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
      <md-tabs justified>
            <md-tab slot="tab" label="Dial Number">
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
                shape="pill"
                autofocus
                clear
              ></md-input>
            </md-tab-panel>
            <md-tab slot="tab" label="Extension">
              <span>Extension</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <div class="extension-format">
                <md-input aria-label="Team X" type="tel" id="ext" placeholder="Team X" shape="pill"></md-input>
              </div>
              <md-combobox placeholder="Choose Team" .options=${comboBoxOptions}></md-combobox>
            </md-tab-panel>
          </md-tabs>
          <md-tabs selected="0" persist-selection tabs-id="tabOrder"  draggable justified>
            ${repeat(
              this.currentTabsOrder,
              tabElement => nanoid(10),
              tabElement => html`
                ${unsafeHTML(this.tabs[tabElement])}
              `
            )}
            ${!this.isSingleButtonResetEnabled
              ? html`
                  <md-menu-overlay
                    slot="settings"
                    size="small"
                    style="display: flex; justify-content: center;height: 100%;"
                  >
                    <button class="menu-trigger-button" slot="menu-trigger">
                      <md-icon name="icon-more-adr_16"></md-icon>
                    </button>
                    <div style="padding: 16px">
                      <div>
                        <md-button @click=${(e: MouseEvent) => this.handleCloseAll(e)} variant="secondary"
                          ><span slot="text">Close All</span></md-button
                        >
                        <md-button @click=${(e: MouseEvent) => this.handleResetTabs(e)} variant="primary"
                          ><span slot="text">Reset</span></md-button
                        >
                      </div>
                      <p>Unselect Tabs to Hide</p>
                      <md-checkboxgroup style="display: flex" group-label="group_process">
                        ${this.defaultTabsOrder.map(tabLabel => {
                          return html`
                            <md-checkbox
                              checked
                              @checkbox-change=${(e: Event) => this.handleCheckboxChange(e, tabLabel)}
                              slot="checkbox"
                              >${tabLabel}</md-checkbox
                            >
                          `;
                        })}
                      </md-checkboxgroup>
                    </div>
                  </md-menu-overlay>
                `
              : html`
                  <button
                    slot="settings"
                    class="menu-trigger-button"
                    @click=${(e: MouseEvent) => this.handleResetTabs(e)}
                  >
                    <md-tooltip placement="bottom" message=${"Reset Tabs"}>
                      <md-icon name="icon-reset_16"></md-icon>
                    </md-tooltip>
                  </button>
                `}
          </md-tabs>
        </div>
        <br />
        <md-modal htmlId="modal-1" ?show=${this.isModalOpen} size="dialog" hideFooter hideHeader noExitOnEsc>
          <div slot="header">
            <span>Close Tab Confirmation</span>
          </div>
          <p>Are you sure you want to close the Tab?</p>
          <md-button slot="footer" @click="${() => (this.isModalOpen = false)}">Cancel</md-button>
          <md-button slot="footer" @click="${this.closeTab}" type="submit">Confirm</md-button>
        </md-modal>
      </div>
    `;
  }
}

export const tabsTemplate = html`
  <default-tabs-sandbox></default-tabs-sandbox>
  <tabs-order-prefs-example></tabs-order-prefs-example>
  <div style="max-width: 600px;">
    <h3>Draggable horizontal md-tabs with More button</h3>
    <div>
      <md-tabs selected="2" draggable>
        <md-tab disabled slot="tab" name="History" closable="auto" label="History">
          <md-icon name="recents_16"></md-icon>
          <span>Contact History</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="WxM" closable="auto" label="WxM">
          <span style="height: 16px; width: 16px"><img src="${svgWxm}"/></span>
          <span>Cisco WxM</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="Answer" closable="auto">
          <md-icon name="alarm_16"></md-icon>
          <md-tooltip placement="top" message="Cisco Answer for very very long label">
            <span class="text-ellipsis">Cisco Answer for very very long label</span>
          </md-tooltip>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Answer"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="Admins" closable="auto">
          <md-icon name="admin_16"></md-icon>
          <span>Cisco Admins</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Admins"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="Widgets" closable="auto">
          <md-icon name="alert_16"></md-icon>
          <span>Cisco Widgets</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Widgets"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="News" closable="auto">
          <md-icon name="browser_16"></md-icon>
          <span>Cisco News</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco News"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="Weather" closable="auto">
          <md-icon name="calendar-month_16"></md-icon>
          <span>Cisco Weather</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Weather"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="Turbo" closable="auto">
          <md-icon name="camera-photo_16"></md-icon>
          <span>Cisco Turbo</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Turbo"</span>
        </md-tab-panel>
      </md-tabs>
    </div>
    <br />
    <h3>md-tabs draggable tabs without closable property</h3>
    <div>
      <md-tabs selected="2" justified draggable>
        <md-tab slot="tab" name="History" label="History">
          <md-icon name="recents_16"></md-icon>
          <span>Contact History</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="WxM" label="WxM">
          <span style="height: 16px; width: 16px"><img src="${svgWxm}"/></span>
          <span>Cisco WxM</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="Answer">
          <md-icon name="alarm_16"></md-icon>
          <span>Cisco Answer</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Answer"</span>
        </md-tab-panel>
      </md-tabs>
    </div>
    <br />
    <h3>md-tabs draggable each with a closable property</h3>
    <div>
      <md-tabs selected="0" draggable>
        <md-tab slot="tab" closable="auto" name="History" label="History">
          <md-icon name="recents_16"></md-icon>
          <span>Contact History</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="auto" name="WxM" label="WxM">
          <span style="height: 16px; width: 16px"><img src="${svgWxm}"/></span>
          <span>Cisco WxM</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
        <md-tab slot="tab" closable="auto" name="Answer">
          <md-icon name="alarm_16"></md-icon>
          <span>Cisco Answer</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Answer"</span>
        </md-tab-panel>
      </md-tabs>
    </div>
    <br />
    <div style="max-width: 400px;">
      <h3>md-tabs justified</h3>
      <md-tabs draggable justified>
        <md-tab slot="tab" name="History">
          <span>All</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="History">
          <span style="height: 16px; width: 16px"><img src="${svgWxm}"/></span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="History">
          <md-icon name="browser_16"></md-icon>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Third Tab"</span>
        </md-tab-panel>
        <md-tab slot="tab" name="History">
          <md-icon name="alert_16"></md-icon>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Fourth Tab"</span>
        </md-tab-panel>
      </md-tabs>
    </div>
  </div>
  <br />
  <div>
    <h3>md-tabs in overlay</h3>
    <md-menu-overlay custom-width="360px" placement="top-start">
      <style>
        md-menu-overlay::part(overlay-content) {
          height: 360px !important;
        }
      </style>
      <md-tooltip slot="menu-trigger" placement="right" message="Click to show tabs in overlay menu">
        <md-button hasRemoveStyle type="button" class="mv-predefined-icon">
          <md-icon name="icon-response_16" />
        </md-button>
      </md-tooltip>
      <div style="width: 100%;">
        <md-tabs selected="0" more-items-scroll-limit="4">
          ${repeat(tabsOverlayHtmlList, _html => _html)}
        </md-tabs>
      </div>
    </md-menu-overlay>
  </div>
  <br />
  <div style="height: 500px;">
    <h3>md-tabs vertical</h3>
    <md-tabs direction="vertical">
      <md-tab slot="tab" name="History">
        <md-icon name="recents_16"></md-icon>
        <span>Contact History</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Contact History"</span>
      </md-tab-panel>
      <md-tab slot="tab" name="History">
        <span style="height: 16px; width: 16px"><img src="${svgWxm}"/></span>
        <span>Cisco WxM</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "WxM"</span>
      </md-tab-panel>
      <md-tab slot="tab" name="History">
        <md-icon name="alarm_16"></md-icon>
        <span>Cisco Answer</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Cisco Answer"</span>
      </md-tab-panel>
      <md-tab slot="tab" name="History">
        <md-icon name="camera-photo_16"></md-icon>
        <span>Cisco Turbo</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Cisco Turbo"</span>
      </md-tab-panel>
    </md-tabs>
  </div>
`;
