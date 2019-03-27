import React from 'react';
import { EditableTextfield } from '@collab-ui/react';
export default class EditableTextFieldDefault extends React.Component {
  render() {
    return (
      <EditableTextfield
        handleDoneEditing={(e, data) => alert(data)}
        inputText="Hello World"
      />
    );
  }
}
