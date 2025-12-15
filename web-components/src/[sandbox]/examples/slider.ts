import "@/components/slider/Slider";
import { html } from "lit";

export const sliderTemplate = html`
  <div class="container">
    <h3>Slider: now set at 20</h3>
    <md-slider now="20"></md-slider>
    <h3>Slider: step set at 10</h3>
    <md-slider step="10"></md-slider>
    <h3>Slider: now set at 44 & no-pointer</h3>
    <md-slider now="44" no-pointer></md-slider>
    <h3>Slider: disabled</h3>
    <md-slider disabled></md-slider>
    <h3>Slider: hide-value</h3>
    <md-slider hide-value></md-slider>
  </div>
`;
