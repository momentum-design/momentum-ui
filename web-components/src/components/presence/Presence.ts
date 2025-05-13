import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, internalProperty } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { getPresenceIconColor, PresenceState } from "./Presence.utils";
import styles from "./scss/module.scss";

export namespace Presence {

  @customElementWithCheck("md-presence")
  export class ELEMENT extends LitElement {
    @property({ type: Number }) size = 48;
    @property({ type: String }) title = "";
    @property({ type: String, attribute: "presence-type" }) presenceType?: PresenceState;
    @property({ type: Boolean }) newMomentum = false;
    @property({ type: Boolean }) failurePresence = false;
    @property({ type: Boolean }) avatarLinked = false;

    @internalProperty() private presenceColor = "";
    @internalProperty() private presenceIcon = "";

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
        const { presenceIcon, presenceColor } = getPresenceIconColor(this.presenceType, this.failurePresence, this.newMomentum);
        this.presenceIcon = presenceIcon!;
        this.presenceColor = presenceColor!;
      }
      
      return html`
        <div class="${classMap(this.presenceClassMap)}" data-size=${this.size} data-icon-size=${this.size}>
          <md-icon
            name="${this.presenceIcon}"
            color="${this.presenceColor}"
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
