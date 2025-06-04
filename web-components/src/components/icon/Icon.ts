/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import iconNames from "@momentum-ui/icons/data/momentumUiIconsNames.json";
import getColorValue from "@momentum-ui/utils/lib/getColorValue";
import { html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { styleMap } from "lit-html/directives/style-map";
import designMapping from "./momentum-ui-to-design-icons.json";
import styles from "./scss/module.scss";
export const iconSize = ["14", "16", "18", "20", "28", "36", "56", 14, 16, 18, 20, 28, 36, 56] as const;
export const iconType = ["", "white"] as const;
export const iconSet = ["momentumUI", "preferMomentumDesign", "momentumDesign", "momentumBrandVisuals", "svg"] as const;

import { iconUrlManager } from "@/managers/IconUrlManager";
import { fetchSVG } from "./Icon.utils";

export namespace Icon {
  export type Size = (typeof iconSize)[number];
  export type Type = (typeof iconType)[number];
  export type IconSet = (typeof iconSet)[number];
  export type ButtonProperty = {
    [key: string]: string;
  };

  @customElementWithCheck("md-icon")
  export class ELEMENT extends LitElement {
    /**
     * @property {String} color - This property sets the color for font icons and the fill color for SVG icons.
     * It can accept any color value supported by CSS, including CSS variables.
     *
     * Example usage:
     * ```html
     * <md-icon color="#ff0000"></md-icon> <!-- Sets the icon color to red -->
     * <md-icon color="var(--my-custom-color)"></md-icon> <!-- Uses a CSS variable for the icon color -->
     * ```
     */
    @property({ type: String }) color = "";

    /**
     * @property {String} description - This property is used to set extra information on the `aria-label` attribute for the icon.
     * It provides additional descriptive text that can be used in conjunction with the `title` property to form a more complete `aria-label`.
     *
     */
    @property({ type: String }) description = "";

    /**
     * @property {String} name - This property sets the name of the icon.
     * It determines the icon to be displayed and affects the class and SVG icon name.
     *
     *
     * Example usage:
     * ```html
     * <md-icon name="search"></md-icon> <!-- Sets the icon name to "search" -->
     * <md-icon name="icon-search"></md-icon> <!-- Sets the icon name to "search" after removing the "icon-" prefix -->
     * ```
     */
    @property({ type: String }) name = "";

    /**
     * @property {String} id - This property sets the `id` attribute for the icon element.
     * It allows you to specify a unique identifier for the icon.
     */
    @property({ type: String }) id = "";

    /**
     * @property {String} size - This property sets the size of the icon.
     * For SVG icon sets ("momentumDesign"), it sets the width and height in pixels.
     * For font-based icon sets ("momentumUI"), it sets the font-size in pixels.
     *
     * Example usage:
     * ```html
     * <md-icon iconSet="momentumUI" name="search_16" size="24"></md-icon> <!-- Sets the font-size to 24px for the legacy font-based icon set -->
     * <md-icon iconSet="momentumDesign" name="search-bold" size="24"></md-icon> <!-- Sets the width and height to 24px for the new SVG-based icon set -->
     * <md-icon iconSet="momentumBrandVisuals" name="social-facebook-color" size="24"></md-icon> <!-- Sets the width and height to 24px for the brands visuals logo set -->
     * ```
     */
    @property({ type: String }) size = "";

    /**
     * @property {String} title - This property sets the `title` attribute for the icon element.
     * It provides a tooltip text when the user hovers over the icon and is also used in the computation of the `aria-label` for accessibility purposes.
     *
     * Example in HTML:
     * ```html
     * <md-icon title="Search Icon"></md-icon> <!-- Sets the title attribute to "Search Icon" -->
     * ```
     */
    @property({ type: String }) title = "";

    /**
     * @property {String} ariaHidden - This property sets the `aria-hidden` attribute for the icon.
     * It can accept the following values:
     * - "true": Hides the icon from assistive technologies.
     * - "false": Makes the icon visible to assistive technologies.
     * - null: Removes the `aria-hidden` attribute.
     *
     * Example usage:
     * ```html
     * <md-icon ariaHidden="true"></md-icon> <!-- Hides the icon from assistive technologies -->
     * <md-icon ariaHidden="false"></md-icon> <!-- Makes the icon visible to assistive technologies -->
     * <md-icon ariaHidden=null></md-icon> <!-- Removes the aria-hidden attribute -->
     * ```
     */
    @property({ type: String }) ariaHidden: "true" | "false" | null = null;

    @property({ type: String }) type = "";

    /**
     * @property {Boolean} isActive - This property indicates whether the icon is in an active state.
     * It is only relevant for `momentumUI` icons.
     *
     * When `isActive` is true, the `iconClassMap` getter method includes specific classes for styling the active state of the icon.
     *
     * Example usage:
     * ```html
     * <md-icon name="search" isActive></md-icon> <!-- Sets the icon to an active state -->
     * ```
     *
     * The `iconClassMap` getter method:
     * - Adds the class `md-combobox-input__icon--active` when `isComboBoxIcon` and `isActive` are both true.
     * - Adds other relevant classes based on the icon's state.
     */
    @property({ type: Boolean }) isActive = false;

    /**
     * @property {Boolean} isComboBoxIcon - This property indicates whether the icon is used within a combobox input.
     * It is only relevant for `momentumUI` icons.
     *
     * When `isComboBoxIcon` is true, the `iconClassMap` getter method includes specific classes for styling the combobox icon.
     *
     * Example usage:
     * ```html
     * <md-icon name="search" isComboBoxIcon></md-icon> <!-- Adds combobox-specific classes to the icon -->
     * ```
     */
    @property({ type: Boolean }) isComboBoxIcon = false;

    /**
     * @property {Boolean} sizeOverrided - This property indicates whether the size of the icon has been overridden.
     * It is only used with `momentumUI` icons.
     *
     * When `sizeOverrided` is true, the `handleSizeOverride` method is called to adjust the icon name based on the overridden size.
     * This has no effect on momentumDesign icons
     */
    @property({ type: Boolean }) sizeOverrided = false;

    /**
     * @property {String} iconSet - This property allows selection of the icon set to be used.
     * It supports the following values:
     * - "momentumUI": Always use the legacy font-based icon set. from @momentum-ui/icons
     * - "momentumDesign": Always use the new SVG-based icon set. from @momentum-design/icons
     * - "preferMomentumDesign": Attempt to map icons from the legacy "momentumUI" set to their "momentumDesign" counterparts automatically.
     *   A lookup is done to get the momentum-design name, and if an icon is found and loaded, this is used instead of the font icon.
     *
     * Note: momentum-design icons do not contain size as part of their name, so the size needs to be specified; otherwise, the default size of 16 is used.
     *       for this reason the size property should always be used to allow for easier migration. if no size specified default of 16 used
     *
     * Example usage:
     * ```html
     * <md-icon iconSet="momentumUI" name="search_16"></md-icon> <!-- Uses the legacy font-based icon set -->
     * <md-icon iconSet="momentumDesign" name="search-bold" size="16"></md-icon> <!-- Uses the new SVG-based icon set -->
     * <md-icon iconSet="preferMomentumDesign name="search_16""></md-icon> <!-- Attempts to map icons to the new SVG-based set -->
     * <md-icon iconSet="momentumBrandVisuals" name="social-facebook-color"</md-icon> <!-- Uses the SVG-based brands visuals logo set -->
     * ```
     */
    @property({ type: String }) iconSet: IconSet = "momentumUI";

    @property({ type: String, attribute: "svg-url" }) svgUrl?: string;

    private static readonly designLookup = new Map(Object.entries(designMapping));

    @internalProperty()
    private svgIcon: HTMLElement | null = null;

    isSvgAlreadyLoaded(iconName: string) {
      if (!this.svgIcon) {
        return false;
      }

      return this.svgIcon?.getAttribute("class")?.includes(iconName);
    }

    async loadSvgIcon(iconName: string) {
      if (this.isSvgAlreadyLoaded(iconName)) {
        return;
      }

      const importedIcon = await fetchSVG(this.computedSvgPath, iconName, "svg");

      if (!importedIcon) {
        return;
      }

      this.svgIcon = importedIcon;

      this.svgIcon?.setAttribute("class", `icon ${iconName}`);
      this.svgIcon?.setAttribute("part", "icon");

      this.setSvgIconAttributes();
      this.requestUpdate();
    }

    setSvgIconAttributes() {
      if (!this.svgIcon) {
        return;
      }
      if (this.iconFontSize) {
        this.svgIcon.setAttribute("width", `${this.iconFontSize}px`);
      }
      if (this.iconFontSize) {
        this.svgIcon.setAttribute("height", `${this.iconFontSize}px`);
      }

      if (this.color) {
        this.svgIcon.setAttribute("fill", this.iconColor);
      } else {
        this.svgIcon.setAttribute("fill", "currentColor");
      }
    }

    private get computedSvgPath() {
      if (this.svgUrl) {
        return this.svgUrl;
      }

      //default to use iconUrlManager url
      return iconUrlManager.svgIconUrl;
    }

    private get svgIconName() {
      if (this.iconSet === "momentumDesign" || this.iconSet === "momentumBrandVisuals" || this.iconSet === "svg") {
        return this.name;
      }
      const lookupName = this.momentumUIIconLookupName;
      const mappedName = ELEMENT.designLookup.get(lookupName);

      return mappedName ?? lookupName;
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (this.doesIconSetSupportSVG) {
        if (changedProperties.has("name") || changedProperties.has("iconSet")) {
          const theIconName = this.svgIconName;

          if (theIconName && theIconName !== "Unknown") {
            this.loadSvgIcon(theIconName);
          }
        } else if (changedProperties.has("iconFontSize") || changedProperties.has("color")) {
          this.setSvgIconAttributes();
        }
      }
    }

    _ariaLabel = "";
    @property({ type: String })
    get ariaLabel() {
      if (this._ariaLabel) {
        return this._ariaLabel;
      }
      if (this.title && this.description) {
        return `${this.title} ${this.description}`;
      }
      if (this.title) {
        return this.title;
      }
      if (this.description) {
        return this.description;
      }
      return "icon";
    }

    set ariaLabel(value) {
      const oldValue = this._ariaLabel;
      this._ariaLabel = value;
      this.requestUpdate("ariaLabel", oldValue);
    }

    get buttonClassMap() {
      return {
        [`md-button--icon-${this.type}`]: !!this.type
      };
    }

    consoleHandler = (message: string, data: string) => {
      switch (message) {
        case "color-warn":
          console.warn(
            `[@momentum-ui/web-component] Icon: ${data} may not exist in the design system,` +
              ` please use a color name from https://momentum.design/styles/color/style`
          );
          break;
        case "name-error":
          console.warn(
            `[@momentum-ui/web-component] Icon: Icon ${data} does not exist in the design system.` +
              ` Visit https://momentum.design/icons for a list of available icons or to request a new icon.`
          );
          break;
      }
    };

    get iconFontSize() {
      const defaultSize = 16;
      const sizeFromName = this.name.split("_")[1];
      return this.size || sizeFromName || defaultSize;
    }

    get iconColor() {
      if (this.color.startsWith("#")) {
        this.consoleHandler("color-warn", this.color);
        return this.color;
      } else if (this.color.startsWith("var(")) {
        return this.color;
      } else return getColorValue(this.color);
    }

    get iconClassMap() {
      return {
        "md-combobox-input__icon": this.isComboBoxIcon,
        "md-combobox-input__icon--active": this.isComboBoxIcon && this.isActive,
        [`${this.iconName}`]: !!this.iconName
      };
    }

    get momentumUIIconLookupName() {
      //The lookup map has the icon name without the size
      let iconName = this.name;
      iconName = iconName.startsWith("icon-") ? iconName.substring(5) : iconName;
      iconName = iconName.split("_")[0];
      return iconName;
    }

    getIconName() {
      let iconName = this.name;
      iconName = iconName.startsWith("icon-") ? iconName.substring(5) : iconName;
      return iconName;
    }

    handleSizeOverride(iconName: string) {
      return `${iconName.split("_")[0]}_${this.iconFontSize}`;
    }

    get iconName() {
      const iconName = this.getIconName();

      if (this.sizeOverrided) {
        return this.handleSizeOverride(iconName);
      }
      return iconNames.includes(iconName) || iconName === ""
        ? `icon-${iconName}`
        : this.consoleHandler("name-error", iconName);
    }

    get iconStyleMap() {
      return {
        ...(this.iconFontSize && { "font-size": `${this.iconFontSize}px` }),
        ...(this.color && { color: this.iconColor })
      };
    }

    static get styles() {
      return [reset, styles];
    }

    handleIconClick(event: MouseEvent) {
      this.dispatchEvent(
        new CustomEvent("icon-click", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event
          }
        })
      );
    }

    private get doesIconSetSupportSVG() {
      return (
        this.iconSet === "momentumDesign" ||
        this.iconSet === "preferMomentumDesign" ||
        this.iconSet === "momentumBrandVisuals" ||
        this.iconSet === "svg"
      );
    }

    private get isSVGRender() {
      return (
        (this.svgIcon && this.iconSet === "preferMomentumDesign") ||
        this.iconSet === "momentumDesign" ||
        this.iconSet === "momentumBrandVisuals" ||
        this.iconSet === "svg"
      );
    }

    render() {
      return this.isSVGRender ? this.renderSVGIcon() : this.renderFontIcon();
    }

    renderFontIcon() {
      return html`
        <i
          part="icon"
          id=${this.id}
          class="md-icon icon ${classMap(this.iconClassMap)}"
          style=${styleMap(this.iconStyleMap)}
          role="img"
          aria-label=${this.ariaLabel}
          title=${this.title}
          aria-hidden=${ifDefined(this.ariaHidden ?? undefined)}
          @click=${(event: MouseEvent) => this.handleIconClick(event)}
        >
        </i>
      `;
    }

    renderSVGIcon() {
      return html`
        <div
          class="svg-icon-container"
          id=${this.id}
          role="img"
          aria-label=${this.ariaLabel}
          title=${this.title}
          aria-hidden=${ifDefined(this.ariaHidden ?? undefined)}
          @click=${(event: MouseEvent) => this.handleIconClick(event)}
        >
          ${this.svgIcon ? this.svgIcon : nothing}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-icon": Icon.ELEMENT;
  }
}
