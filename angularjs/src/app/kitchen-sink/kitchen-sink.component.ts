class KitchenSinkController {
  public messages = {
    minlength: 'This is where the error message would be.',
  };
  public inputsModel = {
    success: 'Success Text',
    error: 'Error Text',
    warning: 'Warning Text',
    readOnly: 'With Value',
    disabledWithValue: 'With Value',
    disabledro: 'Disabled ReadOnly Input',
    clearInput: 'Press or click the icon to clear the input'
  };
  public warning = () => false;
}

export class KitchenSink implements angular.IComponentOptions {
  public static selector = 'kitchenSink';
  public static bindings = {};
  public static controller = KitchenSinkController;
  public static template = `
  <div class="docs-container--with-side-nav">
  <div class="md-sidebar__wrapper docs-container__side-nav">
    <div class="md-sidebar md-sidebar--nested">
      <div class="md-sidebar__body">
        <div class="md-sidebar-nav">
          <div
            class="md-list md-list--vertical md-sidebar-nav__group md-sidebar-nav__group--primary"
            role="list">
            <a class="md-list-item" role="listitem" ui-sref="playground">
              <div class="md-list-item__center">Playground</div>
            </a>
            <div class="md-list-item" role="listitem">
              <div class="md-list-item__center">Kitchen Sink</div>
              <div class="md-list-item__right">
                <i class="md-icon icon icon-arrow-down_12"></i>
              </div>
            </div>
            <div class="md-sidebar-nav__group md-sidebar-nav__group--secondary md-sidebar-nav__group--expanded">
              <a class="md-list-item md-list-item--primary" role="listitem" ui-sref="kitchen-sink.input">
                <div class="md-list-item__center">input</div>
              </a>
              <a class="md-list-item md-list-item--primary" role="listitem" ui-sref="kitchen-sink.checkbox">
                <div class="md-list-item__center">checkbox</div>
              </a>
              <a class="md-list-item md-list-item--primary" role="listitem" ui-sref="kitchen-sink.radio">
                <div class="md-list-item__center">radio</div>
              </a>
              <a class="md-list-item md-list-item--primary" role="listitem" ui-sref="kitchen-sink.toggle-switch">
                <div class="md-list-item__center">toggle-switch</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <div class="docs-container__content" ui-view></ui-view>
  </div>
  `;
}
