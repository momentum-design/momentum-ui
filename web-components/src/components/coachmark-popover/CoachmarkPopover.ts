/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/popover/Popover";
import { PlacementType } from "@/components/popover/Popover.types";
import { FocusTrapMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { LitElement, PropertyValues, html, property, query } from "lit-element";
import styles from "./scss/module.scss";
export namespace CoachmarkPopover {
  /**
   * @fires coach-create - Fired when the coachmark is created.
   * @fires primary-button-action - Fired when the primary button is clicked.
   * @fires secondary-button-action - Fired when the secondary button is clicked.
   * @fires link-action - Fired when the link is clicked.
   * @fires coachmark-close - Fired when the coachmark is closed.
   */
  @customElementWithCheck("md-coachmark-popover")
  export class ELEMENT extends FocusTrapMixin(LitElement) {
    /**
     * The placement of the coachmark popover.
     * This property determines where the popover will be positioned relative to the reference element.
     * Possible values include "auto", "top", "right", "bottom", "left", etc.
     *
     * @type {PlacementType}
     */
    @property({ type: String })
    placement: PlacementType = "bottom";

    /**
     * The name of the icon to be displayed before the title in the header.
     * If set, the specified icon will be rendered before the title.
     * If not set, no icon will be rendered.
     *
     * @type {string | undefined}
     */
    @property({ type: String })
    headerIconName?: string = undefined;

    /**
     * The title to be displayed in the header
     * If both neither header nor headerIconName is set, no header will be rendered.
     *
     * * @type {string | undefined}
     */
    @property({ type: String })
    header?: string = undefined;

    /**
     * The message to be displayed in the body of the coachmark.
     * This property is used to set the content of the coachmark.
     * If this is not defined the coachmark content slot will be used for the body
     *
     * @type {string | undefined}
     */
    @property({ type: String })
    message?: string = undefined;

    /**
     * Indicates whether the coachmark is visible.
     * If true, the coachmark will be shown. If false, it will be hidden.
     *
     * @type {boolean}
     */
    @property({ type: Boolean })
    show = false;

    /**
     * Indicates whether the close button should be hidden.
     * If true, the close button will not be rendered. If false, it will be rendered.
     *
     * @type {boolean}
     */
    @property({ type: Boolean, reflect: true, attribute: "hide-close-button" })
    hideCloseButton = false;

    /**
     * The label for the primary button.
     * If set, the primary button will be rendered with the specified label.
     * If not set, no primary button will be rendered.
     *
     * @type {string | undefined}
     */
    @property({ type: String })
    primaryButton?: string;

    /**
     * The label for the secondary button.
     * If set, the secondary button will be rendered with the specified label.
     * If not set, no secondary button will be rendered.
     *
     * @type {string | undefined}
     */
    @property({ type: String })
    secondaryButton?: string;

    /**
     * The text for the link.
     * If set, the link will be rendered with the specified text.
     * If not set, no link will be rendered.
     *
     * @type {string | undefined}
     */
    @property({ type: String })
    linkText?: string;

    /**
     * The URL for the link.
     * This property is used to set the href attribute of the link.
     *
     * @type {string}
     */
    @property({ type: String })
    href = "";

    @query(".md-coachmark__trigger-component")
    triggerComponent!: HTMLSlotElement;

    @query(".md-coachmark__popper")
    popper!: HTMLDivElement;

    /**
     * The content of the slot.
     * This property is used to store the assigned elements of the slot.
     * This is used for the body if message is not set
     *
     * @type {Element[] | null}
     */
    private slotContent: Element[] | null = null;

    get coachWrapClassMap() {
      return {
        "md-coachmark--active": !!this.show
      };
    }

    /**
     * Returns the styles for the component.
     * This method is used to define the CSS styles for the component.
     *
     * @returns {CSSResult[]} The styles for the component.
     */
    static get styles() {
      return [reset, styles];
    }

    connectedCallback() {
      super.connectedCallback();
    }

    /**
     * Dispatches a custom event with the specified event name.
     * The event includes the placement, reference, and popper elements in its detail.
     * The event bubbles up through the DOM and is composed, meaning it can cross shadow DOM boundaries.
     *
     * @param {string} eventName - The name of the custom event to dispatch.
     */
    private notifyCustomEvent(eventName: string) {
      this.dispatchEvent(
        new CustomEvent(eventName, {
          bubbles: true,
          composed: true,
          detail: {
            placement: this.placement,
            triggerComponent: this.triggerComponent,
            popper: this.popper
          }
        })
      );
    }

    /**
     * Dispatches a custom event to notify that the coachmark has been created.
     * The event is named "coach-create" and includes the placement, reference, and popper elements in its detail.
     * The event bubbles up through the DOM and is composed, meaning it can cross shadow DOM boundaries.
     */
    notifyCoachCreate() {
      this.notifyCustomEvent("coach-create");
    }

    /**
     * Dispatches a custom event to notify that the primary button has been clicked.
     * The event is named "primary-button-action" and includes the placement, reference, and popper elements in its detail.
     * The event bubbles up through the DOM and is composed, meaning it can cross shadow DOM boundaries.
     */
    notifyPrimaryButtonAction() {
      this.notifyCustomEvent("primary-button-action");
    }

    /**
     * Dispatches a custom event to notify that the secondary button has been clicked.
     * The event is named "secondary-button-action" and includes the placement, reference, and popper elements in its detail.
     * The event bubbles up through the DOM and is composed, meaning it can cross shadow DOM boundaries.
     */
    notifySecondaryButtonAction() {
      this.notifyCustomEvent("secondary-button-action");
    }

    /**
     * Dispatches a custom event to notify that the link has been clicked.
     * The event is named "link-action" and includes the placement, reference, and popper elements in its detail.
     * The event bubbles up through the DOM and is composed, meaning it can cross shadow DOM boundaries.
     */
    notifyLinkAction() {
      this.notifyCustomEvent("link-action");
    }

    /**
     * Dispatches a custom event to notify that the coachmark has been closed.
     * The event is named "coachmark-close" and includes the placement, reference, and popper elements in its detail.
     * The event bubbles up through the DOM and is composed, meaning it can cross shadow DOM boundaries.
     */
    notifyCoachClose() {
      this.notifyCustomEvent("coachmark-close");
    }

    /**
     * Handles the slot change event.
     * This method is triggered when the content of a slot changes.
     * It updates the `slotContent` property with the assigned elements of the slot.
     *
     * @param {Event} event - The slot change event.
     */
    private handleSlotChange(event: Event) {
      const slot = event.target as HTMLSlotElement;
      if (slot) {
        const slotContent = slot.assignedElements({ flatten: true });
        if (slotContent.length) {
          this.slotContent = slotContent;
        }
      }
    }

    /**
     * Called when the element's properties are updated.
     * This method is triggered whenever one or more properties change.
     * if the `show` property hss changed it calls `notifyCoachCreate` if `show` property is true, otherwise it calls `notifyCoachClose`.
     *
     * @param {PropertyValues} changedProperties - The properties that changed.
     */
    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("show")) {
        this.show ? this.notifyCoachCreate() : this.notifyCoachClose();
      }
    }

    /**
     * Returns the template for the coachmark content.
     * This method is used to define the HTML structure for the coachmark content.
     *
     * @returns {TemplateResult} The template for the coachmark content.
     */
    private coachmarkContentTemplate() {
      return html`
        <div class="md-coachmark__content">
          ${this.message
            ? this.message
            : html` <slot name="coachmark-content" @slotchange=${this.handleSlotChange}></slot> `}
        </div>
      `;
    }

    /**
     * Returns the template for the header.
     * This method is used to define the HTML structure for the header.
     *
     * @returns {TemplateResult} The template for the header.
     */
    private renderHeader() {
      return html`
        <div class="header-continaer">
          ${this.headerIconName
            ? html`<md-icon name=${this.headerIconName} size="16" iconSet="momentumDesign"></md-icon>`
            : ""}
          ${this.header ? html`<span class="header-title">${this.header}</span>` : ""}
          ${!this.hideCloseButton
            ? html`<md-button
                class="cancel-icon-button"
                size="24"
                hasRemoveStyle
                circle
                @button-click=${() => (this.show = false)}
              >
                <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
              </md-button>`
            : ""}
        </div>
      `;
    }

    /**
     * Returns the template for the body.
     * This method is used to define the HTML structure for the body.
     *
     * @returns {TemplateResult} The template for the body.
     */
    private renderBody() {
      return html` <div class="body-container">${this.coachmarkContentTemplate()}</div> `;
    }

    /**
     * Returns the template for the footer.
     * This method is used to define the HTML structure for the footer.
     *
     * @returns {TemplateResult} The template for the footer.
     */
    private renderFooter() {
      return html`
        <div class="footer-container">
          ${this.primaryButton
            ? html`<md-button variant="inverted-primary" @button-click=${() => this.notifyPrimaryButtonAction()}>
                ${this.primaryButton}</md-button
              >`
            : ""}
          ${this.secondaryButton
            ? html`<md-button variant="inverted-secondary" @button-click=${() => this.notifySecondaryButtonAction()}>
                ${this.secondaryButton}</md-button
              >`
            : ""}
          ${this.linkText
            ? html`<a href=${this.href} @click=${() => this.notifyLinkAction()} target="_blank" rel="noreferrer">
                ${this.linkText}</a
              >`
            : ""}
        </div>
      `;
    }

    /**
     * Renders the HTML template for the component.
     * This method defines the structure and content of the component's shadow DOM.
     *
     * @returns {TemplateResult} The HTML template for the component.
     */
    render() {
      return html`
        <md-popover
          class="md-coachmark"
          ?is-open=${this.show}
          role="dialog"
          show-arrow
          trigger="manual"
          placement=${this.placement}
          @popover-open-changed="${(e: CustomEvent) => {
            if (!e.detail.isOpen) {
              this.notifyCoachClose();
            }
          }}"
        >
          <slot slot="triggerElement"></slot>
          <div class="md-coachmark__popper" tabindex="-1">
            ${this.renderHeader()} ${this.renderBody()} ${this.renderFooter()}
          </div>
        </md-popover>
      `;
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "md-coachmark-popover": CoachmarkPopover.ELEMENT;
  }
}
