import "@/components/link/Link";
import { html } from "lit";

export const linkTemplate = html`
  <div class="row">
    <md-link href="#">
      Default Link
    </md-link>
  </div>
  <div class="row">
    <md-link disabled>
      Disabled Link
    </md-link>
  </div>
  <div class="row">
    <md-link tag="div">
      Link Tag DIV
    </md-link>
  </div>
  <div class="row">
    <md-link tag="span">
      Link Tag Span
    </md-link>
  </div>
  <div class="row">
    <md-link inline>
      Link inline
    </md-link>
  </div>
  <div class="row">
    <md-link inline disabled>
      Link inline disabled
    </md-link>
  </div>
  <div class="row">
    <md-link inline href="http://test.com" target="_blank">
      Link Opened in new window
    </md-link>
  </div>

  <div class="row">
    <md-link tag="div" tab-index="1">
      tab index 1
    </md-link>
  </div>
  <div class="row">
    <md-link tag="div" tab-index="-1">
      tab-index -1
    </md-link>
  </div>
`;
