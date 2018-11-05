import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionHeader,
  AccordionMenu,
  ListItem,
} from '@collab-ui/react';
export default class Default extends React.Component {
  render() {
    return (
      <div>
        <div className='row'>
          <h3>Single Open</h3>
          <Accordion>
            <AccordionGroup>
              <AccordionHeader>
                <div>Accordion 1</div>
              </AccordionHeader>
              <AccordionContent>
                <ListItem label='Content 1' />
              </AccordionContent>
            </AccordionGroup>
            <AccordionGroup>
              <AccordionHeader>
                <div>Accordion 2</div>
              </AccordionHeader>
              <AccordionContent>
                <ListItem label='Content 2' />
              </AccordionContent>
            </AccordionGroup>
          </Accordion>
          </div>
          <br></br>
          <div className='row'>
            <h3>Multiple Open</h3>
            <Accordion multipleVisible>
              <AccordionGroup>
                <AccordionHeader>
                  <div>Accordion 1</div>
                </AccordionHeader>
                <AccordionContent>
                  <ListItem label='Content 1' />
                </AccordionContent>
              </AccordionGroup>
              <AccordionGroup>
                <AccordionHeader>
                  <div>Accordion 2</div>
                </AccordionHeader>
                <AccordionContent>
                  <ListItem label='Content 2' />
                </AccordionContent>
              </AccordionGroup>
            </Accordion>
          </div>
          <br></br>
          <div className='row'>
            <h3>PreSelected Open</h3>
            <Accordion multipleVisible initialActive={[0]}>
              <AccordionGroup>
                <AccordionHeader>
                  <div>Accordion 1</div>
                </AccordionHeader>
                <AccordionContent>
                  <ListItem label='Content 1' />
                </AccordionContent>
              </AccordionGroup>
              <AccordionGroup>
                <AccordionHeader>
                  <div>Accordion 2</div>
                </AccordionHeader>
                <AccordionContent>
                  <ListItem label='Content 2' />
                </AccordionContent>
              </AccordionGroup>
            </Accordion>
          </div>
        </div>
    );
  }
}