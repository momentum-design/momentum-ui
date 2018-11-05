
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="cui--client">
 <div class="input-states cui-input--filled">
<div class="input-states medium-3 columns">
  <div class="cui-input--filled">
    <h3>Filled</h3>
    <h5><code>.cui-input--filled<br> <br> <br></code></h5>
    <div class="default-state">
      <div class="cui-input-group">
        <label class="cui-label" for="default">Normal</label>
        <input class="cui-input" id="default" name="default" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="normal-state">
      <div class="cui-input-group">
        <label class="cui-label" for="normal">Normal with text</label>
        <input class="cui-input" id="normal" name="normal" type="text" value="Normal Text">
      </div>
    </div>
    <div class="hover-state">
      <div class="cui-input-group">
        <label class="cui-label" for="hover">Hover</label>
        <input class="cui-input hover" id="hover" name="hover" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="focus-state">
      <div class="cui-input-group">
        <label class="cui-label" for="focus">Focus</label>
        <input class="cui-input focus" id="focus" name="focus" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="error-state">
      <div class="cui-input-group error">
        <label class="cui-label" for="error">Error</label>
        <input class="cui-input" id="error" name="error" type="text" value="Error Text">
        <div class="cui-input__messages">
          <div class="message">This is where the error message would be.</div>
        </div>
      </div>
    </div>
    <div class="warning-state">
      <div class="cui-input-group warning">
        <label class="cui-label" for="warning">Warning</label>
        <input class="cui-input" id="warning" name="warning" type="text" value="Warning Text">
        <div class="cui-input__messages">
          <div class="message">This is where the warning message would be.</div>
        </div>
      </div>
    </div>
    <div class="success-state">
      <div class="cui-input-group success">
        <label class="cui-label" for="success">Success</label>
        <input class="cui-input" id="success" name="success" type="text" value="Success Text">
        <div class="cui-input__messages">
          <div class="message">This is where the success message would be.</div>
        </div>
      </div>
    </div>
    <div class="disabled-state">
      <div class="cui-input-group disabled">
        <label class="cui-label" for="disabled">Disabled</label>
        <input class="cui-input" id="disabled" name="disabled" type="text" value="Disabled Text" disabled>
      </div>
    </div>
    <div class="read-only-state">
      <div class="cui-input-group read-only">
        <label class="cui-label" for="read-only">Read Only</label>
        <input class="cui-input" id="read-only" name="read-only" type="text" value="Read Only Text" readonly>
      </div>
    </div>
    <div class="help-text-state">
      <div class="cui-input-group">
        <label class="cui-label" for="help-text">Help Text (Description)</label>
        <input class="cui-input" id="help-text" name="help-text" type="text" placeholder="Placeholder Text">
        <p class="cui-input__help-text">This is help text or description for the normal input.</p>
      </div>
    </div>
    <div class="secondary-label-state">
      <div class="cui-input-group">
        <label class="cui-label" for="secondary-label">Secondary Label</label>
        <div class="cui-label__secondary-label-container">
          <input class="cui-input" id=" secondary-label" name="secondary-label" type="text" placeholder="Placeholder Text">
          <label class="cui-label__secondary-label" for="secondary-label">
            <span>Label</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="medium-1 columns"></div>
<div class="input-states medium-3 columns cui--client" style="background-color: #333333;">
  <div class="cui--dark">
    <h3 style="color: white;">Dark</h3>
    <h5><code style="color: white; line-break">.cui-input--filled<br> .cui--dark<br> <br> </code></h5>
    <div class="default-state">
      <div class="cui-input-group">
        <label class="cui-label" for="default">Normal</label>
        <input class="cui-input" id="default" name="default" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="normal-state">
      <div class="cui-input-group">
        <label class="cui-label" for="normal">Normal with text</label>
        <input class="cui-input" id="normal" name="normal" type="text" value="Normal Text">
      </div>
    </div>
    <div class="hover-state">
      <div class="cui-input-group">
        <label class="cui-label" for="hover">Hover</label>
        <input class="cui-input hover" id="hover" name="hover" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="focus-state">
      <div class="cui-input-group">
        <label class="cui-label" for="focus">Focus</label>
        <input class="cui-input focus" id="focus" name="focus" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="error-state">
      <div class="cui-input-group error">
        <label class="cui-label" for="error">Error</label>
        <input class="cui-input" id="error" name="error" type="text" value="Error Text">
        <div class="cui-input__messages">
          <div class="message">This is where the error message would be.</div>
        </div>
      </div>
    </div>
    <div class="warning-state">
      <div class="cui-input-group warning">
        <label class="cui-label" for="warning">Warning</label>
        <input class="cui-input" id="warning" name="warning" type="text" value="Warning Text">
        <div class="cui-input__messages">
          <div class="message">This is where the warning message would be.</div>
        </div>
      </div>
    </div>
    <div class="success-state">
      <div class="cui-input-group success">
        <label class="cui-label" for="success">Success</label>
        <input class="cui-input" id="success" name="success" type="text" value="Success Text">
        <div class="cui-input__messages">
          <div class="message">This is where the success message would be.</div>
        </div>
      </div>
    </div>
    <div class="disabled-state">
      <div class="cui-input-group disabled">
        <label class="cui-label" for="disabled">Disabled</label>
        <input class="cui-input" id="disabled" name="disabled" type="text" value="Disabled Text" disabled>
      </div>
    </div>
    <div class="read-only-state">
      <div class="cui-input-group read-only">
        <label class="cui-label" for="read-only">Read Only</label>
        <input class="cui-input" id="read-only" name="read-only" type="text" value="Read Only Text" readonly>
      </div>
    </div>
    <div class="help-text-state">
      <div class="cui-input-group">
        <label class="cui-label" for="help-text">Help Text (Description)</label>
        <input class="cui-input" id="help-text" name="help-text" type="text" placeholder="Placeholder Text">
        <p class="cui-input__help-text">This is help text or description for the normal input.</p>
      </div>
    </div>
    <div class="secondary-label-state">
      <div class="cui-input-group">
        <label class="cui-label" for="secondary-label">Secondary Label</label>
        <div class="cui-label__secondary-label-container">
          <input class="cui-input" id=" secondary-label" name="secondary-label" type="text" placeholder="Placeholder Text">
          <label class="cui-label__secondary-label" for="secondary-label">
            <span>Label</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="medium-1 columns"></div>
<div class="input-states medium-3 columns cui--contrast cui--client">
  <div class="cui-dark">
    <h3>Contrast</h3>
    <h5><code>.cui-input--filled<br> .cui--contrast <br> <br> </code></h5>
    <div class="default-state">
      <div class="cui-input-group">
        <label class="cui-label" for="default">Normal</label>
        <input class="cui-input" id="default" name="default" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="normal-state">
      <div class="cui-input-group">
        <label class="cui-label" for="normal">Normal with text</label>
        <input class="cui-input" id="normal" name="normal" type="text" value="Normal Text">
      </div>
    </div>
    <div class="hover-state">
      <div class="cui-input-group">
        <label class="cui-label" for="hover">Hover</label>
        <input class="cui-input hover" id="hover" name="hover" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="focus-state">
      <div class="cui-input-group">
        <label class="cui-label" for="focus">Focus</label>
        <input class="cui-input focus" id="focus" name="focus" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="error-state">
      <div class="cui-input-group error">
        <label class="cui-label" for="error">Error</label>
        <input class="cui-input" id="error" name="error" type="text" value="Error Text">
        <div class="cui-input__messages">
          <div class="message">This is where the error message would be.</div>
        </div>
      </div>
    </div>
    <div class="warning-state">
      <div class="cui-input-group warning">
        <label class="cui-label" for="warning">Warning</label>
        <input class="cui-input" id="warning" name="warning" type="text" value="Warning Text">
        <div class="cui-input__messages">
          <div class="message">This is where the warning message would be.</div>
        </div>
      </div>
    </div>
    <div class="success-state">
      <div class="cui-input-group success">
        <label class="cui-label" for="success">Success</label>
        <input class="cui-input" id="success" name="success" type="text" value="Success Text">
        <div class="cui-input__messages">
          <div class="message">This is where the success message would be.</div>
        </div>
      </div>
    </div>
    <div class="disabled-state">
      <div class="cui-input-group disabled">
        <label class="cui-label" for="disabled">Disabled</label>
        <input class="cui-input" id="disabled" name="disabled" type="text" value="Disabled Text" disabled>
      </div>
    </div>
    <div class="read-only-state">
      <div class="cui-input-group read-only">
        <label class="cui-label" for="read-only">Read Only</label>
        <input class="cui-input" id="read-only" name="read-only" type="text" value="Read Only Text" readonly>
      </div>
    </div>
    <div class="help-text-state">
      <div class="cui-input-group">
        <label class="cui-label" for="help-text">Help Text (Description)</label>
        <input class="cui-input" id="help-text" name="help-text" type="text" placeholder="Placeholder Text">
        <p class="cui-input__help-text">This is help text or description for the normal input.</p>
      </div>
    </div>
    <div class="secondary-label-state">
      <div class="cui-input-group">
        <label class="cui-label" for="secondary-label">Secondary Label</label>
        <div class="cui-label__secondary-label-container">
          <input class="cui-input" id=" secondary-label" name="secondary-label" type="text" placeholder="Placeholder Text">
          <label class="cui-label__secondary-label" for="secondary-label">
            <span>Label</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="input-states medium-3 columns cui--contrast cui--client" style="background-color: #333333;">
  <div class="cui--dark">
    <h3 style="color: white;">Dark Contrast</h3>
    <h5><code style="color: white; line-break">.cui-input--filled<br> .cui--contrast<br> .cui--dark</code></h5>
    <div class="default-state">
      <div class="cui-input-group">
        <label class="cui-label" for="default">Normal</label>
        <input class="cui-input" id="default" name="default" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="normal-state">
      <div class="cui-input-group">
        <label class="cui-label" for="normal">Normal with text</label>
        <input class="cui-input" id="normal" name="normal" type="text" value="Normal Text">
      </div>
    </div>
    <div class="hover-state">
      <div class="cui-input-group">
        <label class="cui-label" for="hover">Hover</label>
        <input class="cui-input hover" id="hover" name="hover" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="focus-state">
      <div class="cui-input-group">
        <label class="cui-label" for="focus">Focus</label>
        <input class="cui-input focus" id="focus" name="focus" type="text" placeholder="Placeholder Text">
      </div>
    </div>
    <div class="error-state">
      <div class="cui-input-group error">
        <label class="cui-label" for="error">Error</label>
        <input class="cui-input" id="error" name="error" type="text" value="Error Text">
        <div class="cui-input__messages">
          <div class="message">This is where the error message would be.</div>
        </div>
      </div>
    </div>
    <div class="warning-state">
      <div class="cui-input-group warning">
        <label class="cui-label" for="warning">Warning</label>
        <input class="cui-input" id="warning" name="warning" type="text" value="Warning Text">
        <div class="cui-input__messages">
          <div class="message">This is where the warning message would be.</div>
        </div>
      </div>
    </div>
    <div class="success-state">
      <div class="cui-input-group success">
        <label class="cui-label" for="success">Success</label>
        <input class="cui-input" id="success" name="success" type="text" value="Success Text">
        <div class="cui-input__messages">
          <div class="message">This is where the success message would be.</div>
        </div>
      </div>
    </div>
    <div class="disabled-state">
      <div class="cui-input-group disabled">
        <label class="cui-label" for="disabled">Disabled</label>
        <input class="cui-input" id="disabled" name="disabled" type="text" value="Disabled Text" disabled>
      </div>
    </div>
    <div class="read-only-state">
      <div class="cui-input-group read-only">
        <label class="cui-label" for="read-only">Read Only</label>
        <input class="cui-input" id="read-only" name="read-only" type="text" value="Read Only Text" readonly>
      </div>
    </div>
    <div class="help-text-state">
      <div class="cui-input-group">
        <label class="cui-label" for="help-text">Help Text (Description)</label>
        <input class="cui-input" id="help-text" name="help-text" type="text" placeholder="Placeholder Text">
        <p class="cui-input__help-text">This is help text or description for the normal input.</p>
      </div>
    </div>
    <div class="secondary-label-state">
      <div class="cui-input-group">
        <label class="cui-label" for="secondary-label">Secondary Label</label>
        <div class="cui-label__secondary-label-container">
          <input class="cui-input" id=" secondary-label" name="secondary-label" type="text" placeholder="Placeholder Text">
          <label class="cui-label__secondary-label" for="secondary-label">
            <span>Label</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
 </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          