/**
* @name Sticky
* @description AngularJS wrapper for the audero-sticky polyfill.
*
* @category forms
* @component forms
* @section sticky
*
* @html
*   <div csSticky>
*    <div class="section__info">
*      <h4 class="section__title">Section Title</h4>
*       <p class="section__description">Section Description. Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet eros id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante venenatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliquam sapien convallis eu. Nulla ut turpis in diam dapibus consequat.</p>
*     </div>
*   </div>
*
* @param none - not available.
*
*/

/* @ngInject */
export function csSticky() {
  return {
    restrict: 'A',
    link: function (scope, el, att, ngModel) {
      el
        .removeClass('sticky')
        .addClass('sticky');
    },
  };
}
