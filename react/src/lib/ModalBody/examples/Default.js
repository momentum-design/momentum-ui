import React from 'react';
import { Input, ModalBody } from '@momentum-ui/react';

export default function ModalBodyDefault() {
  return (
    <div className="row">
      <br />
      <ModalBody>
        <Input
          htmlId="testMe2"
          value="testMe2"
          name="testMe2"
          label="First Input"
          disabled
          placeholder="Disabled Input"
          onChange={() => {}}
          inputHelpText="Field Must be Disabled"
          errorArr={[]}
        />
      </ModalBody>
    </div>
  );
}
