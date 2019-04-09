import React from 'react';
import { Checkbox, InputHelper } from '@collab-ui/react';

export default function InputHelperDefault() {
  return (
    <div className="row">
      <Checkbox value="us" label="us" htmlId="inputHelper1" onChange={() => {}}>
        <InputHelper message={"I'm here to help"} />
      </Checkbox>
    </div>
  );
}
