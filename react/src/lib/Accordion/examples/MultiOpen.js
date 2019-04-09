import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionHeader,
  ListItem,
} from '@collab-ui/react';
export default class AccordionMultiOpen extends React.Component {
  render() {
    return (
      <Accordion multipleVisible>
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
