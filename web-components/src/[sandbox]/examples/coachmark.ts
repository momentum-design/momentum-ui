import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/coachmark/Coachmark";
import { html } from "lit-element";

export const coachTemplate = html`
  <div class="container">
    <div class="column ">
      <div class="row md-margin__bottom"><h3>md-coachmark</h3></div>
      <div class="row md-padding__vertical">
        <md-coachmark message="Coachmark  test content">
          <md-button>Coachmark Default</md-button>
        </md-coachmark>
      </div>
    </div>
  </div>
`;
