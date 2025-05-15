import "@/components/floating-button-bar/FloatingButtonBar";
import { FloatingButtonActionGroup, FloatingButtonBarAction } from "@/components/floating-button-bar/FloatingButtonBar";
import { css, customElement, LitElement } from "lit-element";
import { html } from "lit-html";

@customElement("floating-button-bar-sandbox")
export class FloatingButtonBarTemplateSandbox extends LitElement {
  static get styles() {
    return css`
      .container {
        display: flex;
        width: 286px;
        height: 200px;
        background-color: var(--md-glass-bg-color);
        padding: 1rem;
        align-items: flex-end;
      }
    `;
  }

  private get assignToMeAction(): FloatingButtonBarAction {
    return {
      label: "Assign to me",
      isIconOnly: false,
      action: () => {
        console.log("Assign to me clicked");
      }
    };
  }

  private get backToTopAction(): FloatingButtonBarAction {
    return {
      label: "Back to top",
      icon: "arrow-tail-up-bold",
      isIconOnly: true,
      iconAlign: "right",
      action: () => {
        console.log("back to top action");
      }
    };
  }

  private get groupActions(): FloatingButtonActionGroup {
    return { actions: [this.assignToMeAction, this.backToTopAction] };
  }

  render() {
    return html` <div class="container">
      <md-floating-button-bar
        closeButtonAriaLabel="Clear selection"
        leadingLabel="4 selected"
        .actions=${[this.groupActions]}
      ></md-floating-button-bar>
    </div>`;
  }
}

export const floatingButtonBarTemplate = html` <floating-button-bar-sandbox></floating-button-bar-sandbox> `;
