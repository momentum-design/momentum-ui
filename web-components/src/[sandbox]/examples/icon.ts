import "@/components/icon/Icon";
import { html } from "lit-element";

export const iconTemplate = html`
  <md-icon name="icon-arrow-up_16" class="testClass"></md-icon>
  <md-icon name="icon-accessibility_16" class="testClass" size="50" color="red-50"></md-icon>
  <md-icon name="icon-admin_32" class="testClass" color="green-50"></md-icon>
  <md-icon name="icon-chat_28" class="testClass" color="#008094"></md-icon>
  <h2>New Design Icons:</h2>

  <h3>Old icon:</h3>
  <md-icon name="pto_28" class="testClass" color="green-50"></md-icon>
  <h3>Swapping from old icon-> new icon (enabled):</h3>
  <md-icon
    name="pto_28"
    designEnabled="false"
    class="testClass"
    size="50"
    color="var(--avatar-presence-active)"
  ></md-icon>
  <h3>Using new icon enabled (enabled):</h3>
  <md-icon
    name="search-bold"
    designEnabled="true"
    class="testClass"
    size="50"
    color="var(--avatar-presence-active)"
  ></md-icon>
  <h3>Using new icon override (override):</h3>
  <md-icon
    name="search-bold"
    override="true"
    class="testClass"
    size="50"
    color="var(--avatar-presence-active)"
  ></md-icon>
`;
