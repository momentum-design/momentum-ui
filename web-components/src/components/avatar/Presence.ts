import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { AVATAR_PRESENCE_ICON_SIZE_MAPPING, AvatarSize } from "./Avatar.constants";
import styles from "./scss/module.scss";

export namespace Presence {
  export type Size = (typeof AvatarSize)[number];

  @customElementWithCheck("md-presence")
  export class ELEMENT extends LitElement {
    @property({ type: String }) name = "";
    @property({ type: Number }) size: Size = 48;
    @property({ type: String }) title = "";
    @property({ type: String }) color = "";
    @property({ type: Boolean }) isCircularWrapper = true;

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="avatar-presence-wrapper" data-shape=${this.isCircularWrapper} data-size=${this.size}>
          <md-icon
            name="${this.name}"
            color="${this.color}"
            size=${AVATAR_PRESENCE_ICON_SIZE_MAPPING[this.size]}
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
