import React from 'react';
import { ActivityButton } from '@collab-ui/react';
export default function ActivityButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div style={{margin: `16px`}}>
        <ActivityButton
          type='chat'
          ariaLabel='jlshjksfghjl'
          onClick={()=>{}}
          label='Chat'
        />
        <ActivityButton
          type='camera'
          onClick={()=>{}}
          label='Camera'
        />
        <ActivityButton
          type='meetings'
          onClick={()=>{}}
          label='Meetings'
        />
        <ActivityButton
          type='whiteboard'
          onClick={()=>{}}
          label='Whiteboard'
        />
        <ActivityButton
          type='files'
          onClick={()=>{}}
          label='Files'
        />
        <ActivityButton
          type='share-screen'
          onClick={()=>{}}
          label='Share'
        />
        <ActivityButton
          type='tasks'
          onClick={()=>{}}
          label='Tasks'
        />
      </div>
    </div>
  );
}