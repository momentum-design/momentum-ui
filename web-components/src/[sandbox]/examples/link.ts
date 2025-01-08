import "@/components/link/Link";
import { html } from "lit-element";

export const linkTemplate = html`
  <div class="row">
    <md-link href="#"> Default Link </md-link>
  </div>
  <div class="row">
    <md-link disabled> Disabled Link </md-link>
  </div>
  <div class="row">
    <md-link tag="div"> Link Tag DIV </md-link>
  </div>
  <div class="row">
    <md-link tag="div" disabled> Link Tag DIV disabled </md-link>
  </div>
  <div class="row">
    <md-link tag="span"> Link Tag Span </md-link>
  </div>
  <div class="row">
    <md-link tag="span" disabled> Link Tag Span disabled </md-link>
  </div>

  <div class="row">
    <md-link inline> Link inline </md-link>
  </div>
  <div class="row">
    <md-link inline disabled> Link inline disabled </md-link>
  </div>
  <div class="row">
    <md-link inline href="http://test.com" target="_blank"> Link Opened in new window </md-link>
  </div>

  <div class="row">
    <md-link tag="div" tab-index="1"> tab index 1 </md-link>
  </div>
  <div class="row">
    <md-link tag="div" tab-index="-1"> tab-index -1 </md-link>
  </div>
  <div class="row">
    <md-link ariaLabel="Test Link"> Link with Aria Label </md-link>
  </div>
  <div class="row">
    <md-link ariaRole="button"> Role as button </md-link>
  </div>

  <div class="row">
    <md-link tag="a" size="large"> large </md-link>
  </div>
  <div class="row">
    <md-link tag="a" size="midsize"> midsize </md-link>
  </div>
  <div class="row">
    <md-link tag="a" size="small"> small </md-link>
  </div>

  <div class="row" style="background-color: var(--md-inverted-primary-bg-color)">
    <md-link tag="a" size="large" inverted> large inverted </md-link>
  </div>
`;
