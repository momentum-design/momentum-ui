import "@/components/skeleton/Skeleton";
import { html } from "lit-element";

export const skeletonTemplate = html`
  <style>
    .skeleton-container {
      display: flex;
      gap: 0.5em;
    }
    .container-right {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }
  </style>
  <h3>Skeleton with width and height specified</h3>
  <md-skeleton width="100px" height="50px"></md-skeleton>
  <h3>Skeleton fills container</h3>
  <div style="width: 100%; max-width: 400px; height: 50px; border: 1px solid black; padding: 2px;">
    <md-skeleton></md-skeleton>
  </div>
  <h3>Circular Skeleton</h3>
  <md-skeleton width="50px" height="50px" variant="circle"></md-skeleton>
  <h3>Rectangular Skeleton</h3>
  <md-skeleton width="100px" height="50px" variant="rectangular"></md-skeleton>
  <h3>No Animation</h3>
  <md-skeleton width="100px" height="50px" animation="none"></md-skeleton>
  <h3>Example</h3>
  <div class="skeleton-container">
    <md-skeleton width="50px" height="50px" variant="circle"></md-skeleton>
    <div class="container-right">
      <md-skeleton width="200px" height="20px" variant="rounded"></md-skeleton>
      <md-skeleton width="150px" height="20px" variant="rounded"></md-skeleton>
    </div>
  </div>
`;
