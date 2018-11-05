import React from 'react';
 import {
  Tab,
  TabContent,
  TabList,
  TabPane,
  Tabs,
} from '@collab-ui/react';
 export default function() {
  return (
    <div className='row'>
      <div className='columns'>
        <Tabs>
          <TabList>
            <Tab
              heading='First Tab'
            />
            <Tab
              heading='Second Tab'
            />
            <Tab
              heading='Third Tab'
            />
          </TabList>
          <TabContent>
            <TabPane>
              Testing 1
            </TabPane>
            <TabPane>
              Testing 2
            </TabPane>
            <TabPane>
              Testing 3
            </TabPane>
          </TabContent>
        </Tabs>
      </div>
    </div>
  );
}