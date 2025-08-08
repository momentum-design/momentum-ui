import "@/components/badge/Badge";
import "@/components/badge/NotificationBadge";
import "@/components/icon/Icon";
import { css, customElement, html, LitElement } from "lit-element";

@customElement("badge-template-sandbox")
export class BadgeTemplateSandbox extends LitElement {
  static get styles() {
    return [
      css`
        .counter {
          font-weight: 700;
          flex-grow: 0;
        }

        .badge-text {
          width: 112px;
          justify-content: flex-start;
        }

        .badge-container {
          display: inline-flex;
          gap: 8px;
        }
      `
    ];
  }

  render() {
    return html` <md-badge tabIndexing="0" aria-label="my aria-label"> Default </md-badge>
      <md-badge color="blue"> Blue </md-badge>
      <md-badge color="red"> Red </md-badge>
      <md-badge color="yellow"> Yellow </md-badge>
      <md-badge color="green"> Green </md-badge>
      <md-badge color="mint"> Mint </md-badge>
      <md-badge color="cyan"> Cyan </md-badge>
      <md-badge color="purple"> Purple </md-badge>

      <h4 class="sandbox-header">Additional Badges</h4>
      <md-badge color="gray"> Gray </md-badge>
      <md-badge color="violet"> Violet </md-badge>
      <md-badge color="mint"> Mint </md-badge>
      <md-badge color="gold"> Gold </md-badge>
      <md-badge color="lime"> Lime </md-badge>
      <md-badge color="pink"> Pink </md-badge>
      <md-badge color="orange"> Orange </md-badge>
      <md-badge color="cobalt"> Cobalt </md-badge>

      <h3 class="sandbox-header">Lumos Badges</h3>
      <h4 class="sandbox-header">Circle Badges</h4>

      <md-badge color="green" circle>
        <md-icon name="handset-active_16"></md-icon>
      </md-badge>
      <md-badge color="blue" circle>
        <md-icon name="chat-active_16"></md-icon>
      </md-badge>
      <md-badge color="violet" circle>
        <md-icon name="chat-active_16"></md-icon>
      </md-badge>
      <md-badge color="mint" circle>
        <md-icon name="sms-filled" size="16" iconSet="momentumDesign"></md-icon>
      </md-badge>

      <h4 class="sandbox-header">Circle Badges with Different Sizes</h4>

      <md-badge color="green" circle circle-size="24">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="16"></md-icon>
      </md-badge>
      <md-badge color="green" circle circle-size="32">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="20"></md-icon>
      </md-badge>
      <md-badge color="green" circle circle-size="40">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="24"></md-icon>
      </md-badge>
      <md-badge color="green" circle circle-size="48">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="28"></md-icon>
      </md-badge>
      <md-badge color="green" circle circle-size="64">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="36"></md-icon>
      </md-badge>
      <md-badge color="green" circle circle-size="72">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="40"></md-icon>
      </md-badge>
      <md-badge color="green" circle circle-size="88">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="52"></md-icon>
      </md-badge>
      <md-badge color="green" circle circle-size="124">
        <md-icon name="chat-filled" iconSet="momentumDesign" size="73"></md-icon>
      </md-badge>

      <h4 class="sandbox-header">Large Badges</h4>

      <md-badge color="green">
        <md-icon iconSet="momentumDesign" name="handset-filled" size="16"></md-icon>
        Voice
        <span class="counter">${"3"}</span>
      </md-badge>

      <md-badge color="blue">
        <md-icon iconSet="momentumDesign" name="chat-filled" size="16"></md-icon>
        Chat
        <span class="counter">${"3"}</span>
      </md-badge>

      <md-badge color="violet">
        <md-icon iconSet="momentumDesign" name="email-filled" size="16"></md-icon>
        Email
        <span class="counter">${"3"}</span>
      </md-badge>

      <md-badge color="orange">
        <md-icon iconSet="momentumDesign" name="sms-message-filled" size="16"></md-icon>
        Social
        <span class="counter">${"3"}</span>
      </md-badge>

      <md-badge color="orange" disabled>
        <md-icon iconSet="momentumDesign" name="sms-message-filled" size="16"></md-icon>
        Disabled
        <span class="counter">${"3"}</span>
      </md-badge>

      <h4 class="sandbox-header">Size 36</h4>
      <div class="badge-container">
        <md-badge class="fixed-width-badge" color="green" size="36">
          <md-icon iconSet="momentumDesign" name="handset-filled" size="16"></md-icon>
          <span class="badge-text">Voice</span>
          <span class="counter">${"3"}</span>
        </md-badge>

        <md-badge class="fixed-width-badge" color="blue" size="36">
          <md-icon iconSet="momentumDesign" name="chat-filled" size="16"></md-icon>
          <span class="badge-text">Chat</span>
          <span class="counter">${"3"}</span>
        </md-badge>

        <md-badge class="fixed-width-badge" color="violet" size="36">
          <md-icon iconSet="momentumDesign" name="email-filled" size="16"></md-icon>
          <span class="badge-text">Email</span>
          <span class="counter">${"3"}</span>
        </md-badge>

        <md-badge class="fixed-width-badge" color="orange" size="36">
          <md-icon iconSet="momentumDesign" name="sms-message-filled" size="16"></md-icon>
          <span class="badge-text">Social</span>
          <span class="counter">${"3"}</span>
        </md-badge>

        <md-badge class="fixed-width-badge" color="orange" disabled size="36">
          <md-icon iconSet="momentumDesign" name="sms-message-filled" size="16"></md-icon>
          <span class="badge-text">Disabled</span>
          <span class="counter">${"3"}</span>
        </md-badge>
      </div>

      <h4 class="sandbox-header">Small Badges</h4>

      <md-badge color="mint" small>
        <md-icon name="handset-active_12"></md-icon>
        00:01
      </md-badge>

      <md-badge color="blue" small>
        <md-icon name="chat-active_12"></md-icon>
        00:01
      </md-badge>

      <md-badge color="purple" small>
        <md-icon name="icon-email-active_24" size="12"></md-icon>
        00:01
      </md-badge>

      <md-badge color="darkred" small>
        <md-icon name="icon-email-active_24" size="12"></md-icon>
        00:01
      </md-badge>

      <h4 class="sandbox-header">Split Badges</h4>

      <md-badge color="mint" split>
        <span slot="split-left">
          <md-badge color="mint" small circle style="margin:0 .5rem 0 .375rem">
            <md-icon name="handset-active_16"></md-icon>
          </md-badge>
          ${"00:01"}
        </span>
        <span slot="split-right">
          <md-icon name="headset_16" style="margin-right:.375rem;height:1rem"></md-icon>
          ${"00:01"}
        </span>
      </md-badge>
      <md-badge color="blue" split>
        <span slot="split-left">
          <md-badge color="blue" small circle style="margin:0 .5rem 0 .375rem">
            <md-icon name="chat-active_16"></md-icon>
          </md-badge>
          ${"04:31"}
        </span>
        <span slot="split-right">
          <md-icon name="headset_16" style="margin-right:.375rem;height:1rem"></md-icon>
          ${"00:23"}
        </span>
      </md-badge>

      <h4 class="sandbox-header">Communications Status</h4>

      <md-badge split>
        <span slot="split-left">
          <md-badge color="green" circle small style="margin-right:.375rem;">
            <md-icon name="handset-active_12"></md-icon>
          </md-badge>
          ${"00:01"}
        </span>
        <span slot="split-right"> Wrap Up ${"00:01"} </span>
      </md-badge>
      <md-badge split>
        <span slot="split-left">
          <md-badge color="blue" circle small style="margin-right:.375rem;">
            <md-icon name="chat-active_12"></md-icon>
          </md-badge>
          ${"00:01"}
        </span>
        <span slot="split-right">
          <md-icon name="headset_12" style="margin-right:.375rem;height:1rem"></md-icon>
          Barbara Hecker ${"00:23"}
        </span>
      </md-badge>

      <h4 class="sandbox-header">Compact Badge</h4>

      <md-badge compact>
        <span>
          <md-badge color="blue" circle small style="margin-right:.375rem;">
            <md-icon name="chat-active_12"></md-icon>
          </md-badge>
          <span>connected - </span>
          ${"00:01"}
        </span>
      </md-badge>

      <h4 class="sandbox-header">Outlined Badges</h4>

      <md-badge outlined> March 21, 2020 </md-badge>
      <md-badge outlined small> March 21, 2020 </md-badge>

      <h4 class="snadbox-header">Unread count</h4>

      <md-badge color="unreadcount"> 999 </md-badge>
      <md-badge color="unreadcount"> 99 </md-badge>
      <md-badge color="unreadcount"> 4 </md-badge>

      <md-badge color="unreadcount" outlined> 99 </md-badge>
      <md-badge color="unreadcount" outlined> 99 </md-badge>
      <md-badge color="unreadcount" outlined> 4 </md-badge>

      <h3 class="sandbox-header">status badge</h3>
      <md-badge color="status-positive" small>
        <md-icon name="participant-filled" iconSet="momentumDesign"></md-icon>
        Agent name - 00:00
      </md-badge>
      <md-badge color="status-negative" small suppress-default-max-width>
        <md-icon name="alert-active-filled" iconSet="momentumDesign"></md-icon>
        %Wrap-up alert% - 00:00
      </md-badge>
      <md-badge color="status-accent" small>
        <md-icon name="archive-filled" iconSet="momentumDesign"></md-icon>
        Wrap-up - 00:00
      </md-badge>
      <md-badge color="status-warning" small>
        <md-icon name="call-barge-filled" iconSet="momentumDesign"></md-icon>
        Barged - 00:00
      </md-badge>
      <md-badge color="status-orange" small>
        <md-icon name="call-hold-filled" iconSet="momentumDesign"></md-icon>
        On hold - 00:00
      </md-badge>

      <h3 class="sandbox-header">Notification badges</h3>
      <md-notification-badge type="dot"></md-notification-badge>
      <md-notification-badge type="icon" icon-name="chat-filled"></md-notification-badge>
      <md-notification-badge type="counter" .counter=${5}></md-notification-badge>
      <md-notification-badge type="success"></md-notification-badge>
      <md-notification-badge type="warning"></md-notification-badge>
      <md-notification-badge type="error"></md-notification-badge>
      <md-notification-badge type="icon" icon-name="alert-muted-bold" variant="secondary"></md-notification-badge>
      <md-notification-badge type="error" overlay></md-notification-badge>`;
  }
}

export const badgeTemplate = html` <badge-template-sandbox></badge-template-sandbox> `;
