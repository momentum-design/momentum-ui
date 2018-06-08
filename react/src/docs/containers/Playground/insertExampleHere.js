import React from 'react';
import ErrorBoundary from '@collab-ui/react/ErrorBoundary';
import ErrorContainer from '../ErrorContainer';

// Import Method Show Below
import { Button, Coachmark, SpaceListItem, Avatar } from '@collab-ui/react';

export default class PlaygroundComponent extends React.Component {
  state = {
    openFirst: false,
    openNext: false,
    openLast: false
  }
  render() {
    const {openFirst, openNext, openLast} = this.state;
    return (
      <ErrorBoundary fallbackComponent={<ErrorContainer />}>
        <div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
          <SpaceListItem header='isMuted' isMuted childrenLeft={<Avatar title="Tom Smith" type="bot"/>}/>
          <Coachmark isOpen={openFirst} maxWidth={272} onClick={() => this.setState({openFirst: false, openNext: true})} buttonLabel={'Got It'} header={`Someone's @mentioned you`} subheader={`See who's trying to get your attention in your @mentions filter`} direction='bottom-center'>
            <Button ariaLabel='test' onClick={() => this.setState({openFirst: true})}>Test</Button>
          </Coachmark>
          <Coachmark isOpen={openNext} onClick={() => this.setState({openLast: true, openNext: false})} buttonLabel={'Got It'} header={`Someone's @mentioned you`} subheader={`See who's trying to get your attention in your @mentions filter`} direction='bottom-center'>
            <Button ariaLabel='test'>Test</Button>
           </Coachmark>
           <Coachmark isOpen={openLast} contentNode={<div>Test</div>} direction='bottom-center'>
           <Button ariaLabel='test'>Test</Button>
          </Coachmark>
          </div>
          </ErrorBoundary>
        );
      }
    }
    // 
// Sample Class Method Show Below
// export default class PlaygroundComponent extends React.Component {
//   render() {
//     return (
//       <Button label="Playground Button"/>
//     );
//   }
// }
