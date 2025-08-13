import { Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { repeat } from "lit-html/directives/repeat";
import { styleMap } from "lit-html/directives/style-map";
import styles from "./scss/module.scss";

export namespace Slider {
  @customElementWithCheck("md-slider")
  export class ELEMENT extends FocusMixin(LitElement) {
    private _disabled = false;
    private _now = 0;
    @property({ type: Number, reflect: true }) min = 0;
    @property({ type: Number, reflect: true }) max = 100;
    @property({ type: Boolean, attribute: "hide-value" }) hideValue = false;
    @property({ type: Number, reflect: true })
    get now() {
      return this._now;
    }
    set now(value: number) {
      const oldNow = this._now;
      if (value < this.min || value > this.max) {
        console.warn("Please select correct value");
        return;
      }
      this._now = Math.round(value);
      this.requestUpdate("now", oldNow);
    }

    @property({ type: Number }) text = 0;
    @property({ type: String }) label = "slider";
    @property({ type: Number, reflect: true }) step = 0;
    @property({ type: Boolean, reflect: true })
    get disabled() {
      return this._disabled;
    }
    set disabled(value: boolean) {
      const oldValue = this._disabled;
      this._disabled = value;
      this.setAttribute("aria-disabled", `${value}`);
      if (value) {
        this.tabIndex = -1;
      } else {
        this.tabIndex = 0;
      }
      this.requestUpdate("disabled", oldValue);
    }

    @internalProperty() private dragging = false;

    private currentMouseEvent?: MouseEvent;

    private get pointerPosition() {
      const range = this.max - this.min;
      const progress = this.now - this.min;

      return (progress / range) * 100;
    }

    private get isRtl(): boolean {
      return getComputedStyle(this).direction === "rtl";
    }

    private calculateHandlePosition(event: MouseEvent) {
      const { width, left } = this.getBoundingClientRect();
      const { clientX } = event;

      let percent = (clientX - left) / width;
      if (this.isRtl) {
        percent = 1 - percent;
      }

      const value = this.min + (this.max - this.min) * percent;
      return value;
    }

    private moveSliderTo(value: number) {
      if (!this.disabled) {
        if (value > this.max) {
          this.now = this.max;
        } else if (value < this.min) {
          this.now = this.min;
        } else {
          this.now = value;
        }
      }
    }

    private trackMouseEvent() {
      if (!this.currentMouseEvent || !this.dragging) {
        return;
      }
      const pointerPosition = this.calculateHandlePosition(this.currentMouseEvent);

      const oldValue = this.now;
      this.moveSliderTo(pointerPosition);
      this.notifyChanging(oldValue, this.now);

      requestAnimationFrame(() => {
        this.trackMouseEvent();
      });
    }

    private ticksTemplate() {
      const { min, max, step } = this;
      const tickCount = Math.round((max - min) / step);
      const ticks = new Array(tickCount + 1)
        .fill(0, 0, tickCount + 1)
        .map((_, index) => min + index * step)
        .filter((tick) => tick >= min && tick <= max);
      return html`
        <div class="md-slider__hashlabel">${repeat(ticks, (tick) => html` <div class="tick">${tick}</div> `)}</div>
      `;
    }

    private displayValueTemplate() {
      return html` <span class="md-slider__value"> ${this.now} </span> `;
    }

    private notifyChanges() {
      this.dispatchEvent(
        new CustomEvent<{ value: number }>("slider-change", {
          bubbles: true,
          composed: true,
          detail: {
            value: this.now
          }
        })
      );
    }

    private notifyChanging(oldValue: number, newValue: number) {
      if (oldValue === newValue) {
        return;
      }

      this.dispatchEvent(
        new CustomEvent<{ oldValue: number; newValue: number }>("slider-changing", {
          bubbles: true,
          composed: true,
          detail: {
            oldValue: oldValue,
            newValue: newValue
          }
        })
      );
    }

    handleMouseDown(event: MouseEvent) {
      event.preventDefault();

      if (this.disabled) {
        return;
      }

      const handleMouseMove = (event: MouseEvent) => {
        this.currentMouseEvent = event;
      };

      const handleMouseUp = (event: MouseEvent) => {
        this.focus();
        this.currentMouseEvent = event;

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        requestAnimationFrame(() => {
          this.dragging = false;
          this.notifyChanges();
        });
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      this.focus();

      this.dragging = true;
      this.currentMouseEvent = event;

      requestAnimationFrame(() => {
        this.trackMouseEvent();
      });
    }

    handleKeyDown(event: KeyboardEvent) {
      const { code } = event;

      const oldValue = this.now;

      switch (code) {
        case Key.ArrowLeft:
          {
            this.moveSliderTo(this.now + (this.isRtl ? 1 : -1));
          }
          break;

        case Key.ArrowRight:
          {
            this.moveSliderTo(this.now + (this.isRtl ? -1 : 1));
          }
          break;

        case Key.ArrowDown:
          {
            this.moveSliderTo(this.now - 1);
          }
          break;
        case Key.ArrowUp:
          {
            this.moveSliderTo(this.now + 1);
          }
          break;
        case Key.Home:
          {
            this.moveSliderTo(this.min);
          }
          break;
        case Key.End:
          {
            this.moveSliderTo(this.max);
          }
          break;
        default:
          break;
      }

      this.notifyChanging(oldValue, this.now);

      const handleKeyUp = () => {
        document.removeEventListener("keyup", handleKeyUp);
        this.notifyChanges();
      };

      document.addEventListener("keyup", handleKeyUp);
    }

    get sliderPointerStyleMap() {
      return {
        "inset-inline-start": `${this.pointerPosition}%`
      };
    }
    get sliderSelectionStyleMap() {
      return {
        "inset-inline-end": `calc(100% - ${this.pointerPosition}%)`
      };
    }

    static get styles() {
      return [reset, styles];
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.setAttribute("tabindex", this.disabled ? "-1" : "0");
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("mousedown", this.handleMouseDown);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this.handleKeyDown);
      this.removeEventListener("mousedown", this.handleMouseDown);
    }

    render() {
      return html`
        <div class="md-slider">
          <span class="md-slider__bar"></span>
          <span class="md-slider__selection" style=${styleMap(this.sliderSelectionStyleMap)}></span>
          <span
            class="md-slider__pointer"
            role="slider"
            part="slider"
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${this.now}
            aria-label=${ifDefined(this.label)}
            style=${styleMap(this.sliderPointerStyleMap)}
          ></span>
          ${this.step ? this.ticksTemplate() : nothing} ${this.hideValue ? nothing : this.displayValueTemplate()}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-slider": Slider.ELEMENT;
  }
}
