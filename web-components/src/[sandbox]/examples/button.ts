import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/spinner/Spinner";
import "@/components/tooltip/Tooltip";
import { css, customElement, html, LitElement } from "lit-element";

@customElement("button-template-sandbox")
export class ButtonTemplateSandbox extends LitElement {
  toggleIsActive(element: EventTarget | null) {
    if (!element) {
      return;
    }

    const el = element as HTMLElement & { isActive?: boolean };
    el.isActive = !el.isActive;

    //demonstrate toggle an icon if isActive is set
    const icon = el.querySelector('md-icon[slot="icon"]');
    if (icon) {
      icon.setAttribute("name", el.isActive ? "chat-active_16" : "chat_16");
    }
  }

  static get styles() {
    return [
      css`
        .status-state-button::part(button) {
          width: 206px;
        }

        .status-button__children {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .status-button__children .status-indicator-container {
          display: flex;
          align-items: center;
          border-radius: 50%;
        }

        .status-label {
          flex-grow: 1;
          text-align: left;
          width: 1%;
          padding: 0.5px 0 0 calc(4px * 2);
        }

        .status-label.available {
          color: var(--avatar-presence-active);
        }

        .status-label.engaged {
          color: var(--avatar-presence-engaged);
        }

        .status-label.idle {
          color: var(--avatar-presence-inactive);
        }

        .status-label.rona {
          color: var(--avatar-presence-rona);
        }

        .status-time {
          color: var(--md-secondary-text-color);
        }

        .status-arrow {
          margin-left: 8px;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Disabled</h3>
        <md-button disabled><span slot="text">disabled</span></md-button>
        <md-button variant="primary" disabled><span slot="text">disabled</span></md-button>
        <md-button variant="secondary" disabled><span slot="text">secondary disabled</span></md-button>
        <md-button variant="ghost" disabled><span slot="text">ghost disabled</span></md-button>
        <md-button variant="primary" tab-index="-1" color="violet"><span slot="text">no disabled</span></md-button>
        <md-button loading circle><span slot="text">loading</span></md-button>
        <md-button loading><span slot="text">loading</span></md-button>
        <md-button variant="green" circle loading>
          <md-icon slot="icon" name="pause_16"></md-icon>
          <span slot="text">loading</span>
        </md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">With Click Function</h3>
        <md-button><span slot="text">click function</span></md-button>
        <md-button disabled><span slot="text">disabled click</span></md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Colors</h3>
        <md-button color="color-none"><span slot="text">None</span></md-button>
        <md-button><span slot="text">Default</span></md-button>
        <md-button color="blue"><span slot="text">Blue</span></md-button>
        <md-button color="mint"><span slot="text">Mint</span></md-button>
        <md-button color="white"><span slot="text">White</span></md-button>
        <md-button variant="primary"><span slot="text">Primary</span></md-button>
        <md-button variant="secondary"><span slot="text">Secondary</span></md-button>
        <md-button variant="primary" color="violet"><span slot="text">Variant + Color</span></md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Call Control Buttons (40)</h3>
        <md-button variant="secondary" size="40">
          <md-icon slot="icon" name="pause_16"></md-icon>
          <span slot="text">Hold</span>
        </md-button>
        <md-button variant="red" size="40">
          <md-icon slot="icon" name="clear_16"></md-icon>
          <span slot="text">End</span>
        </md-button>

        <md-button variant="secondary" size="40" tag="a"><span slot="text">Link</span></md-button>
        <md-button variant="secondary" size="40" tag="a">
          <md-icon slot="icon" name="phone-reply_16"></md-icon>
          <span slot="text">Link</span>
        </md-button>
        <md-button variant="green" circle loading size="40">
          <md-icon slot="icon" name="pause_16"></md-icon>
          <span slot="text">loading</span>
        </md-button>
        <md-button variant="green" loading size="40">
          <md-icon slot="icon" name="pause_16"></md-icon>
          <span slot="text">loading</span>
        </md-button>

        <md-button size="40" color="white" outline>
          <md-icon slot="icon" name="pause_16"></md-icon>
          <span slot="text">Outlined</span>
        </md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Email Buttons (32)</h3>
        <md-button><md-icon slot="icon" name="phone-reply_16"></md-icon><span slot="text">Reply</span></md-button>
        <md-button variant="secondary"
          ><md-icon slot="icon" name="attachment_16"></md-icon><span slot="text">Attach Files</span></md-button
        >
        <md-button variant="green" loading size="32"
          ><md-icon slot="icon" name="pause_16"></md-icon><span slot="text">loading</span></md-button
        >
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Button Sizes</h3>
        <md-button size="size-none"><span slot="text">size-none</span></md-button>
        <md-button size="24"><span slot="text">24</span></md-button>
        <md-button size="28"><span slot="text">28</span></md-button>
        <md-button size="32"><span slot="text">32</span></md-button>
        <md-button size="36"><span slot="text">36</span></md-button>
        <md-button size="40"><span slot="text">40</span></md-button>
        <md-button size="52"><span slot="text">52</span></md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Circle Button Sizes (icon)</h3>
        <md-button circle size="size-none"><md-icon slot="icon" name="clear_16"></md-icon></md-button>
        <md-button circle size="24"><md-icon slot="icon" name="clear_16"></md-icon></md-button>
        <md-button circle size="28"><md-icon slot="icon" name="clear_16"></md-icon></md-button>
        <md-button circle size="32"><md-icon slot="icon" name="clear_16"></md-icon></md-button>
        <md-button circle size="36"><md-icon slot="icon" name="clear_16"></md-icon></md-button>
        <md-button circle size="40"><md-icon slot="icon" name="clear_16"></md-icon></md-button>
        <md-button circle size="52"><md-icon slot="icon" name="clear_16"></md-icon></md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Circle Button Sizes (text)</h3>
        <md-button circle size="size-none"><span slot="text">no size</span></md-button>
        <md-button circle size="20"><span slot="text">20</span></md-button>
        <md-button circle size="24"><span slot="text">24</span></md-button>
        <md-button circle size="28"><span slot="text">28</span></md-button>
        <md-button circle size="32"><span slot="text">32</span></md-button>
        <md-button circle size="36"><span slot="text">36</span></md-button>
        <md-button circle size="40"><span slot="text">40</span></md-button>
        <md-button circle size="44"><span slot="text">44</span></md-button>
        <md-button circle size="52"><span slot="text">52</span></md-button>
        <md-button circle size="56"><span slot="text">56</span></md-button>
        <md-button circle size="68"><span slot="text">68</span></md-button>
        <md-button circle size="72"><span slot="text">72</span></md-button>
        <md-button circle size="84"><span slot="text">84</span></md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Variants</h3>
        <md-button variant="primary"><span slot="text">primary</span></md-button>
        <md-button variant="secondary"><span slot="text">secondary</span></md-button>
        <md-button variant="red"><span slot="text">red</span></md-button>
        <md-button variant="green"><span slot="text">green</span></md-button>
        <md-button variant="ghost"><span slot="text">ghost</span></md-button>
        <md-button variant="white"><span slot="text">White</span></md-button>
        <md-button variant="promotional"><span slot="text">Promotional</span></md-button>
        <md-button variant="tab"><span slot="text">tab</span></md-button>
        <md-button variant="tab" isActive><span slot="text">tab isActive</span></md-button>
        <md-button variant="available">
          <md-icon slot="icon" name="check-circle-active_16" color="var(--avatar-presence-active)"></md-icon>
          <span slot="text">Available</span>
        </md-button>
        <md-button variant="unavailable"><span slot="text">Unavailable</span></md-button>
        <md-button variant="engaged"><span slot="text">Engaged</span></md-button>
        <md-button variant="idle"><span slot="text">Idle</span></md-button>
      </div>

      <h3 class="sandbox-header" style="margin: .5rem 1rem">Toggle state variant button</h3>
      <div class="row" style="display: flex; margin: .5rem 0">
        <md-button variant="tab" size="40" @click=${(e: Event) => this.toggleIsActive(e.target)}>
          <span slot="text">tab</span>
        </md-button>
        <md-button variant="secondary" size="32" @click=${(e: Event) => this.toggleIsActive(e.target)}>
          <span slot="text">secondary</span>
        </md-button>
        <md-button variant="tab" size="40" circle @click=${(e: Event) => this.toggleIsActive(e.target)}>
          <md-icon slot="icon" name="chat_16"></md-icon>
        </md-button>
      </div>

      <h3 class="sandbox-header" style="margin: .5rem 1rem">Outline Color Schema</h3>
      <div class="row" style="display: flex; margin: .5rem 0">
        <md-button color="blue" outline><span slot="text">Blue Outline</span></md-button>
        <md-button color="dark-gray" outline><span slot="text">Dark Gray Outline</span></md-button>
        <md-button color="red" outline><span slot="text">Red Outline</span></md-button>
        <md-button color="green" outline><span slot="text">Green Outline</span></md-button>
        <md-button color="white" outline><span slot="text">White Outline</span></md-button>
        <md-button color="orange" outline><span slot="text">Orange Outline</span></md-button>
        <md-button color="mint" outline><span slot="text">Mint Outline</span></md-button>
      </div>
      <div class="row" style="display: flex; margin: .5rem 0">
        <md-button color="yellow" outline><span slot="text">Yellow Outline</span></md-button>
        <md-button color="duck-egg" outline><span slot="text">Duck Egg Outline</span></md-button>
        <md-button color="purple" outline><span slot="text">Purple Outline</span></md-button>
        <md-button color="violet" outline><span slot="text">Violet Outline</span></md-button>
        <md-button color="pink" outline><span slot="text">Pink Outline</span></md-button>
        <md-button color="cyan" outline><span slot="text">Cyan Outline</span></md-button>
      </div>
      <br />

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Different Tags</h3>
        <md-button tag="a" variant="green">anchor</md-button>
        <md-button tag="button" variant="green">button</md-button>
        <md-button tag="input" variant="green" value="input">input</md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Different Types</h3>
        <md-button type="button">button</md-button>
        <md-button type="reset">reset</md-button>
        <md-button type="submit">submit</md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Links</h3>
        <md-button variant="secondary" tag="a" ariaLabel="Link">
          <md-icon slot="icon" name="pause_16"></md-icon>
          <span slot="text">Link</span>
        </md-button>
        <md-button variant="secondary" tag="a" ariaLabel="Link"><span slot="text">Link</span></md-button>
        <md-button variant="secondary" tag="a" ariaLabel="Link">Link</md-button>
        <md-button variant="secondary" tag="a" variant="primary" ariaLabel="Link">Link</md-button>
        <md-button variant="secondary" tag="a" variant="secondary" ariaLabel="Link">Link</md-button>
        <md-button variant="secondary" tag="a" variant="red" ariaLabel="Link">Link</md-button>
        <md-button variant="secondary" tag="a" variant="green" ariaLabel="Link">Link</md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Text & Icon (circle) Tooltip</h3>
        <md-tooltip message="loading" placement="top">
          <md-button loading circle><span slot="text">Reply</span></md-button>
        </md-tooltip>
        <md-tooltip message="Pause" placement="bottom">
          <md-button variant="green" circle>
            <md-icon slot="icon" name="pause_16"></md-icon>
            <span slot="text">Pause</span>
          </md-button>
        </md-tooltip>
        <md-tooltip message="Test text" placement="left">
          <md-button variant="primary" title="text title">
            <md-icon slot="icon" name="pause_16"></md-icon>
            <span slot="text">Pause</span>
          </md-button>
        </md-tooltip>
        <md-tooltip message="Test text" disabled>
          <md-button variant="green" title="text title"><span slot="text">(with disabled tooltip)</span></md-button>
        </md-tooltip>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Just Icon</h3>
        <md-button variant="red" circle><md-icon slot="icon" name="pause_16"></md-icon></md-button>
        <md-button variant="red" circle loading></md-button>
        <md-button variant="red" disabled circle>
          <md-icon slot="icon" name="handset_16"></md-icon>
        </md-button>
        <md-button variant="red"><md-icon slot="icon" name="pause_16"></md-icon></md-button>
        <md-button variant="red" loading></md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Both Icon + Text</h3>
        <md-button variant="red">
          <md-icon slot="icon" name="pause_16"></md-icon>
          <span slot="text">Hold</span>
        </md-button>
        <md-button loading><span slot="text">Reply</span></md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0;">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Text Ellipsis</h3>
        <md-button variant="primary" label="button" maxWidth="100px">
          <span slot="text">Text Slot Button Armageddon</span>
        </md-button>
        <md-button variant="primary" loading maxWidth="100px">
          <span slot="text">Loading Button Armageddon</span>
        </md-button>
        <md-button variant="primary" width="300px">
          <md-icon slot="icon" name="pause_16"></md-icon>
          <span slot="text">Icon Button Armageddon</span>
        </md-button>
      </div>

      <div class="row" style="display: flex; margin: .5rem 0">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Button with Aria Live</h3>
        <md-button ariaLive="assertive" type="button">button</md-button>
      </div>

      <h3 class="sandbox-header" style="margin: .5rem 1rem">State button</h3>
      <div class="row" style="display: flex; margin: .5rem 0; gap: 8px;">
        <md-button variant="available" class="status-state-button">
          <div class="status-button__children">
            <span class="status-indicator-container">
              <md-icon
                slot="icon"
                name="unread-filled"
                size="16"
                iconSet="momentumDesign"
                color="var(--avatar-presence-active)"
              ></md-icon>
            </span>
            <span class="status-label available"> Available </span>
            <span class="status-time">10:11</span>
            <md-icon class="status-arrow" name="arrow-down-bold" iconSet="momentumDesign" size="16"></md-icon>
          </div>
        </md-button>
        <md-button variant="idle" class="status-state-button">
          <div class="status-button__children">
            <span class="status-indicator-container">
              <md-icon
                slot="icon"
                name="recents-presence-badge-filled"
                iconSet="momentumDesign"
                color="var(--avatar-presence-inactive)"
              ></md-icon>
            </span>
            <span class="status-label idle"> Idle </span>
            <span class="status-time">10:11</span>
            <md-icon class="status-arrow" name="arrow-down-bold" iconSet="momentumDesign" size="16"></md-icon>
          </div>
        </md-button>
        <md-button variant="unavailable" class="status-state-button">
          <div class="status-button__children">
            <span class="status-indicator-container">
              <md-icon
                slot="icon"
                name="recents-presence-badge-filled"
                iconSet="momentumDesign"
                size="16"
                color="var(--avatar-presence-rona)"
              ></md-icon>
            </span>
            <span class="status-label rona"> RONA </span>
            <span class="status-time">10:11</span>
            <md-icon class="status-arrow" name="arrow-down-bold" iconSet="momentumDesign" size="16"></md-icon>
          </div>
        </md-button>
        <md-button variant="engaged" class="status-state-button">
          <div class="status-button__children">
            <span class="status-indicator-container">
              <md-icon
                slot="icon"
                name="busy-presence-bold"
                iconSet="momentumDesign"
                size="16"
                color="var(--avatar-presence-engaged)"
              ></md-icon>
            </span>
            <span class="status-label engaged"> Engaged </span>
            <span class="status-time">10:11</span>
            <md-icon class="status-arrow" name="arrow-down-bold" iconSet="momentumDesign" size="16"></md-icon>
          </div>
        </md-button>
      </div>
    `;
  }
}

export const buttonTemplate = html` <button-template-sandbox></button-template-sandbox> `;
