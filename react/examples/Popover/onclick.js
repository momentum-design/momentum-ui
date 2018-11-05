import React from 'react';
 import {
  Button,
  Icon,
  List,
  ListItem,
  ListItemSection,
  Popover,
} from '@collab-ui/react';
 export default function PopOverClick() {
    const content = (
      <List>
        <ListItem>
          <ListItemSection position="left">
            <Icon name='edit_20'/>
          </ListItemSection>
          <ListItemSection position="center">
            Edit space settings
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name='favorite_20'/>
          </ListItemSection>
          <ListItemSection position="center">
            Add to favorites
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name='alert_20'/>
          </ListItemSection>
          <ListItemSection position="center">
            Notifications
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name='accessories_20'/>
          </ListItemSection>
          <ListItemSection position="center">
            Add Integrations & Bots
          </ListItemSection>
        </ListItem>
        <ListItem>
        <ListItemSection position="left">
            <Icon name='stored-info_20'/>
          </ListItemSection>
          <ListItemSection position="center">
            View space policy
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name='archive_20'/>
          </ListItemSection>
          <ListItemSection position="center">
            Archive space
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name='cancel_20'/>
          </ListItemSection>
          <ListItemSection position="center">
            Remove space from team
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name='exit-room_20'/>
          </ListItemSection>
          <ListItemSection position="center">
            Leave space
          </ListItemSection>
        </ListItem>
      </List>
    );
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            content={content}
            direction={'bottom-center'}
          >
            <Button
              children='Click'
              ariaLabel='Click'
            />
          </Popover>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
            <p><code className="small">doesAnchorToggle(false)</code></p>
          </h3>
          <Popover
            content={content}
            direction={'bottom-center'}
            doesAnchorToggle={false}
            popoverTrigger={'Click'}
          >
            <Button
              children='Click No Toggle'
              ariaLabel='Click'
            />
          </Popover>
        </div>
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">popoverTrigger=('None')</code></p>
            <p><code className="small">doesAnchorToggle(false)</code></p>
            <p><code className="small">allowClickAway(false)</code></p>
            <p><code className="small">startOpen(true)</code></p>
          </h3>
          <Popover
            content={'Always Open'}
            direction={'bottom-center'}
            doesAnchorToggle={false}
            popoverTrigger={'None'}
            startOpen
            allowClickAway={false}
          >
            <Button
              children='Always Open'
              ariaLabel='Always Open'
            />
          </Popover>
        </div>
      </div>
    );
}