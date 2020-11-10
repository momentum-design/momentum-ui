import "@/components/slider/Slider";
import { html } from "lit-html";

export const sliderTemplate = html`
  <div class="container">
    <md-slider now="20"></md-slider>
    <md-slider step="10"></md-slider>
    <md-slider now="44" no-pointer></md-slider>
    <md-slider disabled></md-slider>
  </div>
`;
