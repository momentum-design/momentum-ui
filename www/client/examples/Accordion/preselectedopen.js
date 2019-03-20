import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionHeader,
  AccordionMenu,
  ListItem,
} from '@collab-ui/react';
export default class AccordionPreSelectedOpen extends React.Component {
  render() {
    return (
      <Accordion multipleVisible initialActive={[0]}>
        <AccordionGroup>
          <AccordionHeader>
            <div>Accordion 1</div>
          </AccordionHeader>
          <AccordionContent>
            <ListItem label="Content 1" />
          </AccordionContent>
        </AccordionGroup>
        <AccordionGroup>
          <AccordionHeader>
            <div>Accordion 2</div>
          </AccordionHeader>
          <AccordionContent>
            <ListItem label="Content 2" />
          </AccordionContent>
        </AccordionGroup>
      </Accordion>
    );
  }
}