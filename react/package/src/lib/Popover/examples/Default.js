import React from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  ListItemSection,
  Popover,
} from '@momentum-ui/react';
 export default function ContentDefault() {
    const content = (
      <List>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="edit_20" />
          </ListItemSection>
          <ListItemSection position="center">
            Edit space settings
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="favorite_20" />
          </ListItemSection>
          <ListItemSection position="center">Add to favorites</ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="alert_20" />
          </ListItemSection>
          <ListItemSection position="center">Notifications</ListItemSection>
        </ListItem>
      </List>
    );

    const contentMouseEnter = (
      <span key="1" style={{ padding: '10px'}}>Mouse Enter</span>
    );

    const contentFocus = (
      <span key="1" style={{ padding: '10px'}}>Focus</span>
    );

  return (
    <div className="row">
      <div className="docs-example docs-example--spacing">
        <Popover
          content={content}
          popoverTrigger={'Click'}
        >
          <Button id='default-1' children="Click" ariaLabel="Click" />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
        <Popover
          content={contentMouseEnter}
          popoverTrigger={'MouseEnter'}
        >
          <Button id='default-2' children="MouseEnter" ariaLabel="MouseEnter" />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
        <Popover
          content={contentFocus}
          popoverTrigger={'Focus'}
        >
          <Button id='default-3' children="Focus" ariaLabel="Focus" />
        </Popover>
      </div>
    </div>
  );
}
