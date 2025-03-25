import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { AvatarSize } from "./Avatar.constants";
import { getPresenceSize } from "./Presence.utils";
import styles from "./scss/module.scss";

export namespace Presence {
  export type Size = (typeof AvatarSize)[number];

  @customElementWithCheck("md-presence")
  export class ELEMENT extends LitElement {
    @property({ type: String }) name = "";
    @property({ type: Number }) size: Size = 48;
    @property({ type: String }) title = "";
    @property({ type: String }) color = "";

    static get styles() {
      return [reset, styles];
    }

    render() {
      const iconSize = getPresenceSize(this.size);

      return html`
        <div class="avatar-presence-wrapper" data-size=${this.size} data-icon-size=${iconSize}>
          <md-icon
            name="${this.name}"
            color="${this.color}"
            size=${iconSize}
            title="${this.title}"
            .iconSet=${"momentumDesign"}
          >
          </md-icon>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-presence": Presence.ELEMENT;
  }
}
