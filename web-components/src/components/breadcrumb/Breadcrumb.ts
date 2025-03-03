import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, PropertyValues, queryAll } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { repeat } from "lit-html/directives/repeat";
import styles from "./scss/module.scss";

export namespace Breadcrumb {
  type NavCrumb = {
    link: string;
    label: string;
  };

  @customElementWithCheck("md-breadcrumb")
  export class ELEMENT extends LitElement {
    @property({ type: String, attribute: "aria-label" }) label = "Breadcrumb";
    @property({ type: Array, attribute: "nav-crumbs", reflect: true }) navCrumbs: NavCrumb[] = [];

    @queryAll("a[href]") anchors?: HTMLAnchorElement[];

    static get styles() {
      return [reset, styles];
    }

    private setLastAnchorCurrent() {
      if (this.anchors?.length) {
        this.anchors[this.anchors.length - 1].setAttribute("aria-current", "page");
      }
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.setLastAnchorCurrent();
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);

      if (changedProperties.has("navCrumbs")) {
        this.setLastAnchorCurrent();
      }
    }

    handleClick(event: MouseEvent) {
      const navCrumb = event.target as HTMLAnchorElement;

      if (this.anchors?.length) {
        const navCrumbIndex = Array.from(this.anchors).indexOf(navCrumb);
        if (navCrumbIndex !== -1) {
          this.navCrumbs = [...this.navCrumbs.splice(0, navCrumbIndex + 1)];
        }
      }
    }

    render() {
      return html`
        <nav aria-label="${ifDefined(this.label ? this.label : undefined)}" class="md-breadcrumb">
          <ul @click=${(event: MouseEvent) => this.handleClick(event)}>
            ${repeat(
              this.navCrumbs,
              (navCrumb: NavCrumb) => navCrumb.link,
              (navCrumb) => html`
                <li>
                  <a href="${navCrumb.link}"> ${navCrumb.label} </a>
                </li>
              `
            )}
          </ul>
        </nav>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-breadcrumb": Breadcrumb.ELEMENT;
  }
}
