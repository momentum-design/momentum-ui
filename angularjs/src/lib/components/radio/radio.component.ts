/**
* @category controls
* @component radio
*/
export function mdRadio() {
  let directive = {
    scope: {
      name: '@',
      value: '=',
      label: '=',
      radioModel: '=ngModel',
      id: '=',
      isDisabled: '=isdisabled',
      horizontal: '=',
    },
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: `
      <div class="md-input-group md-radio" ng-class="{horizontal: horizontal}">
        <input class="md-input md-radio__input" type="radio" ng-model="radioModel" ng-value="value" name="{{name}}" id="{{id}}" ng-disabled="{{isDisabled}}">
        <label class="md-radio__label" ng-class="{horizontal: horizontal}" for="{{id}}">
          <span>{{label}}</span>
        </label>
      </div>
    `,
    // replace: true,
  };

  return directive;
}
/*
* @name Radios
* @description
* @category controls
* @component radios
* @section basic
*
* @param md-input-label
* @param ng-model
*
* @html
<div ng-controller="RadioDirectiveExampleController as individualRadio">
  <form name="myRadioForm">
    <div class="md-input-group md-input-radio">
      <input
        md-input
        type="radio"
        ng-model="individualRadio.model"
        id="individualRadio1"
        name="individualRadio"
        value="1"
        md-input-label="Radio Example 1">
      <input
        md-input
        type="radio"
        ng-model="individualRadio.model"
        id="individualRadio2"
        name="individualRadio"
        value="2"
        md-input-label="Radio Example 2">
      <input
        md-input
        type="radio"
        ng-model="individualRadio.model"
        id="individualRadio3"
        name="individualRadio"
        value="3"
        md-input-label="Radio Example 3"
        md-input-help-text="This is help text for the md-input radio">
      <input
        md-input
        type="radio"
        ng-model="individualRadio.model"
        id="individualRadio4"
        name="individualRadio"
        value="4"
        md-input-label="Radio Example 4"
        md-input-help-text="This is help text for the md-input radio">
    </div>
  </form>
  <md-card class="large">
    <article>
      <section>
        <p>Directive Radio Example has the following value:&nbsp;<span class="badge">{{individualRadio.model}}</span></p>
      </section>
    </article>
  </md-card>
</div>
*
* @js
*(function () {
*  'use strict';
*
*  angular
*    .module('app.forms')
*    .controller('RadioDirectiveExampleController', RadioDirectiveExampleController);
*
*  function RadioDirectiveExampleController() {
*    var vm = this;
*    vm.model = 1;
*  }
*
*})();
*/

/*
* @name Nested Radios
* @description
* @category controls
* @component radios
* @section nested-radios
*
* @param md-input-label
* @param ng-model
*
* @html
<div>
  <form name="nestedRadioForm">
    <input
      type="radio"
      md-input
      ng-model="model.value0"
      id="Radio-parent"
      name="RadioNested"
      md-input-label="Parent Radio Example">
    <input
      type="radio"
      md-input
      ng-model="model.value2"
      id="RadioNested1"
      name="RadioNested"
      md-input-label="Child Radio Nested 1 Level"
      md-input-nested="1">
    <input
      type="radio"
      md-input
      ng-model="model.value3"
      id="RadioNested2"
      name="RadioNested"
      md-input-label="Child Radio Nested 2 Levels"
      md-input-nested="2">
    <input
      type="radio"
      md-input
      ng-model="model.value4"
      id="RadioNested3"
      name="RadioNested"
      md-input-label="Child Radio Nested 3 Levels"
      md-input-nested="3">
  </form>
</div>
*/

