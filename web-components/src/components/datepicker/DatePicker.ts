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
  isDayDisabled,
  now,
  reformatDateString,
  subtractDays,
  subtractWeeks
} from "@/utils/dateUtils";
import { closestElement } from "@/utils/helpers";
import { ValidationRegex } from "@/utils/validations";
import { html, internalProperty, LitElement, property, PropertyValues, query, TemplateResult } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import { DateRangePicker } from "../date-range-picker/DateRangePicker";
import { Input } from "../input/Input"; // Keep type import as a relative path
import { MenuOverlay } from "../menu-overlay/MenuOverlay"; // Keep type import as a relative path
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
    @property({ type: String }) locale = "en-US";
    @property({ type: Boolean, reflect: true, attribute: "includes-time" }) includesTime = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) htmlId = "";
    @property({ type: String }) label = "";
    @property({ type: String }) ariaLabel = "Choose Date";
    @property({ type: Boolean }) required = false;
    @property({ type: String, reflect: true }) errorMessage = "";
    @property({ type: Boolean, attribute: "custom-trigger" }) customTrigger = false;
    @property({ type: Boolean }) isMenuOverlayOpen = false;
    @property({ type: Boolean }) newMomentum?: boolean = undefined;
    @property({ type: Boolean, attribute: "compact-input" }) compactInput?: boolean = undefined;
    @property({ type: Object, attribute: false }) controlButtons?: DatePickerControlButtons = undefined;

    @internalProperty() selectedDate: DateTime = now();
    @internalProperty() focusedDate: DateTime = now();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    @internalProperty() filterDate: Function | undefined = undefined;
    @internalProperty() maxDateData: DateTime | undefined = undefined;
    @internalProperty() minDateData: DateTime | undefined = undefined;

    @query("md-menu-overlay") menuOverlay!: MenuOverlay.ELEMENT;
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

      this.value = reformatDateString(this.value);
    }

    firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      if (this.value === EMPTY_STRING) {
        this.value = this.includesTime
          ? reformatDateString(this.selectedDate?.startOf("second").toISO({ suppressMilliseconds: true }))
          : reformatDateString(this.selectedDate?.toISODate());
      }
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (this.value && changedProperties.has("value")) {
        if (closestElement("md-date-range-picker", this)) {
          return;
        }
        this.selectedDate = dateStringToDateTime(this.value);
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
    }

    handleDateInputChange = (event: CustomEvent) => {
      this.value = reformatDateString(event?.detail?.value);
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
      this.menuOverlay.isOpen = open;
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
        this.value = reformatDateString(dateString);
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

    chosenDateLabel = () => {
      return this.selectedDate
        ? `, Selected date is ${this.selectedDate.weekdayLong} ${this.selectedDate.monthLong} ${this.selectedDate.day}, ${this.selectedDate.year}`
        : undefined;
    };

    private readonly getValidRegexString = (): string => {
      const dateRangePicker = closestElement("md-date-range-picker", this) as DateRangePicker.ELEMENT;
      if (dateRangePicker) {
        return ValidationRegex.dateRangeString;
      }

      if (this.includesTime) {
        return ValidationRegex.ISOString;
      }

      return ValidationRegex.ISODateString;
    };

    isValueValid = (): boolean => {
      if (!this.value && this.value !== EMPTY_STRING) return true;
      const regex = RegExp(this.getValidRegexString());

      const filters: DayFilters = { maxDate: this.maxDateData, minDate: this.minDateData, filterDate: this.filterDate };
      const isValid =
        !!this.value && regex.test(this.value) && !isDayDisabled(dateStringToDateTime(this.value), filters);

      return isValid;
    };

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

    private renderControlButtons(): TemplateResult {
      if (!this.controlButtons) {
        return html``;
      }

      return html`
        <div class="control-buttons">
          ${this.controlButtons.cancel
            ? html`
                <md-button
                  class="cancel-button"
                  aria-label=${ifDefined(this.controlButtons.cancel?.ariaLabel)}
                  ?disabled=${this.controlButtons.cancel?.disabled ?? false}
                  @click=${this.onCancelClick}
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
                  @click=${this.onApplyClick}
                  variant="primary"
                >
                  ${this.controlButtons.apply.value}
                </md-button>
              `
            : null}
        </div>
      `;
    }

    render() {
      return html`
        <md-menu-overlay is-date-picker custom-width="272px" ?disabled=${this.disabled}>
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
                  placeholder=${this.placeholder ? this.placeholder : "YYYY-MM-DD"}
                  value=${ifDefined(this.value ?? undefined)}
                  htmlId=${this.htmlId}
                  label=${this.label}
                  ariaLabel=${this.ariaLabel + this.chosenDateLabel()}
                  ariaExpanded=${this.isMenuOverlayOpen ? "true" : "false"}
                  ariaControls="date-overlay-content"
                  auxiliaryContentPosition="before"
                  ?required=${this.required}
                  @keydown=${(event: KeyboardEvent) => this.handleInputKeyDown(event)}
                  @input-change="${(e: CustomEvent) => this.handleDateInputChange(e)}"
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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker": DatePicker.ELEMENT;
  }
}
