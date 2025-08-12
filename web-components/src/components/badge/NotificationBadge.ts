import { customElementWithCheck } from "@/mixins";
import type { CSSResult, CSSResultArray, PropertyValues, TemplateResult } from "lit-element";
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "../icon/Icon";
import { TYPE as BADGE_TYPE, DEFAULTS, ICON_NAMES_LIST, ICON_STATE, ICON_VARIANT } from "./badge.constants";
import type { BadgeType, IconVariant } from "./badge.types";
import styles from "./scss/notification-badge.scss";

/**
 * The `md-notification-badge` component is a versatile UI element used to
 * display dot, icons, counters, success, warning and error type badge.
 *
 * Supported badge types:
 * - `dot`: Displays a dot notification badge with a blue color.
 * - `icon`: Displays a badge with a specified icon using the `icon-name` attribute.
 * - `counter`: Displays a badge with a counter value. If the counter exceeds the `max-counter`,
 * it shows `maxCounter+`. The maximum value of the counter is 999 and anything above that will be set to `999+`.
 * - `success`: Displays a success badge with a check circle icon and green color.
 * - `warning`: Displays a warning badge with a warning icon and yellow color.
 * - `error`: Displays a error badge with a error legacy icon and red color.
 *
 * For `icon`, `success`, `warning` and `error` types, the `md-notification-icon` component is used to render the icon.
 *
 * For the `counter` type, a div is used to render the counter value.
 *
 * @dependency md-icon
 *
 * @tagname md-notification-badge
 *
 */

@customElementWithCheck("md-notification-badge")
export class NotificationBadge extends LitElement {
  static get styles(): CSSResult | CSSResultArray {
    return [styles];
  }

  /**
   * Type of the badge
   * Can be `dot` (notification) , `icon`, `counter`, `success`, `warning` or `error`.
   */
  @property({ type: String, reflect: true })
  type?: BadgeType;

  /**
   * Type of the variant can be `primary` or `secondary`.
   * It defines the background and foreground color of the icon.
   * @default primary
   */
  @property({ type: String, reflect: true })
  variant: IconVariant = DEFAULTS.VARIANT;

  /**
   * Counter is the number which can be provided in the badge.
   */
  @property({ type: Number })
  counter?: number;

  /**
   * The maximum number can be set up to 999, anything above that will be rendered as _999+_.
   * The max counter can be `9`, `99` or `999`.
   * @default 99
   */
  @property({ type: Number, attribute: "max-counter", reflect: true })
  maxCounter: number = DEFAULTS.MAX_COUNTER;

  /**
   * Overlay is to add a thin outline to the badge.
   * This will help distinguish between the badge and the button,
   * where the badge will be layered on top of a button.
   * @default false
   */
  @property({ type: Boolean })
  overlay = false;

  /**
   * Name of the icon (= filename).
   *
   * If no `icon-name` is provided, no icon will be rendered.
   */
  @property({ type: String, attribute: "icon-name" })
  iconName?: string;

  /**
   * Aria-label attribute to be set for accessibility
   * @default null
   */
  @property({ type: String, attribute: "aria-label" })
  override ariaLabel: string | null = null;

  /**
   * If `type` is set to `counter` and if `counter` is greater than `maxCounter`,
   * then it will return a string the maxCounter value as string.
   * Otherwise, it will return a string representation of `counter`.
   * If `counter` is not a number, it will return an empty string.
   * @param maxCounter - the maximum limit which can be displayed on the badge
   * @param counter - the number to be displayed on the badge
   * @returns the string representation of the counter
   */
  private getCounterText(maxCounter: number, counter?: number): string {
    if (counter === undefined || typeof counter !== "number" || maxCounter === 0) {
      return "";
    }
    if (counter > maxCounter) {
      return `${maxCounter}+`;
    }
    // At any given time, the max limit should not cross 999.
    if (maxCounter > DEFAULTS.MAX_COUNTER_LIMIT || counter > DEFAULTS.MAX_COUNTER_LIMIT) {
      return `${DEFAULTS.MAX_COUNTER_LIMIT}+`;
    }
    return counter.toString();
  }

  /**
   * Method to generate the badge icon.
   * @param iconName - the name of the icon from the icon set
   * @param backgroundClassPostfix - postfix for the class to style the badge icon.
   * @returns the template result of the icon.
   */
  private getBadgeIcon(iconName: string, backgroundClassPostfix: string): TemplateResult {
    return html`
      <md-icon
        class="md-notification-badge-icon ${classMap({
          "md-notification-badge-overlay": this.overlay,
          [`md-notification-badge-icon__${backgroundClassPostfix}`]: true
        })}"
        iconSet="momentumDesign"
        name="${ifDefined(iconName)}"
        size="${DEFAULTS.ICON_SIZE}"
      ></md-icon>
    `;
  }

  /**
   * Method to generate the badge dot template.
   * @returns the template result of the dot with md-notification-badge-dot class.
   */
  private getBadgeDot(): TemplateResult {
    return html`<div
      class="md-notification-badge-dot ${classMap({ "md-notification-badge-overlay": this.overlay })}"
    ></div>`;
  }

  /**
   * Method to generate the badge text and counter template.
   * @returns the template result of the text.
   */
  private getBadgeCounterText(): TemplateResult {
    return html`
      <div class="md-notification-badge-text ${classMap({ "md-notification-badge-overlay": this.overlay })}">
        ${this.getCounterText(this.maxCounter, this.counter)}
      </div>
    `;
  }

  /**
   * Method to set the role based on the aria-label provided.
   * If the aria-label is provided, the role of the element will be 'img'.
   * Otherwise, the role will be null.
   */
  private setRoleByAriaLabel(): void {
    if (this.ariaLabel) {
      this.role = "img";
    } else {
      this.role = null;
    }
  }

  /**
   * Generates the badge content based on the badge type.
   * Utilizes various helper methods to create the appropriate badge template based on the
   * current badge type. Supports 'dot', 'icon', 'counter', 'success', 'warning', and 'error'
   * types, returning the corresponding template result for each type.
   * @returns the TemplateResult for the current badge type.
   */
  private getBadgeContentBasedOnType(): TemplateResult {
    if (this.variant && !Object.values(ICON_VARIANT).includes(this.variant)) {
      this.variant = DEFAULTS.VARIANT;
    }
    const { iconName, type, variant } = this;
    switch (type) {
      case BADGE_TYPE.ICON:
        return this.getBadgeIcon(iconName || "", variant);
      case BADGE_TYPE.COUNTER:
        return this.getBadgeCounterText();
      case BADGE_TYPE.SUCCESS:
        return this.getBadgeIcon(ICON_NAMES_LIST.SUCCESS_ICON_NAME, ICON_STATE.SUCCESS);
      case BADGE_TYPE.WARNING:
        return this.getBadgeIcon(ICON_NAMES_LIST.WARNING_ICON_NAME, ICON_STATE.WARNING);
      case BADGE_TYPE.ERROR:
        return this.getBadgeIcon(ICON_NAMES_LIST.ERROR_ICON_NAME, ICON_STATE.ERROR);
      case BADGE_TYPE.DOT:
      default:
        this.type = BADGE_TYPE.DOT;
        return this.getBadgeDot();
    }
  }

  public override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);

    if (changedProperties.has("ariaLabel")) {
      this.setRoleByAriaLabel();
    }
  }

  public override render() {
    return this.getBadgeContentBasedOnType();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-notification-badge": NotificationBadge;
  }
}
