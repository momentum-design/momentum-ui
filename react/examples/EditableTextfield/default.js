import React from 'react';
import { EditableTextfield } from '@collab-ui/react';
export default class PlaygroundComponent extends React.Component {
  valueChange = (value) => {
    newValue = value;
  }
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">inputText=(Hello World)</code></p>
            <p><code className="small">{'handleDoneEditing=({(value) => console.log(value)})'}</code></p>
          </h3>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <EditableTextfield
              handleDoneEditing={(e, data) => console.log(e, data)}
              inputText='Hello World'
            />
          </div>
        </div>
        <div className="cui--dark docs-example docs-example--spacing docs-example--dark">
          <h3>
            Props
            <p><code className="small">inputText=(Hello Dark World)</code></p>
            <p><code className="small">alignment=('center')</code></p>
          </h3>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <EditableTextfield alignment='center' inputText='Hello Dark World'/>
          </div>
        </div>
    </div>
    );
  }
}