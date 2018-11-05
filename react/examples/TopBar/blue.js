
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `<header class="cui-top-bar cui-top-bar--blue" role="navigation">
  <div class="cui-top-bar__container row">
    <div class="cui-top-bar__brand">
      <a class="cui-brand" href="/">
        <div class="cui-brand__logo">
          <!-- Note: use either image or icon, but not both -->
          <!-- img src="/assets/spark-logo.svg" alt="Collab UI" -->
          <i class="icon icon-cisco-logo"></i>
        </div>
        <div class="cui-brand__title">Collab UI</div>
      </a>
    </div>
    <nav class="cui-top-bar__nav ">
      <div class="cui-list cui-list--horizontal" role="list">
        <a class="cui-list-item active" role="listItem" href="javascript:void(0)">Develop</a>
        <a class="cui-list-item" role="listItem" href="javascript:void(0)">Styles</a>
        <a class="cui-list-item" role="listItem" href="javascript:void(0)">Layout</a>
        <a class="cui-list-item" role="listItem" href="javascript:void(0)">Navigation</a>
      </div>
    </nav>
    <div class="cui-top-bar__right ">
      <!-- Note: conditionally show top-bar__user or top-bar__logged-out -->
       <div class="cui-top-bar__user">
         <button class="cui-avatar cui-button cui-button--circle cui-button--link">
            CU
         </button>
       </div>
    </div>
  </div>
</header>`}} />

              /* eslint-enable */
              }
            }
          