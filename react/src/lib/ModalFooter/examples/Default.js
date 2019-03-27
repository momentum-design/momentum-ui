import React from 'react';
import { Button, ModalFooter } from '@collab-ui/react';

export default function ModalFooterDefault() {
  return (
    <div className="row">
      <br />
      <ModalFooter>
        <Button
          children="Cancel"
          onClick={() => {}}
          ariaLabel="Close Modal"
          color="default"
        />
        <Button
          children="OK"
          onClick={() => {}}
          ariaLabel="Submit Form"
          color="primary"
        />
      </ModalFooter>
    </div>
  );
}
