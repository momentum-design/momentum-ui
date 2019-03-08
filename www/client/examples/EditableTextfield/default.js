import React from 'react';
import { EditableTextfield } from '@collab-ui/react';
export default class EditableTextFieldDefault extends React.Component {
  valueChange = (value) => {
    newValue = value;
  }
  render() {
    return (
      <EditableTextfield
        handleDoneEditing={(e, data) => console.log(e, data)}
        inputText='Hello World'
      />
    );
  }
}