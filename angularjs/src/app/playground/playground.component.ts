class PlaygroundController {}

export class Playground implements angular.IComponentOptions {
  static selector = 'playground';
  static controller = PlaygroundController;
  static template = `
  <article className="row copy-spacing">
    <h1>AngularJS Playground</h1>
    <div className="docs-container">
      <!-- insert code here -->
    </div>
  </article>
  `;
}
