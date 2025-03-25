import "@/components/checkbox/Checkbox";
import "@/components/grabber/Grabber";
import { type Grabber } from "@/components/grabber/Grabber";
import { html, LitElement, PropertyValues } from "lit";
import { customElement, query, state } from "lit/decorators.js";

@customElement("grabber-template-sandbox")
export class GrabberTemplateSandbox extends LitElement {
  @query("#grabberLeading")
  private readonly grabberLeading!: Grabber.ELEMENT;

  @query("#grabberTrailing")
  private readonly grabberTrailing!: Grabber.ELEMENT;

  @query("#grabberTop")
  private readonly grabberTop!: Grabber.ELEMENT;

  @query("#grabberBottom")
  private readonly grabberBottom!: Grabber.ELEMENT;

  @query("#grabberToggle")
  private readonly grabberToggle!: Grabber.ELEMENT;

  @state()
  private shadow = false;

  constructor() {
    super();
    this.onWindowMouseMove = this.onWindowMouseMove.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("grabber-toggled", this.grabberToggled as EventListener);
    this.addEventListener("grabber-hover-changed", this.grabberHovered as EventListener);
    window.addEventListener("mousemove", this.onWindowMouseMove);
  }

  disconnectedCallback(): void {
    this.removeEventListener("grabber-toggled", this.grabberToggled as EventListener);
    this.removeEventListener("grabber-hover-changed", this.grabberHovered as EventListener);
    window.removeEventListener("mousemove", this.onWindowMouseMove);

    super.disconnectedCallback();
  }

  onWindowMouseMove(e: MouseEvent) {
    if (this.grabberToggle) {
      const rect = this.grabberToggle.getBoundingClientRect();
      if (this.isMouseCloseToRect(e, rect)) {
        this.grabberToggle.visible = true;
      } else {
        this.grabberToggle.visible = false;
      }
    }
  }

  grabberToggled() {
    this.requestUpdate();
  }

  grabberHovered() {
    this.requestUpdate();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    //After the first update the query properties will
    //no longer be null so request an other update
    this.requestUpdate();
  }

  grabberDetailTemplate(grabber: Grabber.ELEMENT | null | undefined) {
    if (grabber === null || grabber === undefined) {
      return html` <p>Loading...</p> `;
    }
    return html`
      <p>Label: ${grabber.checked ? grabber.checkedLabel : grabber.label}</p>
      <p>Checked: ${grabber.checked}</p>
      <p>Hovered: ${grabber.hovered}</p>
    `;
  }

  get isCollapsed() {
    return !this.grabberToggle?.checked || false;
  }

  render() {
    return html`
      <style>
        .toggle-container {
          display: flex;
          align-items: center;
          height: 500px;
        }

        .dragger-container {
          display: flex;
          align-items: center;
          width: 400px;
          max-height: 200px;
          min-height: 0px;
          height: 100px;
          flex-direction: column;
        }

        .toggle-div {
          width: 200px;
          height: 100%;
          background-color: var(--md-content-bg-color);
          transition: width 0.3s ease;

          border-radius: 12px;
          box-shadow: 0px 4px 8px 0px #00000033;
        }
        .toggle-div.collapsed {
          width: 0px;
        }

        .dragger-div {
          max-height: 200px;
          min-height: 0px;
        }

        .divider {
          width: 1px;
          height: 100%;
          background: var(--md-nav-divider-primary);
        }

        .h-divider {
          height: 1px;
          width: 100%;
          background: var(--md-nav-h-divider-primary);
        }
      </style>
      <div>
        <md-checkbox slot="checkbox" ?checked=${this.shadow} @checkbox-change=${() => (this.shadow = !this.shadow)}>
          shadow
        </md-checkbox>
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Leading</h3>
        <md-grabber id="grabberLeading" alignment="leading" ?shadow=${this.shadow}></md-grabber>
        ${this.grabberDetailTemplate(this.grabberLeading)}
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Trailing</h3>
        <md-grabber id="grabberTrailing" alignment="trailing" ?shadow=${this.shadow}></md-grabber>
        ${this.grabberDetailTemplate(this.grabberTrailing)}
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Top</h3>
        <md-grabber id="grabberTop" alignment="top" ?shadow=${this.shadow}></md-grabber>
        ${this.grabberDetailTemplate(this.grabberTop)}
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Bottom</h3>
        <md-grabber id="grabberBottom" alignment="bottom" ?shadow=${this.shadow}></md-grabber>
        ${this.grabberDetailTemplate(this.grabberBottom)}
      </div>
      <div class="custom-grabber">
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Bottom disable-click-toggle dragger</h3>
        <md-grabber
          id="grabberBottom"
          alignment="bottom"
          ?shadow=${this.shadow}
          disable-click-toggle
          dragger
        ></md-grabber>
        ${this.grabberDetailTemplate(this.grabberBottom)}
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Toggle Width Example</h3>
        <div class="toggle-container">
          <div class="toggle-div collapsed" id="toggleDiv"></div>
          <div class="divider"></div>
          <md-grabber
            id="grabberToggle"
            alignment="leading"
            ?shadow=${this.shadow}
            @grabber-toggled="${this.toggleWidth.bind(this)}"
          ></md-grabber>
        </div>
      </div>
      <div>
        <h3 class="sandbox-header" style="margin: .5rem 1rem">Drag height Example</h3>
        <div class="dragger-container">
          <md-grabber
            id="grabberDrag"
            alignment="bottom"
            ?shadow=${this.shadow}
            disable-click-toggle
            dragger
          ></md-grabber>
          <div class="dragger-div" id="draggerDiv"></div>
          <div class="h-divider"></div>
        </div>
      </div>
    `;
  }

  toggleWidth() {
    const toggleDiv = this.shadowRoot?.querySelector("#toggleDiv");
    if (toggleDiv) {
      if (this.isCollapsed) {
        toggleDiv.classList.add("collapsed");
      } else {
        toggleDiv.classList.remove("collapsed");
      }
    }
  }

  VISIBLE_DISTANCE = 100; //px

  isMouseCloseToRect = (e: MouseEvent, rect: DOMRect) => {
    return (
      rect.left - this.VISIBLE_DISTANCE <= e.clientX &&
      rect.right + this.VISIBLE_DISTANCE >= e.clientX &&
      rect.top - this.VISIBLE_DISTANCE <= e.clientY &&
      rect.bottom + this.VISIBLE_DISTANCE >= e.clientY
    );
  };
}

export const grabberTemplate = html`
  <h3 class="sandbox-header">Default Grabber</h3>
  <grabber-template-sandbox></grabber-template-sandbox>
`;
