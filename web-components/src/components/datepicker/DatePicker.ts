/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { Key } from "@/constants";
import { themeManager } from "@/managers/ThemeManager";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import {
  addDays,
  addWeeks,
  dateStringToDateTime,
  DayFilters,
  getLocaleDateFormat,
  isDayDisabled,
  now,
  subtractDays,
  subtractWeeks
} from "@/utils/dateUtils";
import { closestElement } from "@/utils/helpers";
import { ValidationRegex } from "@/utils/validations";
import { html, LitElement, nothing, PropertyValues, TemplateResult } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { DateTime } from "luxon";
import { Input } from "../input/Input"; // Keep type import as a relative path
import { MenuOverlay } from "../menu-overlay/MenuOverlay"; // Keep type import as a relative path
import { Popover, PopoverController } from "../popover/Popover";
import { StrategyType } from "../popover/Popover.types";
import styles from "./scss/module.scss";
export interface DatePickerControlButton {
  value: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export interface DatePickerControlButtons {
  apply?: DatePickerControlButton;
  cancel?: DatePickerControlButton;
}

const DEFAULT_ARIA_LABEL = "Choose Date";
const DEFAULT_ARIA_LABEL_DATE_SELECTED = "Choose Date, selected date is ";
const DEFAULT_POPOVER_OFFSET = 15;

export namespace DatePicker {
  export const weekStartDays = ["Sunday", "Monday"];
  const EMPTY_STRING = "";

  @customElementWithCheck("md-datepicker")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean, attribute: "should-close-on-select" }) shouldCloseOnSelect = false;
    @property({ type: String }) maxDate: string | undefined | null = undefined;
    @property({ type: String }) minDate: string | undefined | null = undefined;
    @property({ type: String, reflect: true }) value: string | null | undefined = undefined;
    @property({ type: String }) weekStart: (typeof weekStartDays)[number] = "Sunday";
    @property({ type: String, reflect: true }) placeholder: string | undefined = undefined;
    @property({ type: String }) locale: string | undefined = undefined;
    @property({ type: Boolean }) useISOFormat = true;
    @property({ type: Boolean }) validateDate = true;
    @property({ type: Boolean, reflect: true, attribute: "includes-time" }) includesTime = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) htmlId = "";
    @property({ type: String }) label = "";
    @property({ type: String }) ariaLabel: string | null = null;
    @property({ type: String }) displayValue: string | null = null;
    @property({ type: Boolean }) required = false;
    @property({ type: String, reflect: true }) errorMessage = "";
    @property({ type: Boolean, attribute: "custom-trigger" }) customTrigger = false;
    @property({ type: Boolean }) isMenuOverlayOpen = false;
    @property({ type: Boolean }) newMomentum?: boolean = undefined;
    @property({ type: Boolean }) disableUserTextInput = false;
    @property({ type: Boolean, attribute: "compact-input" }) compactInput?: boolean = undefined;
    @property({ type: Object, attribute: false }) controlButtons?: DatePickerControlButtons = undefined;
    @property({ type: String, attribute: "positioning-strategy" })
    positioningStrategy?: StrategyType = undefined;
    @property({ type: Boolean, attribute: "show-default-now-date" }) showDefaultNowDate = true;
    @property({ type: Boolean, attribute: "use-popover" }) usePopover = false;
    @property({ type: String, attribute: "triggerID" }) triggerID = "date-trigger";
    @property({ type: Boolean, reflect: true, attribute: "animation-frame" })
    animationFrame: boolean = false;
    @state() selectedDate: DateTime = now();
    @state() focusedDate: DateTime = now();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    @state() filterDate: Function | undefined = undefined;
    @state() maxDateData: DateTime | undefined = undefined;
    @state() minDateData: DateTime | undefined = undefined;

    private popoverController: PopoverController | null = null;

    @query("md-menu-overlay") menuOverlay!: MenuOverlay.ELEMENT;
    @query("md-popover") popoverElement!: Popover;
    get computedNewMomentum() {
      if (this.newMomentum !== undefined) {
        return this.newMomentum;
      }

      return themeManager.isMomentumV2Enabled;
    }

    static get styles() {
      return styles;
    }

    connectedCallback() {
      super.connectedCallback();
      if (this.minDate) {
        this.minDateData = dateStringToDateTime(this.minDate);
      }
      if (this.maxDate) {
        this.maxDateData = dateStringToDateTime(this.maxDate);
      }
      if (this.usePopover) {
        this.popoverController = new PopoverController();
      }
    }

    firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      if (!this.value && this.showDefaultNowDate) {
        this.value = this.getFormattedDate(this.selectedDate);
      }
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (this.value && changedProperties.has("value")) {
        if (closestElement("md-date-range-picker", this)) {
          return;
        }
        if (this.useISOFormat) {
          this.selectedDate = dateStringToDateTime(this.value);
        } else {
          this.selectedDate = DateTime.fromFormat(this.value, getLocaleDateFormat(this.locale), {
            locale: this.locale
          });
        }
        this.setPreSelection(this.selectedDate);
      }
      if (changedProperties.has("locale")) {
        this.render();
      }
      if (this.minDate && changedProperties.has("minDate")) {
        this.minDateData = dateStringToDateTime(this.minDate);
      }
      if (this.maxDate && changedProperties.has("maxDate")) {
        this.maxDateData = dateStringToDateTime(this.maxDate);
      }
      if (!this.usePopover && changedProperties.has("usePopover")) {
        this.popoverController = new PopoverController();
      }
    }

    handleDateInputChange = (event: CustomEvent) => {
      if (this.useISOFormat) {
        this.value = event?.detail?.value;
      } else {
        this.value = this.selectedDate?.toLocaleString(DateTime.DATE_SHORT, { locale: this.locale });
      }
      this.dispatchEvent(
        new CustomEvent("date-input-change", {
          bubbles: true,
          composed: true,
          detail: {
            sourceEvent: event,
            value: this.value
          }
        })
      );
    };

    setOpen = (open: boolean) => {
      if (this.usePopover) {
        if (open) {
          this.popoverController?.show();
        } else {
          this.popoverController?.hide();
        }
      } else {
        this.menuOverlay.isOpen = open;
      }
      this.isMenuOverlayOpen = open;
    };

    handleSelect(e: CustomEvent) {
      const date = e.detail.date;
      const event = e.detail.sourceEvent;
      this.setPreSelection(date);

      this.dispatchEvent(
        new CustomEvent("date-pre-selection-change", {
          bubbles: true,
          composed: true,
          detail: {
            sourceEvent: event,
            data: date
          }
        })
      );

      if (this.controlButtons?.apply && event?.type !== "apply-button-clicked") {
        return;
      }

      this.setSelected(date, event);
      if (this.shouldCloseOnSelect) {
        this.setOpen(false);
      }
    }

    private getISODateTime(date: DateTime): string | null {
      return this.includesTime ? date.startOf("second").toISO({ suppressMilliseconds: true }) : date.toISODate();
    }

    protected setSelected(date: DateTime, event: Event) {
      const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
      if (!isDayDisabled(date, filters)) {
        const dateString = this.getISODateTime(date);
        this.selectedDate = date;
        if (this.useISOFormat) {
          this.value = dateString;
        } else {
          this.value = date.toLocaleString(DateTime.DATE_SHORT, { locale: this.locale });
        }
      }
      this.dispatchEvent(
        new CustomEvent("date-selection-change", {
          bubbles: true,
          composed: true,
          detail: {
            sourceEvent: event,
            data: date
          }
        })
      );
    }

    setPreSelection = (date: DateTime) => {
      const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
      if (!isDayDisabled(date, filters)) {
        this.focusedDate = date;
      }
    };

    handleInputKeyDown = (event: KeyboardEvent) => {
      if (event.code === Key.ArrowDown) {
        this.setOpen(true);
      }
    };

    handleKeyDown = (e: CustomEvent) => {
      const event = e.detail.sourceEvent;
      let flag = false;
      const copy = this.focusedDate;

      switch (!event.shiftKey && event.code) {
        case "Space":
        case "Enter":
          this.handleSelect(e);
          flag = true;
          break;

        case "Escape":
          this.setOpen(false);
          break;
        case "ArrowUp":
          this.setPreSelection(subtractWeeks(copy, 1));
          flag = true;
          break;
        case "ArrowLeft":
          this.setPreSelection(subtractDays(copy, 1));
          flag = true;
          break;

        case "ArrowRight":
          this.setPreSelection(addDays(copy, 1));
          flag = true;
          break;

        case "ArrowDown":
          this.setPreSelection(addWeeks(copy, 1));
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    protected getDefaultAriaLabel = (): string => {
      if (this.selectedDate?.isValid) {
        return `${DEFAULT_ARIA_LABEL_DATE_SELECTED}${this.selectedDate.toLocaleString(DateTime.DATE_FULL)}`;
      }
      return DEFAULT_ARIA_LABEL;
    };

    private readonly getValidRegexString = (): string => {
      if (this.includesTime) {
        return ValidationRegex.ISOString;
      }

      return ValidationRegex.ISODateString;
    };

    protected validateDateString(dateString: string | null | undefined): boolean {
      if (!dateString && dateString !== EMPTY_STRING) return true;

      if (this.useISOFormat) {
        const regex = RegExp(this.getValidRegexString());
        const filters: DayFilters = {
          maxDate: this.maxDateData,
          minDate: this.minDateData,
          filterDate: this.filterDate
        };
        return !!dateString && regex.test(dateString) && !isDayDisabled(dateStringToDateTime(dateString), filters);
      }

      const format = getLocaleDateFormat(this.locale);
      const parsedDate = DateTime.fromFormat(dateString, format, { locale: this.locale });

      return parsedDate.isValid;
    }

    protected isValueValid(): boolean {
      if (!this.validateDate) {
        return true;
      }
      return this.validateDateString(this.value);
    }

    private get messageArray(): Input.Message[] {
      if (this.errorMessage) {
        return [{ message: this.errorMessage, type: "error" }];
      } else if (!this.isValueValid()) {
        return [{ message: "", type: "error" }];
      } else {
        return [];
      }
    }

    private onCancelClick() {
      this.setOpen(false);
    }

    protected onApplyClick() {
      this.handleSelect(
        new CustomEvent("day-select", {
          detail: { date: this.focusedDate, sourceEvent: new Event("apply-button-clicked") }
        })
      );
    }

    private renderControlButtons(): TemplateResult | typeof nothing {
      if (!this.controlButtons) {
        return nothing;
      }

      return html`
        <div class="control-buttons">
          ${this.controlButtons.cancel
            ? html`
                <md-button
                  class="cancel-button"
                  aria-label=${ifDefined(this.controlButtons.cancel?.ariaLabel)}
                  ?disabled=${this.controlButtons.cancel?.disabled ?? false}
                  @button-click=${this.onCancelClick}
                  variant="secondary"
                >
                  ${this.controlButtons.cancel.value}
                </md-button>
              `
            : null}
          ${this.controlButtons.apply
            ? html`
                <md-button
                  class="apply-button"
                  aria-label=${ifDefined(this.controlButtons.apply?.ariaLabel)}
                  ?disabled=${this.controlButtons.apply?.disabled ?? false}
                  @button-click=${this.onApplyClick}
                  variant="primary"
                >
                  ${this.controlButtons.apply.value}
                </md-button>
              `
            : null}
        </div>
      `;
    }

    protected getPlaceHolderString(): string {
      if (this.placeholder) {
        return this.placeholder;
      }
      if (this.useISOFormat) {
        return "YYYY-MM-DD";
      }
      return getLocaleDateFormat(this.locale ?? DateTime.local().locale).toUpperCase();
    }

    protected getFormattedDate(date: DateTime): string | null {
      if (!date) return null;

      if (this.useISOFormat) {
        return this.getISODateTime(date);
      } else {
        return this.includesTime
          ? date.toLocaleString(DateTime.DATETIME_SHORT, { locale: this.locale })
          : date.toLocaleString(DateTime.DATE_SHORT, { locale: this.locale });
      }
    }

    private getAriaLabel(): string {
      return this.ariaLabel ?? this.getDefaultAriaLabel();
    }

    private get isAriaExpanded(): string {
      return this.isMenuOverlayOpen ? "true" : "false";
    }

    renderPopover() {
      return html`
        <md-popover
          trigger="click"
          .triggerID=${this.triggerID}
          placement="bottom"
          strategy=${ifDefined(this.positioningStrategy)}
          hide-on-escape
          hide-on-outside-click
          focus-trap
          focus-back-to-trigger
          .controller=${this.popoverController}
          ?animation-frame=${this.animationFrame}
          .offset=${DEFAULT_POPOVER_OFFSET}
        >
          <div class="date-overlay-content">
            <md-datepicker-calendar
              @day-select=${(e: CustomEvent) => this.handleSelect(e)}
              @day-key-event=${(e: CustomEvent) => this.handleKeyDown(e)}
              .datePickerProps=${{
                locale: this.locale,
                selected: this.selectedDate,
                focused: this.focusedDate,
                weekStart: this.weekStart
              }}
              ?short-day=${this.computedNewMomentum}
              .filterParams=${{ minDate: this.minDateData, maxDate: this.maxDateData, filterDate: this.filterDate }}
            ></md-datepicker-calendar>
            <slot name="time-picker"></slot>
            ${this.renderControlButtons()}
          </div>
        </md-popover>
        ${this.customTrigger
          ? html`
              <span slot="menu-trigger">
                <slot name="date-trigger"></slot>
              </span>
            `
          : html`
              <md-input
                id="date-trigger"
                class="date-input"
                slot="menu-trigger"
                role="combobox"
                ?newMomentum=${this.computedNewMomentum}
                placeholder=${this.getPlaceHolderString()}
                value=${this.displayValue ?? ifDefined(this.value ?? undefined)}
                .disableUserTextInput=${this.disableUserTextInput}
                htmlId=${this.htmlId}
                label=${this.label}
                ariaLabel=${this.getAriaLabel()}
                ariaExpanded=${this.isAriaExpanded}
                ariaControls="date-overlay-content"
                auxiliaryContentPosition="before"
                ?required=${this.required}
                @keydown=${(event: KeyboardEvent) => this.handleInputKeyDown(event)}
                @input-change=${(e: CustomEvent) => this.handleDateInputChange(e)}
                ?disabled=${this.disabled}
                ?hide-message=${!this.errorMessage || this.isValueValid()}
                ariaInvalid=${!!this.errorMessage || !this.isValueValid()}
                .messageArr=${this.messageArray}
                ?compact=${this.compactInput}
              >
                <md-icon slot="input-section" name="calendar-month-bold" size="16" iconSet="momentumDesign"></md-icon>
              </md-input>
            `}
      `;
    }

    renderMenuOverlay() {
      return html`
        <md-menu-overlay
          is-date-picker
          custom-width="272px"
          ?disabled=${this.disabled}
          positioning-strategy=${ifDefined(this.positioningStrategy)}
        >
          ${this.customTrigger
            ? html`
                <span slot="menu-trigger">
                  <slot name="date-trigger"></slot>
                </span>
              `
            : html`
                <md-input
                  class="date-input"
                  slot="menu-trigger"
                  role="combobox"
                  ?newMomentum=${this.computedNewMomentum}
                  placeholder=${this.getPlaceHolderString()}
                  value=${this.displayValue ?? ifDefined(this.value ?? undefined)}
                  .disableUserTextInput=${this.disableUserTextInput}
                  htmlId=${this.htmlId}
                  label=${this.label}
                  ariaLabel=${this.getAriaLabel()}
                  ariaExpanded=${this.isAriaExpanded}
                  ariaControls="date-overlay-content"
                  auxiliaryContentPosition="before"
                  ?required=${this.required}
                  @keydown=${(event: KeyboardEvent) => this.handleInputKeyDown(event)}
                  @input-change=${(e: CustomEvent) => this.handleDateInputChange(e)}
                  ?disabled=${this.disabled}
                  ?hide-message=${!this.errorMessage || this.isValueValid()}
                  ariaInvalid=${!!this.errorMessage || !this.isValueValid()}
                  .messageArr=${this.messageArray}
                  ?compact=${this.compactInput}
                >
                  <md-icon slot="input-section" name="calendar-month-bold" size="16" iconSet="momentumDesign"></md-icon>
                </md-input>
              `}

          <div class="date-overlay-content">
            <md-datepicker-calendar
              @day-select=${(e: CustomEvent) => this.handleSelect(e)}
              @day-key-event=${(e: CustomEvent) => this.handleKeyDown(e)}
              .datePickerProps=${{
                locale: this.locale,
                selected: this.selectedDate,
                focused: this.focusedDate,
                weekStart: this.weekStart
              }}
              ?short-day=${this.computedNewMomentum}
              .filterParams=${{ minDate: this.minDateData, maxDate: this.maxDateData, filterDate: this.filterDate }}
            ></md-datepicker-calendar>
            <slot name="time-picker"></slot>
            ${this.renderControlButtons()}
          </div>
        </md-menu-overlay>
      `;
    }

    render() {
      if (this.usePopover) {
        return this.renderPopover();
      } else {
        return this.renderMenuOverlay();
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker": DatePicker.ELEMENT;
  }
}
