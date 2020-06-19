import React from 'react';
import { List, ListItem, ListItemSection, Button, Popover } from '@momentum-ui/react';

export default class TabbableChildren extends React.PureComponent {

  render() {
    return (
        <div className="medium-6 columns">
            <List id="tabbable-children-list">
              <ListItem 
                link="javascript:void(0)"
                focusLockTabbableChildren 
                focusLockTabbableChildrenProps={{
                  tabbableChildrenQuery: '#popover-btn,#btn',
                  tabbableChildrenHasPopover: true,
                  portalNodeQuery: '#tabbable-children-list',
                  tabbableChildSpawnedPopoverQuery: '#list-item-popover'
                }}
              >
                  <ListItemSection position="left">
                      <Popover
                        id="list-item-popover"
                        content={
                          <div style={{display: 'block', padding: '7px 7px 0px 7px'}}>
                            {[1,2,3].map((id) => 
                              (<div style={{paddingBottom: '7px'}} key={`btn${id}`}>
                                <Button id={`btn${id}`}>{`TabbableChild${id}`}</Button>
                              </div>)
                            )}
                          </div>}
                        includeFocusOnHover={false}
                        >
                          <Button tabIndex="-1" id="popover-btn" circle>A</Button>
                      </Popover>
                      </ListItemSection>
                  <ListItemSection position="center">Center</ListItemSection>
                  <ListItemSection position="right">
                    <Button tabIndex="-1" id="btn">Button</Button>
                  </ListItemSection>
              </ListItem>
            </List>
        </div>
    );
  }
}
