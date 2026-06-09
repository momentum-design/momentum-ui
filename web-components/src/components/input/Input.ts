/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "../help-text/HelpText";
import "../icon/Icon";
import "../label/Label";
import "../spinner/Spinner";
import { ARIA_INVALID, Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusMixin } from "@/mixins/FocusMixin";
import reset from "@/wc_scss/reset.scss";
import * as iconNamesList from "@momentum-ui/icons/data/momentumUiIconsNames.json";
import { LitElement, PropertyValues, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import { FormControl } from "../form";
import styles from "./scss/module.scss";

export const containerSize = [
  "small-1",
  "small-2",
  "small-3",
  "small-4",
  "small-5",
  "small-6",
  "small-7",
  "small-8",
  "small-9",
  "small-10",
  "small-11",
  "small-12",
  "medium-1",
  "medium-2",
  "medium-3",
  "medium-4",
  "medium-5",
  "medium-6",
  "medium-7",
  "medium-8",
  "medium-9",
  "medium-10",
  "medium-11",
  "medium-12",
  "large-1",
  "large-2",
  "large-3",
  "large-4",
  "large-5",
  "large-6",
  "large-7",
  "large-8",
  "large-9",
  "large-10",
  "large-11",
  "large-12"
];
export const inputSize = [
  "small-1",
  "small-2",
  "small-3",
  "small-4",
  "small-5",
  "small-6",
  "small-7",
  "small-8",
  "small-9",
  "small-10",
  "small-11",
  "small-12",
  "medium-1",
  "medium-2",
  "medium-3",
  "medium-4",
  "medium-5",
  "medium-6",
  "medium-7",
  "medium-8",
  "medium-9",
  "medium-10",
  "medium-11",
  "medium-12",
  "large-1",
  "large-2",
  "large-3",
  "large-4",
  "large-5",
  "large-6",
  "large-7",
  "large-8",
  "large-9",
  "large-10",
  "large-11",
  "large-12"
];
export const inputType = ["text", "number", "password", "email", "tel", "checkbox"];
export const inputShape = ["none", "pill"];
export const iconNames = iconNamesList;
export const iconPosition = ["before", "after"];
export const nestedLevel = [0, 1, 2, 3];
export const ariaInvalidType = ["grammar", "false", "spelling", "true"];

export namespace Input {
  export type Type = "text" | "number" | "password" | "email" | "tel" | "checkbox" | "search";
  export type MessageType = "error" | "success" | "warning" | "priority";
  export type Message = {
    type: MessageType;
    message: string;
    id?: string;
    ariaLive?: "off" | "assertive" | "polite";
  };
  export type ContainerSize = (typeof containerSize)[number];
  export type InputSize = (typeof inputSize)[number];
  export type InputType = typeof inputSize;
  export type shape = typeof inputShape;
  export type AriaInvalidType = (typeof ariaInvalidType)[number];
  export type Autocomplete = "on" | "off";
  export type AriaAutocomplete = "inline" | "list" | "both" | "none";

  export class MessageController {
    determineMessageType(array: Input.Message[]) {
      return array.reduce<Input.MessageType>(
        (accumulator, errorMessage) =>
          (errorMessage as unknown as string) === "error" ? accumulator : errorMessage.type,
        "" as Input.MessageType
      );
    }
    filterMessagesByType(array: Input.Message[], value: string) {
      return array.reduce(
        (accumulator, errorMessage) =>
          errorMessage.type === value ? accumulator.concat(errorMessage.message) : accumulator,
        [] as string[]
      );
    }
  }

  export interface InputChangeEventDetail {
    srcEvent: Event;
    value: string;
  }

  export interface InputFocusEventDetail {
    srcEvent: FocusEvent;
  }

  export interface InputBlurEventDetail {
    srcEvent: FocusEvent;
  }

  export interface InputKeydownEventDetail {
    srcEvent: KeyboardEvent;
  }

  export interface InputMousedownEventDetail {
    srcEvent: MouseEvent;
  }

  export interface InputClearEventDetail {
    srcEvent: MouseEvent | KeyboardEvent;
  }

  export interface InputDropdownClickEventDetail {
    srcEvent: MouseEvent;
    expanded: boolean;
  }

  @customElementWithCheck("md-input")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: String }) ariaDescribedBy = "";
    @property({ type: String, reflect: true }) ariaInvalid: Input.AriaInvalidType = "false";
    @property({ type: String }) ariaLabel = "";
    @property({ type: Boolean, reflect: true }) autofocus = false;
    @property({ type: String }) auxiliaryContentPosition: "before" | "after" | null = null;
    @property({ type: Boolean }) clear = false;
    @property({ type: String }) clearAriaLabel = "";
    @property({ type: Boolean }) compact = false;
    @property({ type: String }) containerSize: Input.ContainerSize = "small-12";
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) id = "";
    @property({ type: String }) inputSize = "";
    @property({ type: Boolean }) isFilled = false;
    @property({ type: Boolean }) isLoading = false;
    @property({ type: String }) label = "";
    @property({ type: String }) helpText = "";
    @property({ type: Boolean, attribute: "hide-message", reflect: true }) hideMessage = false;
    @property({ type: String }) htmlId = "";
    @property({ type: String }) ariaRole: string | undefined = undefined;
    @property({ type: String }) ariaAutocomplete: Input.AriaAutocomplete | undefined = undefined;
    @property({ type: Array }) messageArr: Input.Message[] = [];
    @property({ type: Number, reflect: true }) min: number | undefined = undefined;
    @property({ type: Number, reflect: true }) max: number | undefined = undefined;
    @property({ type: Number }) maxLength: number | undefined = undefined;
    @property({ type: Boolean }) multi = false;
    @property({ type: Boolean }) multiline = false;
    @property({ type: String, reflect: true }) name = "";
    @property({ type: Number }) nestedLevel = 0;
    @property({ type: String }) placeholder = "";
    @property({ type: Boolean }) readOnly = false;
    @property({ type: Boolean }) required = false;
    @property({ type: Boolean }) searchable = false;
    @property({ type: String }) secondaryLabel = "";
    @property({ type: Boolean, attribute: "select-when-in-focus" }) selectWhenInFocus = false;
    @property({ type: String }) shape = "";
    @property({ type: String }) type: Input.Type = "text";
    @property({ type: String, reflect: true }) value = "";
    @property({ type: String }) ariaControls = "";
    @property({ type: String }) ariaExpanded = "";
    @property({ type: Boolean, attribute: "is-combobox" }) isCombobox = false;
    @property({ type: Boolean }) newMomentum = false;
    @property({ type: Object }) control?: FormControl<unknown>;
    @property({ type: Boolean }) disableUserTextInput = false;
    @property({ type: String }) autocomplete?: Autocomplete = undefined;

    @property({ type: Boolean }) showDropdown = false;
    @property({ type: Boolean }) dropdownExpanded = false;
    @property({ type: String }) dropdownAriaLabel = "Show options";
    @property({ type: Number }) maxSuggestedLength: number | undefined = undefined;

    @query(".md-input") input!: HTMLInputElement;

    @state() private isEditing = false;

    @query('slot[name="input-section-right"]')
    private readonly inputSectionRightSlot!: HTMLSlotElement;

    @state()
    private hasRightSlotContent = false;

    private readonly messageController = new MessageController();

    // Auto-combobox: makes a `searchable` input inside a popup behave as an ARIA combobox.
    private autoComboOverlay: HTMLElement | null = null;
    private autoComboListbox: HTMLElement | null = null;
    private autoComboOverlayObserver: MutationObserver | null = null;
    private autoComboListObserver: MutationObserver | null = null;
    private autoComboListKeydownBound: ((e: KeyboardEvent) => void) | null = null;

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("click", this.handleOutsideClick);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("click", this.handleOutsideClick);
      this.teardownAutoCombobox();
    }

    // Auto-combobox entry point: opts a `searchable` input into ARIA combobox semantics
    // when it lives inside a known popup wrapper (skippable via `disable-auto-combobox`).
    protected firstUpdated(_changedProperties: PropertyValues) {
      super.firstUpdated?.(_changedProperties);
      if (this.searchable && !this.hasAttribute("disable-auto-combobox")) {
        this.setupAutoCombobox();
      }
    }

    // Popup wrappers that trigger auto-combobox engagement; covers every overlay used by
    // the design system today (md-popover, md-menu-overlay, etc.).
    private static readonly AUTO_COMBO_POPUP_TAGS = new Set([
      "md-menu-overlay",
      "md-popover",
      "md-floating-modal",
      "md-modal",
      "md-coachmark-popover"
    ]);

    // Engage combobox semantics: find the popup ancestor, mirror its open state to
    // aria-expanded, and re-discover the listbox each time the popup mutates.
    private setupAutoCombobox() {
      // Walk up shadow-piercing parents to find any known popup ancestor.
      let node: Node | null = this.parentNode || (this.getRootNode() as ShadowRoot).host || null;
      while (node) {
        if (node instanceof HTMLElement && Input.ELEMENT.AUTO_COMBO_POPUP_TAGS.has(node.tagName.toLowerCase())) {
          this.autoComboOverlay = node;
          break;
        }
        node = node.parentNode || (node as unknown as ShadowRoot).host || null;
      }
      if (!this.autoComboOverlay) return;

      this.isCombobox = true;
      this.ariaAutocomplete = this.ariaAutocomplete || "list";

      const sync = () => {
        const open = this.autoComboOverlay!.hasAttribute("is-open");
        this.ariaExpanded = open ? "true" : "false";
        if (open) {
          requestAnimationFrame(() => this.discoverAutoComboList());
        } else {
          this.cleanupAutoComboListbox();
        }
      };
      this.autoComboOverlayObserver = new MutationObserver(sync);
      this.autoComboOverlayObserver.observe(this.autoComboOverlay, {
        attributes: true,
        attributeFilter: ["is-open"],
        childList: true,
        subtree: true
      });
      sync();
    }

    // Tag the popup's listbox with id/role/tabindex so aria-controls resolves, then wire
    // option normalization and keyboard handling. Re-runs when the popup contents change.
    private discoverAutoComboList() {
      const overlay = this.autoComboOverlay;
      if (!overlay) return;
      const listbox =
        overlay.querySelector<HTMLElement>('[role="listbox"]') ||
        overlay.querySelector<HTMLElement>("ul") ||
        overlay.querySelector<HTMLElement>("ol");
      if (!listbox || listbox === this.autoComboListbox) {
        if (listbox) this.normalizeAutoComboOptions();
        return;
      }
      this.cleanupAutoComboListbox();
      this.autoComboListbox = listbox;

      if (!listbox.id) listbox.id = `md-input-listbox-${Math.random().toString(36).slice(2, 9)}`;
      if (!listbox.getAttribute("role")) listbox.setAttribute("role", "listbox");
      listbox.setAttribute("tabindex", "-1");
      // Drop any consumer-set aria-activedescendant: we use managed DOM focus on options.
      listbox.removeAttribute("aria-activedescendant");
      if (!listbox.hasAttribute("aria-label") && this.ariaLabel) {
        listbox.setAttribute("aria-label", `${this.ariaLabel} options`);
      }
      this.ariaControls = listbox.id;

      this.normalizeAutoComboOptions();
      this.autoComboListObserver = new MutationObserver(() => this.normalizeAutoComboOptions());
      this.autoComboListObserver.observe(listbox, { childList: true, subtree: true });

      this.autoComboListKeydownBound = (e: KeyboardEvent) => this.handleAutoComboListKeydown(e);
      listbox.addEventListener("keydown", this.autoComboListKeydownBound);
    }

    // Returns the current option elements; prefers explicit role="option" and falls back
    // to <li> so we work with both fully-tagged and virtualized consumer lists.
    private getAutoComboOptions(): HTMLElement[] {
      const lb = this.autoComboListbox;
      if (!lb) return [];
      const explicit = Array.from(lb.querySelectorAll<HTMLElement>('[role="option"]'));
      if (explicit.length) return explicit;
      return Array.from(lb.querySelectorAll<HTMLElement>("li"));
    }

    // Re-apply role/posinset/setsize/tabindex on every option (consumer renders or the
    // virtualizer can wipe these); also fixes the listbox->option ARIA ownership chain.
    private normalizeAutoComboOptions() {
      const lb = this.autoComboListbox;
      if (lb && lb.tagName !== "UL" && lb.tagName !== "OL") {
        // Strip implicit list semantics so role="option" chains directly to role="listbox".
        lb.querySelectorAll<HTMLElement>("ul, ol").forEach((el) => {
          if (!el.hasAttribute("role")) el.setAttribute("role", "presentation");
        });
      }
      const opts = this.getAutoComboOptions();
      const total = opts.length;
      opts.forEach((opt, i) => {
        if (!opt.id) opt.id = `md-input-option-${Math.random().toString(36).slice(2, 9)}-${i}`;
        if (!opt.getAttribute("role")) opt.setAttribute("role", "option");
        opt.setAttribute("aria-posinset", String(i + 1));
        opt.setAttribute("aria-setsize", String(total));
        if (opt.getAttribute("tabindex") !== "0") opt.setAttribute("tabindex", "-1");
      });
    }

    // Move DOM focus to the option at `index` and keep the roving-tabindex invariant
    // (single tab stop), so screen readers announce position on each arrow keypress.
    private focusAutoComboOption(index: number) {
      const opts = this.getAutoComboOptions();
      if (!opts.length) return;
      const target = Math.max(0, Math.min(index, opts.length - 1));
      opts.forEach((o, i) => o.setAttribute("tabindex", i === target ? "0" : "-1"));
      const el = opts[target];
      el.focus();
      el.scrollIntoView?.({ block: "nearest" });
    }

    // Implements the APG combobox keyboard contract while focus is on an option:
    // arrows/Home/End navigate, Enter/Space select, Escape closes, typing returns to input.
    private handleAutoComboListKeydown(e: KeyboardEvent) {
      const opts = this.getAutoComboOptions();
      if (!opts.length) return;
      const current = opts.findIndex((o) => o === document.activeElement);
      switch (e.code) {
        case "ArrowDown":
          e.preventDefault();
          this.focusAutoComboOption(current < opts.length - 1 ? current + 1 : 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (current <= 0) {
            opts.forEach((o) => o.setAttribute("tabindex", "-1"));
            this.input?.focus();
          } else {
            this.focusAutoComboOption(current - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          this.focusAutoComboOption(0);
          break;
        case "End":
          e.preventDefault();
          this.focusAutoComboOption(opts.length - 1);
          break;
        case "Enter":
        case "Space":
          if (current >= 0) {
            e.preventDefault();
            opts[current].click();
          }
          break;
        case "Escape":
          e.preventDefault();
          this.input?.focus();
          this.autoComboOverlay?.removeAttribute("is-open");
          break;
        case "Tab":
          // Let Tab leave naturally; just clear tabindex on options
          opts.forEach((o) => o.setAttribute("tabindex", "-1"));
          break;
        default:
          // Printable character: hand control back to input so user can keep typing
          if (e.key.length === 1) {
            this.input?.focus();
          }
      }
    }

    // Detach observers/listeners on the current listbox (called whenever the popup closes
    // or the listbox is replaced) so we don't leak handlers or keep stale references.
    private cleanupAutoComboListbox() {
      this.autoComboListObserver?.disconnect();
      this.autoComboListObserver = null;
      if (this.autoComboListbox && this.autoComboListKeydownBound) {
        this.autoComboListbox.removeEventListener("keydown", this.autoComboListKeydownBound);
      }
      this.autoComboListKeydownBound = null;
      this.autoComboListbox = null;
      this.ariaControls = "";
    }

    // Full teardown on disconnectedCallback: releases the overlay observer in addition
    // to listbox-scoped resources, preventing memory leaks when the input is removed.
    private teardownAutoCombobox() {
      this.autoComboOverlayObserver?.disconnect();
      this.autoComboOverlayObserver = null;
      this.cleanupAutoComboListbox();
      this.autoComboOverlay = null;
    }

    public select() {
      this.input?.select();
    }

    public focus() {
      this.input?.focus();
    }

    handleOutsideClick(event: MouseEvent) {
      let insideInputClick = false;
      const path = event.composedPath();
      if (path.length) {
        insideInputClick = !!path.find((element) => element === this);
        if (!insideInputClick) {
          this.input.blur();
          this.isEditing = false;
        }
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      // Auto-combobox: ArrowDown/Up moves focus into the popup listbox; Escape closes it.
      if (this.autoComboListbox && (event.code === "ArrowDown" || event.code === "ArrowUp")) {
        const opts = this.getAutoComboOptions();
        if (opts.length) {
          event.preventDefault();
          this.focusAutoComboOption(event.code === "ArrowDown" ? 0 : opts.length - 1);
        }
      } else if (this.autoComboOverlay && event.code === "Escape" && this.autoComboOverlay.hasAttribute("is-open")) {
        event.preventDefault();
        this.autoComboOverlay.removeAttribute("is-open");
      }
      this.dispatchEvent(
        new CustomEvent("input-keydown", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event
          }
        })
      );
    }

    handleFocus(event: FocusEvent) {
      if (!this.disabled) {
        this.isEditing = true;

        if (this.selectWhenInFocus) {
          this.select();
        }

        this.dispatchEvent(
          new CustomEvent("input-focus", {
            bubbles: true,
            composed: true,
            detail: {
              srcEvent: event
            }
          })
        );
      }
    }

    handleMouseDown(event: MouseEvent) {
      if (!this.disabled) {
        this.isEditing = true;
        this.dispatchEvent(
          new CustomEvent("input-mousedown", {
            bubbles: true,
            composed: true,
            detail: {
              srcEvent: event
            }
          })
        );
      }
    }

    handleChange(event: Event) {
      this.value = (event.target as HTMLInputElement).value;
      this.control?.setValue(this.value);
      this.dispatchEvent(
        new CustomEvent("input-change", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event,
            value: this.value
          }
        })
      );
    }

    handleBlur(event: FocusEvent) {
      this.control?.markAsTouched();
      this.isEditing = false;
      this.dispatchEvent(
        new CustomEvent("input-blur", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event
          }
        })
      );
    }

    handleClear(event: MouseEvent | KeyboardEvent) {
      if (event.type === "keydown") {
        const { code } = event as KeyboardEvent;
        if (code !== Key.Space && code !== Key.Enter) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
      } else if (event.type === "click") {
        //When handling the click clear button do not propagate the event to the parent
        //As this will close overlay menus that we do not want to close
        event.preventDefault();
        event.stopPropagation();
      }

      this.input.focus();
      this.dispatchEvent(
        new CustomEvent("input-clear", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event
          }
        })
      );
      document.dispatchEvent(new CustomEvent("on-widget-update"));
      this.handleChange(event);
    }

    handleLabelClick() {
      this.input.focus();
    }

    handleRighSlotChange() {
      this.hasRightSlotContent = this.inputSectionRightSlot?.assignedNodes().length > 0;
    }

    handleDropdownClick(event: MouseEvent) {
      event.preventDefault();

      this.dropdownExpanded = !this.dropdownExpanded;

      this.dispatchEvent(
        new CustomEvent("input-dropdown-click", {
          bubbles: true,
          composed: true,
          detail: {
            srcEvent: event,
            expanded: this.dropdownExpanded
          }
        })
      );
    }

    get messageType(): Input.MessageType | null {
      if (this.messageArr.length > 0) {
        return this.messageController.determineMessageType(this.messageArr);
      }
      return null;
    }

    get messages() {
      if (this.messageType) {
        return this.messageController.filterMessagesByType(this.messageArr, this.messageType);
      }
      return null;
    }

    get inputClassMap() {
      return {
        "md-input--filled": this.isFilled,
        colums: !!this.containerSize,
        [`${this.containerSize}`]: !!this.containerSize,
        "md-read-only": this.readOnly,
        "md-disabled": this.disabled,
        [`md-${this.messageType}`]: !!this.messageType,
        [`md-input--nested-${this.nestedLevel}`]: !!this.nestedLevel,
        "md-multi": this.multi,
        "md-new-momentum": this.newMomentum
      };
    }

    get inputWrapperClassMap() {
      return {
        columns: !!this.inputSize,
        [`${this.inputSize}`]: !!this.inputSize
      };
    }

    get inputTemplateClassMap() {
      return {
        "md-input--multiline": this.multiline,
        "md-input--multi": this.multi,
        [`md-input--${this.shape}`]: !!this.shape,
        "md-input--compact": this.compact,
        "md-input--before": this.auxiliaryContentPosition === "before" || this.searchable,
        "md-input--after": this.auxiliaryContentPosition === "after",
        "md-active": this.isEditing,
        "md-focus": this.isEditing,
        "md-read-only": this.readOnly,
        "md-disable-user-text-input": this.disableUserTextInput,
        "md-disabled": this.disabled,
        "md-dirty": !!this.value,
        "md-has-right-icon": this.hasRightIcon
      };
    }

    get ariaExpandedValue() {
      if (this.ariaExpanded === "true" || this.ariaExpanded === "false") {
        return this.ariaExpanded;
      }

      return this.showDropdown ? `${this.dropdownExpanded}` : undefined;
    }

    get effectiveAriaAutocomplete() {
      return this.ariaAutocomplete || (this.showDropdown ? "both" : undefined);
    }

    get effectiveAriaRole() {
      return this.ariaRole || (this.showDropdown || this.isCombobox ? "combobox" : undefined);
    }

    get hasRightIcon() {
      if (this.clear && !this.disabled && this.value && !this.readOnly) {
        return true;
      }

      if (this.showDropdown) {
        return true;
      }

      if (this.compact) {
        return false;
      }

      return this.hasRightSlotContent;
    }

    private get effectiveAriaLabel(): string | undefined {
      return this.ariaLabel || this.label || undefined;
    }

    inputTemplate() {
      return this.multiline
        ? html`
            <textarea
              part="input"
              class="md-input ${classMap(this.inputTemplateClassMap)}"
              @blur=${(event: FocusEvent) => this.handleBlur(event)}
              @input=${(event: Event) => this.handleChange(event)}
              @focus=${(event: FocusEvent) => this.handleFocus(event)}
              @keydown=${(event: KeyboardEvent) => this.handleKeyDown(event)}
              @mousedown=${(event: MouseEvent) => this.handleMouseDown(event)}
              tabindex="0"
              .value=${this.value}
              aria-describedby=${this.ariaDescribedBy}
              ?required=${this.required}
              ?autofocus=${this.autofocus}
              aria-label=${ifDefined(this.effectiveAriaLabel)}
              aria-invalid=${this.ariaInvalid as ARIA_INVALID}
              aria-errormessage="${this.htmlId}-message"
              aria-disabled=${ifDefined(this.disabled || undefined)}
              id=${this.htmlId}
              placeholder=${this.placeholder}
              ?readonly=${this.readOnly}
              maxlength=${ifDefined(this.maxLength)}
              autocomplete=${ifDefined(this.autocomplete)}
            ></textarea>
          `
        : html`
            <input
              part="input"
              class="md-input ${classMap(this.inputTemplateClassMap)}"
              @blur=${(event: FocusEvent) => this.handleBlur(event)}
              @input=${(event: Event) => this.handleChange(event)}
              @focus=${(event: FocusEvent) => this.handleFocus(event)}
              @keydown=${(event: KeyboardEvent) => this.handleKeyDown(event)}
              @mousedown=${(event: MouseEvent) => this.handleMouseDown(event)}
              tabindex="0"
              ?required=${this.required}
              ?autofocus=${this.autofocus}
              type=${this.type}
              .value=${this.value}
              aria-describedby=${this.ariaDescribedBy}
              aria-controls=${ifDefined(this.ariaControls || undefined)}
              aria-autocomplete=${ifDefined(this.effectiveAriaAutocomplete)}
              aria-expanded=${ifDefined(this.ariaExpandedValue ?? undefined)}
              aria-label=${ifDefined(this.effectiveAriaLabel)}
              aria-invalid=${this.ariaInvalid as ARIA_INVALID}
              aria-errormessage=${`${this.htmlId}-message`}
              aria-disabled=${ifDefined(this.disabled || undefined)}
              id=${this.htmlId}
              role=${ifDefined(this.effectiveAriaRole)}
              placeholder=${this.placeholder}
              ?readonly=${this.readOnly || this.disabled || this.disableUserTextInput}
              min=${ifDefined(this.min)}
              max=${ifDefined(this.max)}
              maxlength=${ifDefined(this.maxLength)}
              aria-haspopup=${ifDefined(this.showDropdown ? "true" : undefined)}
              autocomplete=${ifDefined(this.autocomplete)}
            />
          `;
    }

    inputLeftTemplate() {
      if (this.searchable) {
        return html`
          <div class="md-input__before">
            ${this.isLoading
              ? html` <md-spinner size="20"></md-spinner> `
              : html` <md-icon ariaHidden="true" name="search-bold" size="16" iconSet="momentumDesign"></md-icon> `}
          </div>
        `;
      } else {
        return this.auxiliaryContentPosition === "before"
          ? html`
              <div class="md-input__before">
                <slot name="input-section"> </slot>
              </div>
            `
          : nothing;
      }
    }

    private get inputRightTemplateClassMap() {
      return {
        "md-input__after": true,
        hidden: !this.hasRightIcon
      };
    }

    inputRightTemplate() {
      if (this.clear && !this.disabled && this.value && !this.readOnly) {
        return html`
          <div class="md-input__after">
            <md-button
              hasRemoveStyle
              @click=${(event: MouseEvent) => this.handleClear(event)}
              @keydown=${(event: KeyboardEvent) => this.handleClear(event)}
              size="20"
              circle
            >
              <md-icon
                class="md-input__icon-clear"
                name="cancel-bold"
                size="14"
                iconSet="momentumDesign"
                aria-label=${this.clearAriaLabel || "Clear Input"}
              >
              </md-icon>
            </md-button>
            ${this.comboBoxButtonTemplate}
          </div>
        `;
      } else if (!this.compact) {
        return html`
          <div class=${classMap(this.inputRightTemplateClassMap)}>
            <slot name="input-section-right" @slotchange=${this.handleRighSlotChange}></slot>
            ${this.comboBoxButtonTemplate}
          </div>
        `;
      } else if (this.showDropdown) {
        return html` <div class=${classMap(this.inputRightTemplateClassMap)}>${this.comboBoxButtonTemplate}</div> `;
      }
    }

    private get comboBoxButtonTemplate() {
      return this.showDropdown
        ? html`
            <button
              class="md-input__dropdown-button"
              tabindex="-1"
              .ariaLabel=${this.dropdownAriaLabel}
              @click=${(event: MouseEvent) => this.handleDropdownClick(event)}
              @mousedown=${(event: MouseEvent) => event.preventDefault()}
              ?disabled=${this.disabled}
            >
              <md-icon
                class="md-input__dropdown-icon ${this.dropdownExpanded ? "expanded" : ""}"
                name="arrow-down-bold"
                size="16"
                iconSet="momentumDesign"
                .ariaHidden=${"true"}
              >
              </md-icon>
            </button>
          `
        : nothing;
    }

    private characterCountLabelTemplate() {
      return this.maxSuggestedLength && !this.disabled && !this.readOnly
        ? html`<div class="md-input__character-count-label-container">
            <span
              class="md-input__character-count-label ${classMap({
                error: this.value.length > this.maxSuggestedLength
              })}"
              >${this.value.length}/${this.maxSuggestedLength}</span
            >
          </div> `
        : nothing;
    }

    secondaryLabelTemplate() {
      return this.secondaryLabel
        ? html`
            <md-label
              class="md-input__secondary-label ${classMap({ disabled: this.disabled, newMomentum: this.newMomentum })}"
              secondaryLabel
              .htmlFor=${this.htmlId}
              .label=${this.secondaryLabel}
              @label-click=${() => this.handleLabelClick()}
            ></md-label>
          `
        : nothing;
    }

    helpTextTemplate() {
      return this.helpText
        ? html`
            <md-help-text
              class="help-text ${classMap({ disabled: this.disabled, newMomentum: this.newMomentum })}"
              .message=${this.helpText}
              style=${styleMap({ width: "100%" })}
            ></md-help-text>
          `
        : nothing;
    }

    messagesTemplate() {
      return !this.hideMessage && this.messages && !!this.messages.length
        ? html`
            <div id="${this.htmlId}-message" part="message" class="md-input__messages">
              ${repeat(this.messages, (message, id) => {
                return html`
                  <md-help-text
                    .message=${message}
                    .id=${this.messageArr[id].id ?? ""}
                    .ariaLive=${this.messageArr[id].ariaLive ?? "polite"}
                    .messageType=${this.messageType as Input.MessageType}
                  ></md-help-text>
                `;
              })}
            </div>
          `
        : nothing;
    }

    labelTemplate() {
      return this.label
        ? html`
            <md-label
              class="md-input__label ${classMap({ disabled: this.disabled, newMomentum: this.newMomentum })}"
              .htmlFor=${this.htmlId}
              .label=${this.label}
              @label-click=${() => this.handleLabelClick()}
            ></md-label>
          `
        : nothing;
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-input-container ${classMap(this.inputClassMap)}" part="md-input-container">
          ${this.labelTemplate()}
          <div class="md-input__wrapper ${classMap(this.inputWrapperClassMap)}">
            ${this.inputLeftTemplate()} ${this.inputTemplate()} ${this.inputRightTemplate()}
          </div>
          <div class="md-input__all-sub-labels-container">
            <div class="md-input__info-and-error-labels-container">
              ${this.messagesTemplate()} ${this.secondaryLabelTemplate()} ${this.helpTextTemplate()}
            </div>
            ${this.characterCountLabelTemplate()}
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-input": Input.ELEMENT;
  }

  interface HTMLElementEventMap {
    "input-change": CustomEvent<Input.InputChangeEventDetail>;
    "input-focus": CustomEvent<Input.InputFocusEventDetail>;
    "input-blur": CustomEvent<Input.InputBlurEventDetail>;
    "input-keydown": CustomEvent<Input.InputKeydownEventDetail>;
    "input-mousedown": CustomEvent<Input.InputMousedownEventDetail>;
    "input-clear": CustomEvent<Input.InputClearEventDetail>;
    "input-dropdown-click": CustomEvent<Input.InputDropdownClickEventDetail>;
  }
}
