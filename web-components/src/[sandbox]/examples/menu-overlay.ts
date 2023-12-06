import "@/components/button/Button";
import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import "@/components/input/Input";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/menu-overlay/MenuOverlay";
import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import "@/components/tabs/TabPanel";
import "@/components/tabs/Tabs";
import "@/components/tooltip/Tooltip";
import { html } from "lit-element";

const longMenuOverlayContent = () => {
  return html`
    <div style="padding:1.25rem; width: 100%">
      <md-checkbox>Default Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
      <md-checkbox checked>Default Checked Checkbox</md-checkbox>
    </div>
  `;
};

export const menuOverlayTemplate = html`
  <md-menu-overlay style="display: flex; justify-content: center;">
    <md-button slot="menu-trigger" style="margin-left: 2rem;" variant="primary">Open Menu Overlay</md-button>
    ${longMenuOverlayContent()}
  </md-menu-overlay>

  <h2>md-menu-overlay</h2>

  <h3 class="sandbox-header">optional maxHeight Prop</h3>
  <md-menu-overlay max-height="calc(100vh - 266.5px)">
    <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
    ${longMenuOverlayContent()}
  </md-menu-overlay>

  <h3 class="sandbox-header">test overlay positioning</h3>
  <div style="display: flex; margin: .5rem 0; padding: 0; justify-content: space-between">
    <div>
      <md-menu-overlay>
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem; width: 100%;">
          <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
          </md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
    </div>

    <div>
      <md-menu-overlay>
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem ; width: 100%;">
          <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
          </md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
    </div>

    <div>
      <md-menu-overlay>
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem; width: 100%;">
          <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
          </md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
    </div>
  </div>

  <h3 class="sandbox-header">test overlay positioning</h3>
  <div style="display: flex; margin: 1rem 1rem; padding: 0; justify-content: space-between">
    <div>
      <md-menu-overlay>
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem; width: 100%;">
          <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
          </md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
    </div>

    <div>
      <md-menu-overlay>
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem; width: 100%;">
          <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
          </md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
    </div>

    <div>
      <md-menu-overlay>
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem; width: 100%;">
          <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
          </md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
    </div>
  </div>

  <div class="row" style="display: flex; margin: .5rem 0">
    <h3 class="sandbox-header" style="margin: .5rem 1rem">sizes</h3>
    <md-menu-overlay size="small">
      <md-button slot="menu-trigger" variant="primary">Small Overlay</md-button>
      <div style="padding:1.25rem; width: 100%;">
        <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
        </md-input>
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
        <div style="text-align: center">
          <p style="margin-bottom: .5rem">Please complete the entire form</p>
          <md-button variant="primary">Submit</md-button>
        </div>
      </div>
    </md-menu-overlay>

    <md-menu-overlay size="large">
      <md-button slot="menu-trigger" variant="primary">Large Overlay</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
        </md-input>
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
        <div style="text-align: center">
          <p style="margin-bottom: .5rem">Please complete the entire form</p>
          <md-button variant="primary">Submit</md-button>
        </div>
      </div>
    </md-menu-overlay>

    <md-menu-overlay custom-width="800px">
      <md-button slot="menu-trigger" variant="primary">Custom Width</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
        </md-input>
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
        <div style="text-align: center">
          <p style="margin-bottom: .5rem">Please complete the entire form</p>
          <md-button variant="primary">Submit</md-button>
        </div>
      </div>
    </md-menu-overlay>
  </div>

  <h3 class="sandbox-header" style="margin: .5rem 1rem">Overlay placements with arrows</h3>
  <div class="row" style="display: flex; margin: .5rem 0">
    <md-menu-overlay placement="bottom-start" show-arrow>
      <md-button slot="menu-trigger" variant="primary">bottom-start</md-button>
      <div style="padding:1.25rem; width: 100%;">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay size="large" placement="bottom" show-arrow>
      <md-button slot="menu-trigger" variant="primary">bottom default</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay placement="bottom-end" show-arrow>
      <md-button slot="menu-trigger" variant="primary">bottom-end</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay placement="left-start" show-arrow>
      <md-button slot="menu-trigger" variant="primary">left-start</md-button>
      <div style="padding:1.25rem; width: 100%;">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay size="large" placement="left" show-arrow>
      <md-button slot="menu-trigger" variant="primary">left</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay placement="bottom-end">
          <md-button slot="menu-trigger" variant="primary">
            Open List
          </md-button>
          <md-list>
            <md-list-item slot="list-item">Neptunium</md-list-item>
            <md-list-item slot="list-item">Plutonium</md-list-item>
          </md-list>
        </md-menu-overlay>
  </div>
  <div class="row" style="display: flex; margin: .5rem 0">
    <md-menu-overlay placement="top-start" show-arrow>
      <md-button slot="menu-trigger" variant="primary">top-start</md-button>
      <div style="padding:1.25rem; width: 100%;">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay size="large" placement="top" show-arrow>
      <md-button slot="menu-trigger" variant="primary">top</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay placement="top-end" show-arrow>
      <md-button slot="menu-trigger" variant="primary">top-end</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay placement="right-start" show-arrow>
      <md-button slot="menu-trigger" variant="primary">right-start</md-button>
      <div style="padding:1.25rem; width: 100%;">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay placement="right" show-arrow>
      <md-button slot="menu-trigger" variant="primary">right</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-checkbox>Option one"</md-checkbox>
        <md-checkbox checked>Option two</md-checkbox>
      </div>
    </md-menu-overlay>

    <md-menu-overlay placement="right-end" show-arrow>
      <md-button slot="menu-trigger" variant="primary">right-end</md-button>
      <div style="margin:1.25rem; width: 100%">
        <md-checkbox>Option one"</md-checkbox>
        <md-tooltip message="tooltip within checkbox" placement="bottom">
          <md-checkbox checked>Option two</md-checkbox>
        </md-tooltip>
      </div>
    </md-menu-overlay>
  </div>
  </div>

  

  <h3 class="sandbox-header" style="margin: .5rem 1rem">with list (focus)</h3>
  <md-menu-overlay class="queueDropdown" size="large" @menu-overlay-open=${(e: any) => {
    console.log("Opening modal--");
    document.dispatchEvent(new CustomEvent("on-widget-update"));
  }}>
        <md-input
          placeholder="Search field with tabs"
          shape="pill"
          slot="menu-trigger"
          variant="primary"
          clear
          autoFocus></md-input>
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
  <md-menu-overlay show-arrow>
    <md-button slot="menu-trigger" slot="menu-trigger" variant="primary">Open List</md-button>
    <md-list label="Transuranium elements" activated="3">
      <md-list-item slot="list-item">Neptunium</md-list-item>
      <md-list-item slot="list-item">Plutonium</md-list-item>
      <md-list-item slot="list-item">Americium</md-list-item>
      <md-list-item slot="list-item">Curium</md-list-item>
      <md-list-item slot="list-item">Berkelium</md-list-item>
      <md-list-item slot="list-item">Californium</md-list-item>
    </md-list>
  </md-menu-overlay>

  <h3 class="sandbox-header" style="margin: .5rem 1rem">Without focusable content</h3>
  <md-menu-overlay
          placement="bottom-end"
          ref={menuElm}
          size="small"
          position="bottom"
          id="menu-overlay"
          max-height="180px">
          <md-button ref={menuTriggerRef} slot="menu-trigger">

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill="#78F5B8" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.5358 18C16.4148 18 16.2938 17.985 16.1738 17.955C14.1798 17.448 11.9068 16.029 9.93879 14.061C7.97079 12.093 6.55179 9.82 6.04579 7.826C5.93379 7.387 6.02979 6.929 6.30879 6.57C6.59079 6.208 7.01579 6 7.47379 6H8.74379C9.46079 6 10.1078 6.426 10.3908 7.085L10.8708 8.201C11.1178 8.774 11.0988 9.424 10.8198 9.983L10.4958 10.63C10.4698 10.682 10.4768 10.745 10.5158 10.794C11.1808 11.649 12.1918 12.653 13.2198 13.479C13.2688 13.517 13.3298 13.524 13.3818 13.499L14.0168 13.181C14.5768 12.903 15.2258 12.882 15.7998 13.129L16.9148 13.609C17.5748 13.893 17.9998 14.539 17.9998 15.257V16.526C17.9998 16.985 17.7918 17.41 17.4308 17.691C17.1688 17.894 16.8558 18 16.5358 18Z"
            fill="#03612C"
          />
          </svg>
          <span class="split-separator"> | </span>
          <span>+2 Participants</span>
          
          </md-button>
          <md-list class="md-list-conference" label="Transuranium elements">
            <md-list-item class="md-list-item-conference" slot="list-item">
              <span className="conference-span-icon">
                <md-icon class="split-icon" name="icon-device-in-room_12" size="12"></md-icon>
                {contactInformation.destAgentName}
              </span>
              <span className="conference-timer">
                <StateTimer color="none" timerTimeStamp={contactInformation.consultTimeStamp!} />
              </span>
            </md-list-item>
            <md-list-item class="md-list-item-conference" slot="list-item">
              <span className="conference-span-icon">
                <md-icon class="split-icon" name="icon-single-number-reach_16" size="12"></md-icon>
                {agentCallMonitoringState?.supervisorName}
              </span>
              <span className="conference-timer">
                <StateTimer color="none" timerTimeStamp={agentCallMonitoringState?.eventTime} />
              </span>
            </md-list-item>
          </md-list>
        </md-menu-overlay>

  <h3 class="sandbox-header" style="margin: .5rem 1rem">Open focusable content</h3>
  <md-menu-overlay is-open show-arrow>
    <md-button slot="menu-trigger" slot="menu-trigger" variant="primary">Click</md-button>
    <div style="margin:1.25rem; width: 100%">
      <md-tabs>
        <md-tab slot="tab" name="contactHistory">
          <span>Contact History</span>
          <md-icon name="recents_16"></md-icon>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
          <button type="button">Contact History</button>
          <div style="margin-top:10px">
            <md-radiogroup checked="0">
              <md-radio slot="radio" value="Option 1">Option 1</md-radio>
              <md-radio slot="radio" value="Option 2">Option 2</md-radio>
              <md-radio slot="radio" value="Option 3">Option 3</md-radio>
              <md-radio slot="radio" value="Option 4">Option 4</md-radio>
            </md-radiogroup>
           
          </div>
        </md-tab-panel>
        <md-tab slot="tab" name="WXM">
          <span>Cisco WxM</span>
          <md-icon name="apps_16"></md-icon>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
          <button type="button">Cisco WxM</button>
        </md-tab-panel>
      </md-tabs>
    </div>
  </md-menu-overlay>

  <h3 class="sandbox-header" style="margin: .5rem 1rem">Empty</h3>
  <md-menu-overlay show-arrow>
    <md-button slot="menu-trigger" slot="menu-trigger" variant="primary">Click</md-button>
      <div style="margin:1.25rem; width: 100%">
      </div>
  </md-menu-overlay>

  <h3 class="sandbox-header" style="margin: .5rem 1rem">With Tooltip Inside</h3>
  <md-menu-overlay show-arrow>
    <md-button slot="menu-trigger" slot="menu-trigger" variant="primary">Click</md-button>
      <div style="margin:1.25rem; width: 100%">
      <md-tooltip message="tooltip within overlay" placement="top">
        <span>Tooltip Trigger Text</span>
        </md-tooltip>
      </div>
  </md-menu-overlay>

  <h3 class="sandbox-header" style="margin: .5rem 1rem">With Autofocused Content Inside</h3>
  <md-menu-overlay show-arrow>
    <md-button slot="menu-trigger" slot="menu-trigger" variant="primary">Click</md-button>
      <div style="margin:1.25rem; width: 100%">
          <md-checkboxgroup group-label="group_process" alignment="horizontal">
            <md-checkbox slot="checkbox">Option one"</md-checkbox>
            <md-checkbox slot="checkbox" checked>Option two</md-checkbox>
          </md-checkboxgroup>
          <md-input autofocus placeholder="Enter Text" shape="pill" clear></md-input>
      </div>
  </md-menu-overlay>
  
  <h3 class="sandbox-header" style="margin: .5rem 1rem">Menu Overlay toggle with hover</h3>
  <md-menu-overlay allow-hover-toggle placement="right">
    <md-button slot="menu-trigger" slot="menu-trigger" variant="primary">Hover</md-button>
      <div style="margin:1.25rem; width: 100%">
      <md-tooltip message="tooltip within overlay" placement="top">
        <span>Tooltip Trigger Text</span>
        </md-tooltip>
      </div>
  </md-menu-overlay>
  </div>
`;
