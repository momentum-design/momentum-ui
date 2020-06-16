import React from 'react';
 import {
  Button,
  Popover
} from '@momentum-ui/react';

 export default function PopOverHoverAccessible() {
    const content = (
    <div style={{display: 'block'}}>
        {[1,2,3].map((id) => {
            return (<div style={{margin: '7px'}} key={id}>
                <Button id={`#btn${id}`} tabIndex="0">{`B${id}`}</Button>
            </div>);
        })}
    </div>
  );

  return (
    <div className="docs-example docs-example--spacing">
      <Popover
        content={content}
        includeFocusOnHover={false}
        autoFocusOnFirstElt
      >
        <Button id='accessible-hover-popover1'>Accessible Hover Popover (without closeOnFocusLeavesContent)</Button>
      </Popover>
      <Popover
        content={content}
        includeFocusOnHover={false}
        autoFocusOnFirstElt
        closeOnFocusLeavesContent
      >
        <Button id='accessible-hover-popover2'>Accessible Hover Popover (with closeOnFocusLeavesContent)</Button>
      </Popover>
    </div>
  );
}
