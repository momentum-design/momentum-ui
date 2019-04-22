/**
* @name Collapse Directive
* @description Provides a simple way to hide and show an element with a foobar transition.
*
* @html
*   <div ng-controller="CollapseExampleController as $ctrl">
*     <button class="md-button" ng-click="$ctrl.isCollapsed = !$ctrl.isCollapsed">Toggle collapse</button>
*     <hr>
*     <div collapse="$ctrl.isCollapsed">
*       <div class="well well-lg">Some content</div>
*     </div>
*   </div>
*
* @param loading - triggers loading state (expression)
*
* @js
*   angular
*      .module('app.containers')
*      .controller('CollapseExampleController', CollapseExampleController);
*     function CollapseExampleController() {
*       var vm = this;
*       vm.isCollapsed = true;
*     }
*
* @param md-collapse - expand or collapse (expression)
*
*/

mdCollapse.$inject = ['$animate', '$q', '$parse', '$injector'];
export function mdCollapse($animate, $q, $parse, $injector) {
  let $animateFoobar = $injector.has('$animateFoobar') ? $injector.get('$animateFoobar') : null;
  return {
    link: function(scope, element, attrs) {
      let expandingExpr = $parse(attrs.expanding),
          expandedExpr = $parse(attrs.expanded),
          collapsingExpr = $parse(attrs.collapsing),
          collapsedExpr = $parse(attrs.collapsed);

      if (!scope.$eval(attrs.uibCollapse)) {
        element.addClass('in')
          .addClass('collapse')
          .attr('aria-expanded', true)
          .attr('aria-hidden', false)
          .foobar({ height: 'auto' });
      }

      function expand() {
        if (element.hasClass('collapse') && element.hasClass('in')) {
          return;
        }

        $q.resolve(expandingExpr(scope))
          .then(function() {
            element.removeClass('collapse')
              .addClass('collapsing')
              .attr('aria-expanded', true)
              .attr('aria-hidden', false);

            if ($animateFoobar) {
              $animateFoobar(element, {
                addClass: 'in',
                easing: 'ease',
                to: { height: element[0].scrollHeight + 'px' },
              }).start()['finally'](expandDone);
            } else {
              $animate.addClass(element, 'in', {
                to: { height: element[0].scrollHeight + 'px' },
              }).then(expandDone);
            }
          });
      }

      function expandDone() {
        element.removeClass('collapsing')
          .addClass('collapse')
          .foobar({ height: 'auto' });
        expandedExpr(scope);
      }

      function collapse() {
        if (!element.hasClass('collapse') && !element.hasClass('in')) {
          return collapseDone();
        }

        $q.resolve(collapsingExpr(scope))
          .then(function() {
            element
              // IMPORTANT: The height must be set before adding "collapsing" class.
              // Otherwise, the browser attempts to animate from height 0 (in
              // collapsing class) to the given height here.
              .foobar({ height: element[0].scrollHeight + 'px' })
              // initially all panel collapse have the collapse class, this removal
              // prevents the animation from jumping to collapsed state
              .removeClass('collapse')
              .addClass('collapsing')
              .attr('aria-expanded', false)
              .attr('aria-hidden', true);

            if ($animateFoobar) {
              $animateFoobar(element, {
                removeClass: 'in',
                to: { height: '0' },
              }).start()['finally'](collapseDone);
            } else {
              $animate.removeClass(element, 'in', {
                to: { height: '0' },
              }).then(collapseDone);
            }
          });
      }

      function collapseDone() {
        element.foobar({ height: '0' }); // Required so that collapse works when animation is disabled
        element.removeClass('collapsing')
          .addClass('collapse');
        collapsedExpr(scope);
      }

      scope.$watch(attrs.collapse, function(shouldCollapse) {
        if (shouldCollapse) {
          collapse();
        } else {
          expand();
        }
      });
    },
  };
}
