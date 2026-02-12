import "../icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { AvatarSize } from "../avatar/Avatar.constants";
import { getPresenceIconColor, PresenceState } from "./Presence.utils";
import styles from "./scss/module.scss";

export namespace Presence {
  export type Size = (typeof AvatarSize)[number];

  @customElementWithCheck("md-presence")
  export class ELEMENT extends LitElement {
    @property({ type: String }) name = "";
    @property({ type: Number }) size: Size = 48;
    @property({ type: String }) title = "";
    @property({ type: String }) color = "";
    @property({ type: String, attribute: "presence-type" }) presenceType: PresenceState = "";
    @property({ type: Boolean }) newMomentum = false;
    @property({ type: Boolean }) failurePresence = false;
    @property({ type: Boolean }) avatarLinked = false;

    static get styles() {
      return [reset, styles];
    }

    private get presenceClassMap() {
      return {
        "avatar-presence-wrapper": this.avatarLinked
      };
    }

    render() {
      if (this.presenceType) {
        const { presenceIcon, presenceColor } = getPresenceIconColor(
          this.presenceType,
          this.failurePresence,
          this.newMomentum
        );
        this.name = presenceIcon!;
        this.color = presenceColor!;
      }

      return html`
        <div class="${classMap(this.presenceClassMap)}" data-size=${this.size} data-icon-size=${this.size}>
          <md-icon
            name="${this.name}"
            color="${this.color}"
            size=${this.size}
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
