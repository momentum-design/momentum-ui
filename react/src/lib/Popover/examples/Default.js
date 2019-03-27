import React from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  ListItemSection,
  Popover,
} from '@collab-ui/react';
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
        <ListItem>
          <ListItemSection position="left">
            <Icon name="accessories_20" />
          </ListItemSection>
          <ListItemSection position="center">
            Add Integrations & Bots
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="stored-info_20" />
          </ListItemSection>
          <ListItemSection position="center">View space policy</ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="archive_20" />
          </ListItemSection>
          <ListItemSection position="center">Archive space</ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="cancel_20" />
          </ListItemSection>
          <ListItemSection position="center">
            Remove space from team
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="exit-room_20" />
          </ListItemSection>
          <ListItemSection position="center">Leave space</ListItemSection>
        </ListItem>
      </List>
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
          <Button children="Click" ariaLabel="Click" />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
        <Popover
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <Button children="MouseEnter" ariaLabel="MouseEnter" />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
        <Popover
          content={contentFocus}
          popoverTrigger={'Focus'}
        >
          <Button children="Focus" ariaLabel="Focus" />
        </Popover>
      </div>
    </div>
  );
}