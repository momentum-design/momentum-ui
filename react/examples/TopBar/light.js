
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: `<header class="cui-top-bar cui-top-bar--light" role="navigation">
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
          <a href="javascript:void(0)">My Apps</a>
         <div class="cui-avatar" tabindex="0" aria-haspopup="true">
            <img class="user-image" src="https://randomuser.me/api/portraits/men/85.jpg" />
         </div>
       </div>
       <!-- div class="cui-top-bar__logged-out">
          <a href="javascript:void(0)">Log In</a>
          <button class="cui-button cui-button--blue">Button</button>
       </div -->
    </div>
    <i class="cui-top-bar__mobile-menu-button icon icon-list-menu_20"></i>
    <div class="cui-top-bar__mobile cui-tb-mobile">
      <i class="icon icon-cancel_20"></i>
        <div class="cui-top-bar__brand">
          <a class="cui-brand" href="/">
            <div class="cui-brand__logo">
              <img src="/assets/spark-logo.svg">
            </div>
            <div class="cui-brand__title">Collab UI</div>
          </a>
        </div>
      <div class="cui-list-separator"></div>
      <nav class="cui-tb-mobile__nav" role="navigation">
        <a class="cui-list-item active" role="listItem" href="javascript:void(0)">Develop</a>
        <a class="cui-list-item" role="listItem" href="javascript:void(0)">Styles</a>
        <a class="cui-list-item" role="listItem" href="javascript:void(0)">Layout</a>
        <a class="cui-list-item" role="listItem" href="javascript:void(0)">Navigation</a>
        <div class="cui-list-separator"></div>
        <a class="cui-list-item" role="listItem" href="javascript:void(0)">Sign out</a>
      </nav>
    </div>
    <div class="cui-tb-mobile__mask" role="none"></div>
  </div>
</header>`}} />

              /* eslint-enable */
              }
            }
          