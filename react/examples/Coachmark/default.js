import React from 'react';
import { 
  Avatar,
  Button,
  Coachmark,
  SpaceListItem,
} from '@collab-ui/react';
 export default class Default extends React.Component {
  state = {
    openFirst: true,
    openNext: false,
    openLast: false
  }
  render() {
    const {openFirst, openNext, openLast} = this.state;
    return (
      <div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
        <Coachmark 
          isOpen={openFirst}
          maxWidth={272}
          onClick={() => this.setState({openFirst: false, openNext: true})}
          buttonChildren={'Got It'}
          header={`Header prop(node)`}
          subheader={`Subheader prop(node)`}
          direction='bottom-center'
          ariaLabel='Open Coachmark 1'
        >
          <Button ariaLabel='test' onClick={() => this.setState({openFirst: true, openNext: false, openLast: false})}>Coachmark Anchor</Button>
        </Coachmark>
        <Coachmark
          isOpen={openNext}
          onClick={() => this.setState({openLast: true, openNext: false})}
          buttonChildren={'Click for next Coachmark'}
          header={`Header prop(node)`}
          direction='top-center'
          ariaLabel='Open Coachmark 2'
        >
          <Button ariaLabel='test' onClick={() => this.setState({openFirst: false, openNext: true, openLast: false})}>2nd Coachmark Anchor</Button>
        </Coachmark>
        <Coachmark isOpen={openLast}
          contentNode={<div>contentNode prop(node)</div>}
          direction='bottom-center'
          ariaLabel='Open Coachmark 3'
        >
          <Button ariaLabel='test' onClick={() => this.setState({openFirst: false, openNext: false, openLast: true})}>3rd Coachmark Anchor</Button>
        </Coachmark>
      </div>
    );
  }
}