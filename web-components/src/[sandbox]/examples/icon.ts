import "@/components/icon/Icon";
import { html } from "lit-element";

export const iconTemplate = html`
  <md-icon name="icon-arrow-up_16" class="testClass"></md-icon>
  <md-icon name="icon-accessibility_16" class="testClass" size="50" color="red-50"></md-icon>
  <md-icon name="icon-admin_32" class="testClass" color="green-50"></md-icon>
  <md-icon name="icon-chat_28" class="testClass" color="#008094"></md-icon>
  <h2>New Design Icons:</h2>

  <h3>Old icon:</h3>
  <md-icon name="pto_28" class="testClass" color="green-50" title="pto"></md-icon>

  <h3>Swapping from old icon -> new icon (enabled):</h3>
  <md-icon
    name="pto_28"
    class="testClass"
    iconSet="preferMomentumDesign"
    size="50"
    title="pto"
    color="var(--avatar-presence-active)"
  ></md-icon>

  <h3>Using new icon enabled (enabled):</h3>
  <md-icon
    name="search_16"
    iconSet="preferMomentumDesign"
    class="testClass"
    size="50"
    color="var(--avatar-presence-active)"
  ></md-icon>

  <h3>Using new icon skip lookup (override):</h3>
  <md-icon
    name="search-bold"
    iconSet="momentumDesign"
    class="testClass"
    title="search"
    size="50"
    color="var(--avatar-presence-active)"
  ></md-icon>

  <h3>Icon with svg colouring</h3>
  <md-icon name="social-fbmessenger-colored" iconSet="momentumDesign" title="facebook messenger" size="32"></md-icon>
  <md-icon name="social-microsoft-colored" iconSet="momentumDesign" title="microsoft" size="32"></md-icon>
  <md-icon name="social-viber-colored" iconSet="momentumDesign" title="viber" size="32"></md-icon>
  <md-icon name="social-telegram-colored" iconSet="momentumDesign" title="telegram" size="32"></md-icon>
  <md-icon name="social-sms-colored-mint" iconSet="momentumDesign" title="social-sms-colored-mint" size="32"></md-icon>
  <md-icon name="social-rcs-colored" iconSet="momentumDesign" title="rcs" size="32"></md-icon>
  <md-icon name="social-wechat-colored" iconSet="momentumDesign" title="wechat" size="32"></md-icon>
  <md-icon name="social-whatsapp-colored" iconSet="momentumDesign" title="whatsapp" size="32"></md-icon>
  <md-icon name="social-alexa-colored" iconSet="momentumDesign" title="alexa" size="32"></md-icon>
  <md-icon name="social-facebook-colored" iconSet="momentumDesign" title="facebook" size="32"></md-icon>
  <md-icon name="apple-business-chat-colored" iconSet="momentumDesign" title="apple business chat" size="32"></md-icon>
  <md-icon name="social-x" iconSet="momentumDesign" title="X" size="32"></md-icon>
`;
