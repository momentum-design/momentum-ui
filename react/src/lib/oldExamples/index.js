/**
* @name Default Accordion
* @description Accordions are useful.
*
* @category layout
* @component accordion
* @section default
*
* @js
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
**/


/**
* @name Default Activity Button
* @description Default Activity Button.
*
* @category controls
* @component activity-button
* @section default
*
* @js
import { ActivityButton } from '@collab-ui/react';

export default function ActivityButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div style={{margin: `16px`}}>
        <ActivityButton
          type='chat'
          ariaLabel='jlshjksfghjl'
          onClick={()=>{}}
          label='Chat'
        />
        <ActivityButton
          type='camera'
          onClick={()=>{}}
          label='Camera'
        />
        <ActivityButton
          type='meetings'
          onClick={()=>{}}
          label='Meetings'
        />
        <ActivityButton
          type='whiteboard'
          onClick={()=>{}}
          label='Whiteboard'
        />
        <ActivityButton
          type='files'
          onClick={()=>{}}
          label='Files'
        />
        <ActivityButton
          type='share-screen'
          onClick={()=>{}}
          label='Share'
        />
        <ActivityButton
          type='tasks'
          onClick={()=>{}}
          label='Tasks'
        />
      </div>
    </div>
  );
}

**/

/**
* @name ActivityButton with large
* @description ActivityButton with large class.
*
* @category controls
* @component activity-button
* @section large
*
* @js
import { ActivityButton } from '@collab-ui/react';

export default function ActivityButtonLarge() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div style={{margin: `16px`}}>
        <ActivityButton
          type='chat'
          large
          onClick={()=>{}}
          label='Chat'
          ariaLabel='Chat'
        />
        <ActivityButton
          type='camera'
          large
          onClick={()=>{}}
          label='Camera'
          ariaLabel='Camera'
        />
        <ActivityButton
          type='meetings'
          large
          onClick={()=>{}}
          label='Meetings'
          ariaLabel='Meetings'
        />
        <ActivityButton
          type='whiteboard'
          large
          onClick={()=>{}}
          label='Whiteboard'
          ariaLabel='Whiteboard'
        />
        <ActivityButton
          type='files'
          large
          onClick={()=>{}}
          label='Files'
          ariaLabel='Files'
        />
        <ActivityButton
          type='share-screen'
          large
          onClick={()=>{}}
          label='Share'
          ariaLabel='Share'
        />
        <ActivityButton
          type='tasks'
          large
          onClick={()=>{}}
          label='Tasks'
          ariaLabel='Tasks'
          title='tasks'
        />
      </div>
    </div>
  );
}

**/

/**
* @name Alerts
* @description Create the type of Alert (info, success, warning, or error) by passing in the type prop.
*
* @category communication
* @component alert
* @section default
*
* @js

import {
  Alert,
  AlertContainer,
  Button
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    alertMessage: 'Who\'s awesome?  You are!'
  }

  render() {
    let alertContainer;
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.info(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Info/Default'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.success(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Success'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.warning(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Warning'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.error(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Error'
              color='primary'
            />
          </div>
        </div>
        <br />
        <AlertContainer
          ref={ref => alertContainer = ref}
          orderNewest={false}
        />
      </section>
    );
  }
}

**/

/**
* @name Information
* @category communication
* @component alert-banner
* @section default
* @description Create info/default AlertBanners by omitting the type prop. To make the AlertBanner closable, use the closable prop.
*
* @js
import { AlertBanner, Button } from '@collab-ui/react';

export default class AlertBannerDefault extends React.PureComponent {
  state = {
    showAlert1: true,
  }

  render() {
    return (
     <div>
       <div>
         <AlertBanner
           show={this.state.showAlert1}
           closable
           onHide={() => this.setState({showAlert1: false})}
         >
           Default Alert Banner
         </AlertBanner>
       </div>
       <div>
         <div className='row'>
           <br />
           <Button
             children='Toggle Default Alert Banner'
             onClick={() => this.setState({showAlert1: !this.state.showAlert1})}
             ariaLabel='Default Alert Banner'
             className='btn--primary btn--large'
           />
         </div>
       </div>
     </div>
    );
  }
}
**/

/**
* @name Warning
* @category communication
* @component alert-banner
* @section warning
* @description Create warning AlertBanners by setting the "type" prop to type='warning'.
*
* @js
import { AlertBanner, Button } from '@collab-ui/react';

export default class AlertBannerWarning extends React.PureComponent {
  state = {
    showAlert1: true
  }

  render() {
    return (
     <div>
       <div>
         <AlertBanner
           show={this.state.showAlert1}
           closable
           onHide={() => this.setState({showAlert1: false})}
           type='warning'
         >
           Warning Alert Banner
         </AlertBanner>
       </div>
       <div>
         <div className='row'>
           <br />
           <Button
             children='Toggle Warning Alert Banner'
             onClick={() => this.setState({showAlert1: !this.state.showAlert1})}
             ariaLabel='Warning Alert Banner'
             className='btn--primary btn--large'
           />
         </div>
       </div>
     </div>
    );
  }
}
**/

/**
/**
* @name Error
* @category communication
* @component alert-banner
* @section error
* @description Create error AlertBanners by setting the type prop to type='error'.
*
* @js
import { AlertBanner, Button } from '@collab-ui/react';

export default class AlertBannerError extends React.PureComponent {
  state = {
    showAlert1: true
  }

  render() {
    return (
     <div>
       <div>
         <AlertBanner
           show={this.state.showAlert1}
           closable
           onHide={() => this.setState({showAlert1: false})}
           type='error'
         >
           Error Alert Banner
         </AlertBanner>
       </div>
       <div>
         <div className='row'>
           <br />
           <Button
             children='Toggle Error Alert Banner'
             onClick={() => this.setState({showAlert1: !this.state.showAlert1})}
             ariaLabel='Error Alert Banner'
             className='btn--primary btn--large'
           />
         </div>
       </div>
     </div>
    );
  }
}
**/

/**
* @name Prop: onClick
*
* @category communication
* @component avatar
* @section click
*
* @js
*
import { Avatar } from '@collab-ui/react';

 export default class AvatarClick extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            <p><code className="small">{'onClick=()=>(console.log(Avatar clicked))'}</code></p>
            <p><code className="small">ariaLabel=(Click Avatar)</code></p>
          </h3>
          <Avatar
            onClick={()=>(console.log('Avatar clicked'))}
            ariaLabel='Click Avatar'
            title="Tom Smith"
          />

        </div>
      </div>
    );
  }
}
**/

/**
* @name Different sizes of avatar
*
* @category communication
* @component avatar
* @section default
*
* @js
*
import { Avatar } from '@collab-ui/react';

 export default class AvatarDefault extends React.PureComponent {
  render() {
    return (
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(18)</code></p>
          </h3>
          <Avatar size={18} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(24)</code></p>
          </h3>
          <Avatar size={24} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(28)</code></p>
          </h3>
          <Avatar size={28} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(36)</code></p>
          </h3>
          <Avatar size={36} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(40)</code></p>
          </h3>
          <Avatar size={40} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(44)</code></p>
          </h3>
          <Avatar size={44} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(52)</code></p>
          </h3>
          <Avatar size={52} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(56)</code></p>
          </h3>
          <Avatar size={56} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(72)</code></p>
          </h3>
          <Avatar size={72} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(80)</code></p>
          </h3>
          <Avatar size={80} title="Tom Smith"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(84)</code></p>
          </h3>
          <Avatar size={84} title="Tom Smith"/>
        </div>
      </div>
    );
  }
}
**/

/**
* @name Types of Avatar
*
* @category communication
* @component avatar
* @section types
*
* @js
*
import { Avatar } from '@collab-ui/react';
import AvatarImg from 'images/avatar-images/barbara.png';

 export default class AvatarTypes extends React.PureComponent {
  render() {
    return (
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(default)</code></p>
          </h3>
          <div><Avatar title="Tom Smith"/></div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="active"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
            <p><code className="small">src={AvatarImg}</code></p>
          </h3>
          <Avatar src={AvatarImg} title="Tom Smith" type="active"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(active)</code></p>
            <p><code className="small">theme=(dark)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="active" theme='dark'/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(dnd)</code></p>
          </h3>
          <div className="docs-example--baseline-flex">
            <Avatar title="Tom Smith" size={18} type="dnd"/>
            <Avatar title="Tom Smith" size={24} type="dnd"/>
            <Avatar title="Tom Smith" size={28} type="dnd"/>
            <Avatar title="Tom Smith" size={36} type="dnd"/>
            <Avatar title="Tom Smith" size={40} type="dnd"/>
            <Avatar title="Tom Smith" size={44} type="dnd"/>
            <Avatar title="Tom Smith" size={52} type="dnd"/>
            <Avatar title="Tom Smith" size={56} type="dnd"/>
            <Avatar title="Tom Smith" size={72} type="dnd"/>
            <Avatar title="Tom Smith" size={80} type="dnd"/>
            <Avatar title="Tom Smith" size={84} type="dnd"/>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(ooo)</code></p>
          </h3>
          <div className="docs-example--baseline-flex">
            <Avatar title="Tom Smith" size={18} type="ooo"/>
            <Avatar title="Tom Smith" size={24} type="ooo"/>
            <Avatar title="Tom Smith" size={28} type="ooo"/>
            <Avatar title="Tom Smith" size={36} type="ooo"/>
            <Avatar title="Tom Smith" size={40} type="ooo"/>
            <Avatar title="Tom Smith" size={44} type="ooo"/>
            <Avatar title="Tom Smith" size={52} type="ooo"/>
            <Avatar title="Tom Smith" size={56} type="ooo"/>
            <Avatar title="Tom Smith" size={72} type="ooo"/>
            <Avatar title="Tom Smith" size={80} type="ooo"/>
            <Avatar title="Tom Smith" size={84} type="ooo"/>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(group)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="group"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(bot)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="bot"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">hasNotification=(true)</code></p>
          </h3>
          <Avatar title="Tom Smith" hasNotification />
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">failureBadge=(true)</code></p>
          </h3>
          <Avatar title="Tom Smith" failureBadge />
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(self)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="self"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(typing)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="typing"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">type=(inactive)</code></p>
          </h3>
          <Avatar title="Tom Smith" type="inactive"/>
        </div>

        <div className="docs-example docs-example--spacing">
          <div style={{ display: 'flex', flexFlow: 'row-nowrap' }}>
            <Avatar title="Tom Smith"/>
            <Avatar title="Tom Smith" type="active"/>
            <Avatar title="Tom Smith"/>
            <Avatar src={AvatarImg} title="Tom Smith" type="active"/>
            <Avatar title="Tom Smith" type="active"/>
          </div>
        </div>

      </div>
    );
  }
}
**/

/**
* @name Avatar with different contents
*
* @category communication
* @component avatar
* @section contents
*
* @js
*
 import { Avatar, Icon } from '@collab-ui/react';
 import libraryIcon from '@collab-ui/core/docs/assets/react.png';

 export default class AvatarContents extends React.PureComponent {
  render() {
    return (
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">src=(libraryIcon)</code></p>
          </h3>
          <div><Avatar title="React" src={libraryIcon}/></div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">{'icon=(<Icon name="feedback_16"/>)'}</code></p>
          </h3>
          <div><Avatar title="Feedback" icon={<Icon name="feedback_16"/>}/></div>
        </div>

      </div>
    );
  }
}
**/

/**
* @name Composite avatars
*
* @category communication
* @component avatar
* @section composite
*
* @js
*
 import { Avatar, CompositeAvatar } from '@collab-ui/react';

 export default class CompositeAvatarExample extends React.PureComponent {
  render() {
    return (
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(28)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={28}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(40)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={40}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(84)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={84}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>

        <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">size=(135)</code></p>
          </h3>
          <div>
            <CompositeAvatar size={135}>
              <Avatar title="Tom Smith"/>
              <Avatar title="John William"/>
            </CompositeAvatar>
          </div>
        </div>

      </div>
    );
  }
}
**/

/**
* @name Default Badges
* @description Default state of badge.
*
* @category communication
* @component badge
* @section default
*
* @js
import { Badge } from '@collab-ui/react';

export default function Types() {
    return (
      <div className='row'>
        <div className='example-spacing'>
          <p><span className='h3'>Default</span></p>
          <div>
            <Badge>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>color='blue'</code></p>
          <div>
            <Badge color='blue'>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>color='red'</code></p>
          <div>
            <Badge color='red'>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>color='yellow'</code></p>
          <div>
            <Badge color='yellow'>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>color='green'</code></p>
          <div>
            <Badge color='green'>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>color='mint'</code></p>
          <div>
            <Badge color='mint'>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Default</span><code>color='pastel'</code></p>
          <div>
            <Badge color='pastel'>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>color='blue-pastel'</code></p>
          <div>
            <Badge color='blue-pastel'>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>color='red-pastel'</code></p>
          <div>
            <Badge color='red-pastel'>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>color='yellow-pastel'</code></p>
          <div>
            <Badge color='yellow-pastel'>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>color='green-pastel'</code></p>
          <div>
            <Badge color='green-pastel'>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>color='mint-pastel'</code></p>
          <div>
            <Badge color='mint-pastel'>
              <div>Mint</div>
            </Badge>
          </div>
        </div>
      </div>
    );
  }

**/

/**
* @name Rounded Badges
* @description Rounded state of badges
*
* @category communication
* @component badge
* @section round
*
*
* @js
import { Badge } from '@collab-ui/react';

export default function Rounded() {
    return (
      <div className='row'>
        <div className='example-spacing'>
          <p><span className='h3'>Default</span><code>rounded</code></p>
          <div>
            <Badge rounded>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>rounded color='blue'</code></p>
          <div>
            <Badge color='blue' rounded>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>rounded color='red'</code></p>
          <div>
            <Badge color='red' rounded>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>rounded color='yellow'</code></p>
          <div>
            <Badge color='yellow' rounded>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>rounded color='green'</code></p>
          <div>
            <Badge color='green' rounded>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>rounded color='mint'</code></p>
          <div>
            <Badge color='mint' rounded>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Default</span><code>rounded color='pastel'</code></p>
          <div>
            <Badge color='pastel' rounded>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>rounded color='blue-pastel'</code></p>
          <div>
            <Badge color='blue-pastel' rounded>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>rounded color='red-pastel'</code></p>
          <div>
            <Badge color='red-pastel' rounded>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>rounded color='yellow-pastel'</code></p>
          <div>
            <Badge color='yellow-pastel' rounded>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>rounded color='green-pastel'</code></p>
          <div>
            <Badge color='green-pastel' rounded>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>rounded color='mint-pastel'</code></p>
          <div>
            <Badge color='mint-pastel' rounded>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
        </div>
      </div>
    );
  }
**/

/**
* @name Default Button Group
*
* @category containers
* @component button-group
* @section default
*
* @js
*
 import { Button, ButtonGroup } from '@collab-ui/react';

 export default class DefaultButtonGroup extends React.PureComponent {

  render() {
    return(
    <div className='columns large'>
      <ButtonGroup>
        <Button ariaLabel='1'>one</Button>
        <Button ariaLabel='2' disabled>two</Button>
        <Button ariaLabel='3'>three</Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/

/**
* @name Button Groups used in SpaceList
*
* @category containers
* @component button-group
* @section dark
*
* @js
*
 import { Button, ButtonGroup } from '@collab-ui/react';

 export default class SpaceListButtonGroup extends React.PureComponent {

  render() {
    return(
    <div className='columns large' style={{background: 'black', padding: '20px'}}>
      <ButtonGroup theme="dark">
        <Button ariaLabel='Spaces'>Spaces</Button>
        <Button ariaLabel='Messages'>Messages</Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/

/**
* @name Button Groups with highlightSelected=false
*
* @category containers
* @component button-group
* @section highlightSelected
*
* @js
*
 import { Button, ButtonGroup, Icon } from '@collab-ui/react';

 export default class CalendarButtonGroup extends React.PureComponent {

  render() {
    return(
    <div className='columns small-3'>
      <ButtonGroup justified={false} highlightSelected={false}>
        <Button ariaLabel='Left'><Icon name='icon-arrow-left_12' /></Button>
        <Button ariaLabel='Today'>Today</Button>
        <Button ariaLabel='Right'><Icon name='icon-arrow-right_12' /></Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/

/**
* @name Icons within Button Group
*
* @category containers
* @component button-group
* @section icons
*
* @js
*
 import { Button, ButtonGroup, Icon } from '@collab-ui/react';

 export default class IconButtonGroup extends React.PureComponent {

  render() {
    return(
    <div>
      <div className='columns small-4'>
        <ButtonGroup>
          <Button ariaLabel='left'><Icon name='icon-arrow-left_12' /></Button>
          <Button ariaLabel='right'><Icon name='icon-arrow-right_12' /></Button>
        </ButtonGroup>
      </div>
      <div className='columns small-4'>
        <ButtonGroup type='pill'>
          <Button ariaLabel='left'><Icon name='icon-flag_16' /></Button>
          <Button ariaLabel='right'><Icon name='icon-cancel_16' /></Button>
        </ButtonGroup>
      </div>
      <div className='columns small-4'>
        <ButtonGroup type='pill' pillWidth='60px'>
          <Button ariaLabel='left'><Icon name='icon-flag_16' /></Button>
        </ButtonGroup>
      </div>
    </div>
    );
  }
}
**/

/**
* @name Button Groups with justified false
*
* @category containers
* @component button-group
* @section justified
*
* @js
*
 import { Button, ButtonGroup } from '@collab-ui/react';

 export default class NonJustifiedButtonGroup extends React.PureComponent {

  render() {
    return(
    <div className='columns large'>
      <ButtonGroup justified={false}>
        <Button ariaLabel='1'>one</Button>
        <Button ariaLabel='2' disabled>two</Button>
        <Button ariaLabel='3'>three</Button>
      </ButtonGroup>
    </div>
    );
  }
}
**/

/**
* @name Default Buttons
*
* @category controls
* @component button
* @section default
*
* @js
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}

**/

/**
* @name Button Color
* @description Create colored buttons by passing in the color prop.
*
* @category controls
* @component button
* @section color
*
* @js
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>

        <div>color=(blue)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            color='blue'
          >
            Test Me
          </Button>
        </div>
        <br />

        <div>color=(none)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            color='none'
          >
            Test Me
          </Button>
        </div>
        <br />
      </div>
    </div>
  );
}

**/

/**
* @name Button Sizes
* @description Create large buttons by passing in the <code>large</code> prop.
*
* @category controls
* @component button
* @section large
*
* @js
*
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className="example-spacing">

        <div>size=(none)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size='none'
          >
            Test Me
          </Button>
        </div>
        <br />

        <div>size=(28)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={28}
          >
            Test Me
          </Button>
        </div>
        <br />

        <div>Default size=(36)</div>
        <div>
          <Button
            ariaLabel='For the Win'
          >
            Test Me
          </Button>
        </div>
        <br />

        <div>size=(40)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={40}
          >
            Test Me
          </Button>
        </div>
        <br />


        <div>size=(52)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={52}
          >
            Test Me
          </Button>
        </div>
        <br />

      </div>
    </div>
  );
}
*/

/**
* @name Button Tags
* @description Button with Tag
*
* @category controls
* @component button
* @section tags
*
*
* @js
import { Button } from '@collab-ui/react';

export default function ButtonTags() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Tag Attribute (a)</div>
      <div className='columns small-3'>
        <Button
          children='Link'
          onClick={() => {}}
          ariaLabel='For the Win'
          tag='a'
        />
      </div>
    </div>
  );
}
**/

/**
* @name Button with Color
* @description Button with Color
*
* @category controls
* @component button
* @section colors
*
*
* @js
import { Button } from '@collab-ui/react';

export default function ButtonColors() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Color Attribute</div>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => {}}
          ariaLabel='For the Win'
          color='blue'
        />
      </div>
    </div>
  );
}
**/

/**
* @name Expanded Buttons
* @description Create block level buttons —those that span the full width of a parent— by passing in the <code>expand</code> prop.
*
* @category controls
* @component button
* @section expanded
*
*
* @js
import { Button } from '@collab-ui/react';

export default function ButtonExpanded() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => {}}
          ariaLabel='For the Win'
          expand
        />
      </div>
    </div>
  );
}
**/

/**
* @name Disabled Buttons
* @description Create large buttons by passing in the <code>disabled</code> prop.
*
* @category controls
* @component button
* @section disabled
*
*
* @js
import { Button } from '@collab-ui/react';

export default function ButtonDisabled() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
    <div className='columns small-3'>
      <Button
        children='Test Me'
        onClick={() => {}}
        ariaLabel='For the Win'
        disabled
      />
    </div>
    </div>
  );
}
**/

/**
* @name Loading Buttons
* @description Create loading buttons by passing in the <code>loading</code> prop.
*
* @category controls
* @component button
* @section loading
*
*
* @js
import { Button } from '@collab-ui/react';

export default function ButtonLoading() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => {}}
          ariaLabel='For the Win'
          loading
        />
      </div>
    </div>
  );
}
**/

/**
* @name Button with circle
* @description Button with circle, default is small
*
* @category controls
* @component button
* @section circle
*
*
* @js
import { Button, Icon } from '@collab-ui/react';

export default function ButtonShape() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children={<Icon name='icon-search_12' />}
          onClick={() => {}}
          ariaLabel='For the Win'
          circle
        />
      </div>
    </div>
  );
}
**/

/**
* @name Circular Buttons
* @description Create circular buttons by passing in the <code>circle</code> prop.
*
* @category controls
* @component button
* @section circle
*
*
* @js
import { Button, Icon } from '@collab-ui/react';

export default function ButtonLargeCircle() {
  return(
    <div>
      <div className='row' style={{marginBottom: '1rem'}}>
        <div className="example-spacing">

          <div>size=(none)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size='none'
            >
              <Icon name='icon-private_8' />
            </Button>
          </div>
          <br />

          <div>size=(20)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={20}
            >
              <Icon name='icon-private_8' />
            </Button>
          </div>
          <br />

          <div>size=(28)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              color='blue'
              size={28}
            >
              <Icon name='icon-plus_12' color='white' />
            </Button>
          </div>
          <br />

          <div>size=(32)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={32}
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />


          <div>Default size=(36)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />

          <div>size=(40)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={40}
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />


          <div>size=(44)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={44}
            >
              <Icon name='icon-arrow-tail-down_14' />
            </Button>
          </div>
          <br />

          <div>size=(56)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={56}
            >
              <Icon name='icon-arrow-tail-down_20' />
            </Button>
          </div>
          <br />

          <div>size=(68)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={68}
            >
              <Icon name='icon-arrow-tail-down_28' />
            </Button>
          </div>
          <br />

          <div>size=(72)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={72}
            >
              <Icon name='icon-active-speaker_32' />
            </Button>
          </div>
          <br />

          <div>size=(84)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={84}
            >
              <Icon name='icon-blocked_36' />
            </Button>
          </div>
          <br />


        </div>
      </div>
    </div>
  );
}
**/

/**
* @name Call
* @description Control the avatar type by passing in the type of caller to the caller.type prop.  There can only be 2 Call Alerts active at one time.
*
* @category communication
* @component alert
* @section call
*
* @js

import {
  Button,
  AlertCall,
  AlertCallContainer
} from '@collab-ui/react';
import {
  uniqueId,
  reject
} from 'lodash';

export default class Default extends React.PureComponent {
  state = {
    alertList: [],
    caller: {title: 'Jefe Guadelupe', alt: '+ 1 972-555-1212'},
    devices: [
      {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
      {name: 'Use my computer', value: '2020202'}
    ]
  }

  handleOnReject = key => {
    console.log(`onRejectCall ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  handleOnAnswerVoice = key => {
    console.log(`onAnswerVoice ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  handleOnAnswerVideo = key => {
    console.log(`onAnswerVideo ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  renderPersonCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={this.state.caller}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };

  renderDeviceCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={{title: 'SJC21-Babelfish', alt: '+ 1 408-555-1212', type: 'device'}}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };

  renderNumberOnlyCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={{title: '+ 1 408-555-1212', type: 'number'}}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };

  renderCallerWithDevices = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={this.state.caller}
        devices={this.state.devices}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };

  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderPersonCaller()]
                }));
              }}
              children='Person Caller'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderDeviceCaller()]
                }));
              }}
              children='Device Caller'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderNumberOnlyCaller()]
                }));
              }}
              children='Number Only Caller'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderCallerWithDevices()]
                }));
              }}
              children='Caller with Device List'
              color='primary'
            />
          </div>
          <br />
          <AlertCallContainer
            alertList={this.state.alertList}
          />
        </div>
      </section>
    );
  }
}

**/

/**
* @name Default Call-Control
* @description Default Call-Control.
*
* @category controls
* @component call-control
* @section default
*
* @js
import { CallControl } from '@collab-ui/react';

export default function CallControlDefault() {
  return(
    <div className='row'>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">type=(microphone-muted)</code></p>
          <p><code className="small">size=(20)</code></p>
          <p><code className="small">iconSize=(10)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          ariaLabel='For the Win'
          size={20}
          iconSize={10}
        />
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">type=(microphone-muted)</code></p>
          <p><code className="small">size=(40)</code></p>
          <p><code className="small">iconSize=(16)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          ariaLabel='For the Win'
          size={40}
          iconSize={16}
        />
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">type=(microphone-muted)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          ariaLabel='For the Win'
        />
      </div>

    </div>
  );
}

**/

/**
* @name Call-Control with active
* @description Call control with active class.
*
* @category controls
* @component call-control
* @section active
*
* @js
import { CallControl } from '@collab-ui/react';

export default function CallControlActive() {
  return(
    <div className='row'>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">active=(true)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          active
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
      <div className="docs-example docs-example--spacing cui--contrast">
        (With Contrast)
        <h3>
          <p><code className="small">active=(true)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          active
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>

    </div>
  );
}

**/

/**
* @name Call-Control with disable
* @description Call-Control with disabled class.
*
* @category controls
* @component call-control
* @section disable
*
* @js
import { CallControl } from '@collab-ui/react';

export default function CallControlDisabled() {
  return(
     <div className='row'>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">disabled=(true)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          disabled
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
      <div className="docs-example docs-example--spacing cui--contrast">
        (With Contrast)
        <h3>
          <p><code className="small">disabled=(true)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          disabled
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>

    </div>
  );
}

**/

/**
* @name Call-Control cancel
* @description Call-Control with cancel class.
*
* @category controls
* @component call-control
* @section cancel
*
* @js
import { CallControl } from '@collab-ui/react';

export default function CallControlCancel() {
  return(
      <div className='row'>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">type=(cancel)</code></p>
        </h3>
        <CallControl
          type='cancel'
          active
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
      (With Contrast)
      <div className="docs-example docs-example--spacing cui--contrast">
        <h3>
          <p><code className="small">type=(cancel)</code></p>
        </h3>
        <CallControl
          type='cancel'
          active
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>

    </div>
  );
}

**/

/**
* @name Default Checkbox Group
*
* @category controls
* @component checkbox
* @section default
*
* @js

import { Checkbox, CheckboxGroup, InputHelper } from '@collab-ui/react';

export default function DefaultCheckboxGroup() {

  return (
    <CheckboxGroup name='CheckboxGroup1'>
      <Checkbox
        value='me'
        label='me'
        htmlId='testCheckbox1'
        onChange={()=>{}}
      />
      <Checkbox
        value='you'
        label='you'
        htmlId='testCheckbox2'
        onChange={()=>{}}
      />
      <Checkbox
        value='us'
        label='us'
        htmlId='testCheckbox3'
        onChange={()=>{}}
      >
        <InputHelper message={'I\'m here to help'} className='cui-checkbox-help' />
      </Checkbox>
    </CheckboxGroup>
  );
}

**/

/**
* @name Indeterminate Checkbox
* @description Checkboxes can be marked as indeterminate by passing in the indeterminate prop.
*
* @category controls
* @component checkbox
* @section indeterminate
*
* @js
import { Checkbox } from '@collab-ui/react';

export default function CheckboxIndeterminate() {
  return (
    <Checkbox
      value='indeterminate'
      label='Indeterminate Checkbox'
      htmlId='indeterminateCheckbox'
      onChange={()=>{}}
      indeterminate
    />
  );
}
**/

/**
* @name Disabled Checkbox
* @description Checkboxes can be disabled by passing in the disabled prop.
*
* @category controls
* @component checkbox
* @section disabled
*
* @js
import { Checkbox } from '@collab-ui/react';

export default function CheckboxDisabled() {
  return (
    <Checkbox
      value='disabledChecked'
      label='Disabled Checkbox'
      htmlId='disabledCheckbox'
      disabled
      onChange={()=>{}}
    />
  );
}
**/

/**
* @name Checked Checkbox
* @description Checkboxes can be checked be passing in the checked prop.
*
* @category controls
* @component checkbox
* @section checked
*
* @js
import { Checkbox } from '@collab-ui/react';

export default function CheckboxChecked() {
  return (
    <Checkbox
      value='checked'
      label='Checked Checkbox'
      htmlId='checkedCheckbox'
      checked
      onChange={()=>{}}
    />
  );
}
**/

/**
* @name Nested Checkboxes
* @description The level of nesting checkboxes is controlled by the nestedLevel prop.  You can have up to 3 nested levels.  Ex. nestedLevel={1} nestedLevel={2} nestedLevel=[3} etc.
*
* @category controls
* @component checkbox
* @section nested
*
* @js
import { Checkbox } from '@collab-ui/react';

export default class CheckboxNested extends React.PureComponent {
  state = {
    parent: false,
    child1: false,
    child2: false,
    child3: false,
  }

  render() {
    return (
      <span>
        <Checkbox
          value='parent'
          label='Parent Checkbox Example'
          htmlId='parentCheckbox'
          checked={this.state.parent}
          onChange={() => this.setState({ parent: !this.state.parent })}
          key='child-0'
        />
        <Checkbox
          value='child1'
          label='Child Checkbox Nested 1 Level'
          htmlId='childCheckbox1'
          nestedLevel={1}
          checked={this.state.child1}
          onChange={() => this.setState({ child1: !this.state.child1 })}
          key='child-1'
        />
        <Checkbox
          value='child2'
          label='Child Checkbox Nested 2 Levels'
          htmlId='childCheckbox2'
          nestedLevel={2}
          checked={this.state.child2}
          onChange={() => this.setState({ child2: !this.state.child2 })}
          key='child-2'
        />
        <Checkbox
          value='child3'
          label='Child Checkbox Nested 3 Levels'
          htmlId='childCheckbox3'
          nestedLevel={3}
          checked={this.state.child3}
          onChange={() => this.setState({ child3: !this.state.child3 })}
          key='child-3'
        />
      </span>
    );
  }
}
**/

/**
 * @name Recording Chip
 *
 * @category containers
 * @component chip
 * @section recording
 * @js
 import { Chip } from '@collab-ui/react';

 export default function Chip() {
   return (
     <div className="row">
       <div className="docs-example docs-example--spacing">
         <h3>
           <p><code className="small">size=(16)</code></p>
         </h3>
         <Chip type="recording" title="Webex Teams Recording" subTitle="18 min"/>
       </div>
     </div>
   );
 }

 **/

/**
 * @name File Chip
 *
 * @category containers
 * @component chip
 * @section file
 * @js
 import { Chip } from '@collab-ui/react';

 export default function Chip() {
   return (
     <div className="row">
       <div className="docs-example docs-example--spacing">
         <h3>
           <p><code className="small">size=(16)</code></p>
         </h3>
         <Chip type="file" fileType="audio" title="Filename.mp3" subTitle="23kb"  fileDownloadLink="https://www.google.com"/>
       </div>
     </div>
   );
 }
 **/

 /**
* @name Default ComboBox
*
* @category controls
* @component combo-box
* @section default
*
* @js
import { ComboBox } from '@collab-ui/react';

 export default class DefaultComboBox extends React.PureComponent {
  render() {
    return (
      <ComboBox options={['a', 'ab', 'abc']} />
    );
  }
}

**/

/**
* @name Dark State
*
* @category controls
* @component combo-box
* @section dark-state
*
* @js
import { ComboBox } from '@collab-ui/react';

export default class DarkComboBox extends React.PureComponent {
  render() {
    return (
      <div className="row large" style={{ paddingTop: '1rem', backgroundColor: 'black' }}>
        <ComboBox theme="dark" options={['a', 'ab', 'abc']} />
      </div>
    );
  }
}

**/

/**
* @name ComboBox with options as Nodes
*
* @category controls
* @component combo-box
* @section combo-box-nodes
*
* @js
import {
  ComboBox,
  ListItem,
  ListItemHeader,
} from '@collab-ui/react';

export default class ComboBoxNodes extends React.PureComponent {
  render() {
    return (
      <div className="row">
        <ComboBox>
          <ListItemHeader header="Suggested people"/>
          <ListItem label="a">
            <i>a</i>
          </ListItem>
          <ListItem label="ab">
            <i>ab</i>
          </ListItem>
          <ListItem disabled label="abc" >
            <i>abc</i>
          </ListItem>
        </ComboBox>
      </div>
    );
  }
}

**/

/**
* @name DatePicker
*
* @category controls
* @component date-picker
* @section default
*
* @js

import { Button, DatePicker } from '@collab-ui/react';

export default class DatePickerDefault extends React.PureComponent {
  state = {
    date: null,
  };
  render() {
    const { date } = this.state;
    return (
      <div>
      <span>
        <h4 className="columns">Selected Date: {date && date.toDateString()}</h4>
        <DatePicker onSelect={(e, date) => this.setState({ date })}>
          <Button
            children='Pick a Date'
            ariaLabel='DatePicker'
          />
        </DatePicker>
      </span>
      <span className="cui--contrast">
        <DatePicker onSelect={(e, date) => this.setState({ date })}>
          <Button
            children='Pick a Date (with Contrast)'
            ariaLabel='DatePicker'
          />
        </DatePicker>
      </span>
      </div>
    );
  }
}
**/

/**
* @name Default EditableTextfield
*
* @category controls
* @component editable-textfield
* @section default
*
* @js
import { EditableTextfield } from '@collab-ui/react';

export default class PlaygroundComponent extends React.Component {
  valueChange = (value) => {
    newValue = value;
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">inputText=(Hello World)</code></p>
            <p><code className="small">{'handleDoneEditing=({(value) => console.log(value)})'}</code></p>
          </h3>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <EditableTextfield
              handleDoneEditing={(e, data) => console.log(e, data)}
              inputText='Hello World'
            />
          </div>

        </div>
        <div className="cui--dark docs-example docs-example--spacing docs-example--dark">

          <h3>
            Props
            <p><code className="small">inputText=(Hello Dark World)</code></p>
            <p><code className="small">alignment=('center')</code></p>
          </h3>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <EditableTextfield alignment='center' inputText='Hello Dark World'/>
          </div>

        </div>
    </div>
    );
  }
}

**/

/**
* @name Default Input
* @description Inputs are useful.
*
* @category controls
* @component input
* @section default
*
* @js
import { Input } from '@collab-ui/react';

export default class Default extends React.PureComponent {

  render() {
    return (
      <div className='row'>
      <Input
        name='defaultInput'
        label='Default Input'
        htmlId='defaultInput'
        inputSize='small-5'
        placeholder='Placeholder Text'
      />
    </div>
    );
  }
}

**/

/**
* @name Input Type = Number
* @description Inputs are useful.
*
* @category controls
* @component input
* @section number
*
* @js
import { Input } from '@collab-ui/react';

export default class Default extends React.PureComponent {
  render() {
    return (
      <div className='row'>
      <Input
        name='input2'
        label='Number Input'
        htmlId='input2'
        type='number'
      />
    </div>
    );
  }
}

**/

/**
* @name Input Type = Password
* @description Inputs are useful.
*
* @category controls
* @component input
* @section Type Attribute
*
* @js
import { Input } from '@collab-ui/react';

export default class Default extends React.PureComponent {
  render() {
    return (
      <div className='row'>
      <Input
        name='input3'
        label='Password Input'
        htmlId='input3'
        type='password'
      />
    </div>
    );
  }
}

**/

/**
* @name Input Size
* @description Inputs are useful.
*
* @category controls
* @component input
* @section inputSize Attribute
*
* @js
import { Input } from '@collab-ui/react';

export default function InputSize() {
  return (
    <div className='row'>
      <Input
        name='input4'
        label='Large Input'
        htmlId='input4'
        inputSize='medium-12'
      />
    </div>
  );
}

**/

/**
* @name Input Secondary Label
* @description Inputs are useful.
*
* @category controls
* @component input
* @section secondary-label
*
* @js
import { Input } from '@collab-ui/react';

export default function InputSecondary() {
  return (
    <div className='row'>
      <Input
        name='inputSecondaryLabel'
        label='Input with Secondary Label'
        htmlId='inputSecondaryLabel'
        inputSize='small-5'
        secondaryLabel='Secondary Label'
      />
    </div>
  );
}

**/

/**
* @name Input Required
* @description Inputs are useful.
*
* @category controls
* @component input
* @section Required Attribute
*
* @js
import { Input } from '@collab-ui/react';

export default function InputRequired() {
  return (
    <div className='row'>
      <Input
        name='input6'
        label='Required Input'
        htmlId='input6'
        required
      />
    </div>
  );
}

**/

/**
* @name Input Placeholder
* @description Inputs are useful.
*
* @category controls
* @component input
* @section placeholder Attribute
*
* @js
import { Input } from '@collab-ui/react';

export default function InputPlaceholder() {
  return (
    <div className='row'>
      <Input
        name='input7'
        label='Placeholder Input'
        htmlId='input7'
        placeholder='Placeholder'
      />
    </div>
  );
}

**/

/**
* @name Input Help Text
* @description Inputs are useful.
*
* @category controls
* @component input
* @section help-text
*
* @js
import { Input } from '@collab-ui/react';

export default function InputHelp() {
  return (
    <div className='row'>
      <Input
        name='inputHelpText'
        label='Help Text Input'
        htmlId='inputHelpText'
        inputSize='small-5'
        inputHelpText='Help Text'
      />
    </div>
  );
}

**/

/**
* @name Input Disabled
* @description Inputs are useful.
*
* @category controls
* @component input
* @section disabled
*
* @js
import { Input } from '@collab-ui/react';

export default function InputDisabled() {
  return (
    <div className='row'>
      <Input
        name='inputDisabled'
        label='Disabled Input'
        htmlId='inputDisabled'
        inputSize='small-5'
        value='Disabled Text'
        disabled
      />
    </div>
  );
}

**/

/**
* @name Input Read Only
* @description Inputs are useful.
*
* @category controls
* @component input
* @section read-only
*
* @js
import { Input } from '@collab-ui/react';

export default function InputReadonly() {
  return (
    <div className='row'>
      <Input
        name='inputReadonly'
        label='Read Only Input'
        htmlId='inputReadonly'
        inputSize='small-5'
        value='Read Only Text'
        readOnly
      />
    </div>
  );
}

**/

/**
* @name Input Nested
* @description Inputs are useful.
*
* @category controls
* @component input
* @section nested
*
* @js
import { Input } from '@collab-ui/react';

export default function InputNested() {
  return (
    <div className='row' key={'input1'}>
      <Input
        name='inputParent'
        label='Parent Input Example'
        htmlId='inputParent'
        inputSize='small-5'
      />
    </div>,
    <div className='row' key={'input2'}>
      <Input
        name='inputNested1'
        label='Child Input Nested 1 Level'
        inputSize='small-5'
        htmlId='inputNested1'
        nestedLevel={1}
      />
    </div>,
    <div className='row' key={'input3'}>
      <Input
        name='inputNested2'
        label='Child Input Nested 2 Levels'
        inputSize='small-5'
        htmlId='inputNested2'
        nestedLevel={2}
      />
    </div>,
    <div className='row' key={'input4'}>
      <Input
        name='inputNested3'
        label='Child Input Nested 3 Levels'
        inputSize='small-5'
        htmlId='inputNested3'
        nestedLevel={3}
      />
    </div>
  );
}

**/

/**
* @name Input Error (Warning)
* @description Inputs are useful.
*
* @category controls
* @component input
* @section warning
*
* @js
import { Input } from '@collab-ui/react';

export default function InputError() {
  return (
    <div className='row'>
      <Input
        name='inputWarning'
        label='Error (Warning) Input'
        htmlId='inputWarning'
        inputSize='small-5'
        errorArr={ [{error: 'This is where the warning message would be.', type: 'warning'}] }
      />
    </div>
  );
}

**/

/**
* @name Input Error (Error)
* @description Inputs are useful.
*
* @category controls
* @component input
* @section error
*
* @js
import { Input } from '@collab-ui/react';

export default function InputError() {
  return (
    <div className='row'>
      <Input
        name='inputError'
        label='Error (Error) Input'
        htmlId='inputError'
        inputSize='small-5'
        errorArr={ [{error: 'This is where the error message would be.', type: 'error'}] }
      />
    </div>
  );
}

**/

/**
* @name Input Error (Success)
* @description Inputs are useful.
*
* @category controls
* @component input
* @section success
*
* @js
import { Input } from '@collab-ui/react';

export default function InputError() {
  return (
    <div className='row'>
      <Input
        name='inputSuccess'
        label='Error (Success) Input'
        htmlId='inputSuccess'
        inputSize='small-5'
        errorArr={ [{error: 'This is where the success message would be.', type: 'success'}] }
      />
    </div>
  );
}

**/

/**
* @name Advanced Validation
* @description Example of advanced validation.
*
* @category controls
* @component input
* @section advanced-validation
*
* @js
import { Input } from '@collab-ui/react';

export default class Form extends React.PureComponent {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.retrieveState = this.retrieveState.bind(this);
    this.addElement = this.addElement.bind(this);
    this.createErrorArr = this.createErrorArr.bind(this);
  }

  state = {
    testMe: '',
    testMeError: []
  }

  handleChange(value) {
    this.setState({
      testMe: value
    });
  }

  handleSubmit(event) {
    event && event.preventDefault();
    this.validateField('testMe', this.state.testMe);
  }

  retrieveState() {
    return this.state;
  }

  addElement(array, element) {
    return array.includes(element)
    ? [...array]
    : [...array, element];
  }

  removeElement(array, element) {
    return array.filter((ele) => ele !== element);
  }

  createErrorArr(validationArr, value) {
    return validationArr.reduce((agg, e) =>
      value.match(e.test)
      ? this.removeElement(agg, e)
      : this.addElement(agg, e)
    , []);
  }

  validateField(fieldName, value, cb) {
    const rules = {
      testMe: {
        validation: [
          {
            error: 'Preferred if TestMe Field is 8 characters',
            test: '^[a-zA-Z]{8,}$',
            type: 'warning'
          },
          {
            error: 'TestMe Field is too short',
            test: '^[a-zA-Z]{6,}$',
            type: 'error'
          },
          {
            error: 'TestMe Field must contain Caps',
            test: '[A-Z]',
            type: 'error'
          },
          {
            error: 'Preferred if TestMe Field has 2 caps',
            test: '[A-Z]{2}',
            type: 'warning'
          }
        ],
        errors: this.state.testMeError
      }
    };

    return (
      this.setState({
        [`${fieldName}Error`]: this.createErrorArr(rules[fieldName].validation, value)
      },
        cb
      )
    );
  }

  render() {
    return (
      <form name='testFrom' onSubmit={this.handleSubmit}>
        <div className='row'>
          <Input
            inputSize='small-5'
            htmlId='testMe'
            value={this.state.testMe}
            name='testMe'
            label='Advanced Validation'
            onChange={this.handleChange}
            inputHelpText='Field Must contain at least 6 characters and 1 capital letter'
            errorArr={this.state.testMeError}
          />
        </div>
          {this.props.children}
      </form>
    );
  }
}

**/

/**
* @name Input with clear button
* @description You can use the built in clear functionality
*
* @category controls
* @component input
* @section clear
*
* @js
import { Input } from '@collab-ui/react';

export default class Clear extends React.PureComponent {
  state = {
    value: 'Press or click the clear icon to clear this input'
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className='row'>
      <Input
        name='clearInput'
        label='Input with clear'
        htmlId='clearInput'
        inputSize='small-5'
        placeholder='Placeholder Text'
        value={this.state.value}
        onChange={this.handleChange}
        clear
      />
    </div>
    );
  }
}


**/

/**
* @name Input with custom iconNode
* @description You can add an custom Icon node (overrides clear button if clear prop exists)
*
* @category controls
* @component input
* @section custom-icon
*
* @js
import { Input } from '@collab-ui/react';

export default class CustomIconNode extends React.PureComponent {

  render() {
    const iconNode = (
      <Icon
        name="icon-info_16"
        ariaLabel={'custom icon'}
      />
    );

    return (
      <div className='row'>
      <Input
        name='inputIcon'
        label='Input with custom Icon node'
        htmlId='inputIcon'
        iconNode={iconNode}
        inputSize='small-5'
        placeholder='Placeholder Text'
      />
    </div>
    );
  }
}


**/

/**
* @name Lightbox with one page
*
* @category containers
* @component lightbox
* @section default
*
* @js

import { Button, Lightbox } from '@collab-ui/react';
import reactIcon from '@collab-ui/core/docs/assets/react.png';

 export default class Default extends React.Component {

  state = {
    index: 0,
    show: false,
    downloading: false,
  }

  render() {
    return (
      <div>
        <Button ariaLabel='Show Lightbox' onClick={() => this.setState({ show: true })}>Show</Button>
        {
          this.state.show &&
          <Lightbox
            onClose={() => this.setState({ show: false})}
            onChange={(idx) => this.setState({ index: idx })}
            name="Screen Shot 2018-04-11 at 7.32.51 PM.png"
            applicationId="app"
            onDownload={() => {
                this.setState({downloading: true});
                setTimeout(() => this.setState({downloading: false}), 2000);
              }
            }
            downloading={this.state.downloading}
            info={{sharedBy:"Shared by test", sharedOn: "At 4/17/2018, 10:02 AM", size: "34.4 KB"}}
            index={this.state.index}
            height={250}
            width={250}
            pages={[{
              decrypting: false,
              image: reactIcon,
              thumb: reactIcon
            }]}
          />
        }
      </div>
    );
  }
}
**/

/**
* @name Lightbox with multiple page
*
* @category containers
* @component lightbox
* @section multiple
*
* @js
import { Button, Lightbox } from '@collab-ui/react';
import reactIcon from '@collab-ui/core/docs/assets/react.png';
import angularIcon from '@collab-ui/core/docs/assets/angular.png';

 export default class Default extends React.Component {

  state = {
    index: 0,
    show: false,
    downloading: false,
  }

  render() {
    return (
      <div>
        <Button ariaLabel='Show Lightbox' onClick={() => this.setState({ show: true })}>Show</Button>
        {
          this.state.show &&
          <Lightbox
            onClose={() => this.setState({ show: false})}
            onChange={(idx) => this.setState({ index: idx })}
            name="Screen Shot 2018-04-11 at 7.32.51 PM.png"
            applicationId="app"
            onDownload={() => {
                this.setState({downloading: true});
                setTimeout(() => this.setState({downloading: false}), 2000);
              }
            }
            downloading={this.state.downloading}
            info={{sharedBy:"Shared by test", sharedOn: "At 4/17/2018, 10:02 AM", size: "34.4 KB"}}
            index={this.state.index}
            height={250}
            width={250}
            pages={[{
              decrypting: false,
              image: reactIcon,
              thumb: reactIcon
            }, {
              decrypting: false,
              image: angularIcon,
              thumb: angularIcon
            }]}
          />
        }
      </div>
    );
  }
}
**/

/**
* @name Default Link
* @description Default Link.
*
* @category controls
* @component link
* @section default
*
* @js
import { Link } from '@collab-ui/react';

export default function LinkDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
          <Link>Default</Link>
          <Link tag='div'>Tag Prop(div)</Link>
          <Link tag='span'>Tag Prop(span)</Link>
      </div>
    </div>
  );
}

**/

/**
* @name Link Colors
* @description Vary colors by using theme & color props.
*
* @category controls
* @component link
* @section colors
*
* @js
import { Link } from '@collab-ui/react';

export default function LinkDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Link tag='div' color='red'>Color Prop(red)</Link>
      </div>
    </div>
  );
}
*/

/**
* @name Default
*
* @category containers
* @component list-item
* @section default
*
* @js
*
import { List, ListItem } from '@collab-ui/react';

export default class ListItemDefault extends React.PureComponent {

  render() {
    return(
      <div className="medium-4 columns">
        <div>
          <List>
            <ListItem label='Default List Item 1' />
            <ListItem label='Default List Item 2' />
          </List>
        </div>
        <div className="cui--contrast">
          <List>
            <ListItem label='List Item 1 (with Contrast)' />
            <ListItem label='List Item 2 (with Contrast)' />
          </List>
        </div>
      </div>
    );
  }
}
**/

/**
* @name Type
*
* @category containers
* @component list-item
* @section type
*
* @js
*
import { List, ListItem } from '@collab-ui/react';

export default class ListItemType extends React.PureComponent {

  render() {
    return(
      <div className="medium-4 columns">
        <div>
          <List>
            <ListItem type='small' link='javascript:void(0)' label='Small List Item' />
            <ListItem link='javascript:void(0)' label='Regular List Item' />
            <ListItem type='large' link='javascript:void(0)' label='Large List Item' />
            <ListItem type='xlarge' link='javascript:void(0)' label='XLarge List Item' />
          </List>
        </div>
        <div className="cui--contrast">
          <List>
            <ListItem type='small' link='javascript:void(0)' label='Small List Item (with Contrast)' />
            <ListItem link='javascript:void(0)' label='Regular List Item (with Contrast)' />
            <ListItem type='large' link='javascript:void(0)' label='Large List Item (with Contrast)' />
            <ListItem type='xlarge' link='javascript:void(0)' label='XLarge List Item (with Contrast)' />
          </List>
        </div>
      </div>
    );
  }
}
**/

/**
* @name List Item Sections
*
* @category containers
* @component list-item
* @section list-item-sections
*
* @js
*
import { List, ListItem, ListItemSection } from '@collab-ui/react';

export default class ListItemSectionExample extends React.PureComponent {

  render() {
    return(
      <div className="medium-4 columns">
        <List>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='left'>
              Left
              </ListItemSection>
              <ListItemSection position='right'>
                Right
              </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='center'>
              Center
            </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='center-align'>
              Center Align
            </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='left'>
              Left
            </ListItemSection>
            <ListItemSection position='center'>
              Center
            </ListItemSection>
            <ListItemSection position='right'>
              Right
            </ListItemSection>
          </ListItem>
        </List>
      </div>
    );
  }
}
**/

/**
* @name Custom Link
*
* @category containers
* @component list-item
* @section custom-anchor
*
* @js
*
import { List, ListItem } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class CustomLinkExample extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns">
        <List>
          <ListItem label='Custom Anchor' customRefProp='innerRef' customAnchorNode={anchorNode}/>
        </List>
      </div>
    );
  }
}
**/

/**
* @name Tab Type
*
* @category containers
* @component list-item
* @section tab-type
*
* @js
*
import { List, ListItem } from '@collab-ui/react';

export default class HorizontalListExample extends React.PureComponent {

  render() {
    return(
      <List tabType="horizontal" wrap>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
        <ListItem style={{width: '100px', flex: '0 0 auto'}}>Hello</ListItem>
      </List>
    );
  }
}
**/

/**
* @name List Item Header
*
* @category containers
* @component list-item
* @section header
*
* @js
*
import { List, ListItemHeader } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item'>More</NavLink>;
    return(
      <div className="medium-4 columns">
        <List>
          <ListItemHeader header='Testing' children={anchorNode} />
        </List>
        <List className='cui--dark' style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <ListItemHeader header='Testing' children={anchorNode}/>
        </List>
      </div>
    );
  }
}
**/

/**
* @name Spinner
* @description Different states of spinners.
*
* @category communication
* @component loader-spinner
* @section states
*
* @js
import { Spinner } from '@collab-ui/react';

export default function Default() {
  return (
    <div className="row">

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(16)</code></p>
        </h3>
        <Spinner size={16}/>
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(20)</code></p>
        </h3>
        <Spinner size={20}/>
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(28)</code></p>
        </h3>
        <Spinner size={28}/>
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">Default size=(36)</code></p>
        </h3>
        <Spinner />
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">color=(blue)</code></p>
        </h3>
        <Spinner color='blue'/>
      </div>

      <div className="docs-example docs-example--spacing cui--dark docs-example--dark">
        <h3>Dark Spinner</h3>
        <Spinner />
      </div>

      <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">percentage=(65)</code></p>
          </h3>
          <Spinner percentage={65}/>
      </div>

    </div>
  );
}

**/

/**
* @name Check Prop
* @description Set showCheck to true to show and percentage to 100.
*
* @category communication
* @component loader-spinner
* @section check
*
* @js
import { Spinner } from '@collab-ui/react';

export default function Default() {
  return (
    <div className='row'>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(16)</code></p>
        </h3>
        <Spinner
          size={16}
          percentage={100}
          showCheck
        />
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(20)</code></p>
        </h3>
          <Spinner
            size={20}
            percentage={100}
            showCheck
          />
      </div>

      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(28)</code></p>
        </h3>
          <Spinner
            size={28}
            percentage={100}
            showCheck
          />
      </div>

      <div>
        <h3>
          <p><code className="small">size=(36)</code></p>
        </h3>
          <Spinner
            size={36}
            percentage={100}
            showCheck
          />
      </div>

    </div>
  );
}

**/

/**
* @name Meeting
* @description Control the avatar type by passing in an array of user data in the attendees prop.
*
* @category communication
* @component alert
* @section meeting
*
* @js

import {
  Button,
  AlertMeeting,
  AlertMeetingContainer
} from '@collab-ui/react';
import {
  uniqueId,
  reject
} from 'lodash';

export default class Default extends React.PureComponent {
  state = {
    alertList: []
  }

  handleOnHide = key => {
    console.log(`onHide ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  handleOnSnooze = key => {
    console.log(`onSnooze ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  renderSingleAttendeeMeeting = () => {
    const key = uniqueId('meeting_alert_');
    return (
      <AlertMeeting
        key={key}
        title='Important Meeting'
        status='In 5 mins.'
        message='This is important'
        onHide={() => this.handleOnHide(key)}
        onSnooze={() => this.handleOnSnooze(key)}
        attendees={[{title: 'J $'}]}
        show
      />
    );
  }

  renderMultipleAttendeeMeeting = () => {
    const key = uniqueId('meeting_alert_');
    return (
      <AlertMeeting
        key={key}
        title='Important Meeting'
        status='In 5 mins.'
        message='This is important'
        onHide={() => this.handleOnHide(key)}
        onSnooze={() => this.handleOnSnooze(key)}
        attendees={[{title: 'J $'}, {title: 'Jefe Guadelupe'}]}
        show
      />
    );
  }

  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderSingleAttendeeMeeting()]
                }));
              }}
              children='Single Attendee'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderMultipleAttendeeMeeting()]
                }));
              }}
              children='Multiple Attendees'
              color='primary'
            />
          </div>
          <br />
          <AlertMeetingContainer
            alertList={this.state.alertList}
          />
        </div>
      </section>
    );
  }
}

**/

/**
* @name List Item Meeting
*
* @category containers
* @component list-item
* @section list-item-meeting
*
* @js
*
import {
  Avatar,
  Icon,
  List,
  ListItemHeader,
  ListItemMeeting,
  ListSeparator,
} from '@collab-ui/react';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    return(
      <div style={{ width: '840px' }}>
        <List>
          <ListItemMeeting
            isAllDay
            header='ListItemMeeting (isAllDay)'
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />

          <ListSeparator />

          <ListItemMeeting
            isAllDay
            header='ListItemMeeting (isAllDay)'
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />

          <ListSeparator text='Yesterday' />

          <ListItemMeeting
            time={{start: '5:00PM', end: '10:00PM'}}
            header='ListItemMeeting (time object)'
            isRecurring
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />

          <ListSeparator lineColor='red' margin='40px 0' />

          <ListItemMeeting
            time={{start: '5:00PM', end: '10:00PM'}}
            inProgress
            header='ListItemMeeting (inProgress)'
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>}
            popoverContent={'test'}
          />

          <ListSeparator text="Padding" textPadding='0 40px' />

          <ListItemMeeting
            includeDate={true}
            date='January 24, 2018'
            time={{start: '10:00 AM', end: '11:00 AM'}}

            header="Finish presentation on focus areas"
          />
          <ListItemMeeting
            inProgress
            type='chip'
            includeDate={true}
            date='January 25, 2018'
            time={{start: '3:00PM', end: '4:00PM'}}
            header="I'm a flagged meeting"
          />

          <ListSeparator text='Text Color' textColor='orange' lineColor='red' />

          <ListItemMeeting
            includeDate={true}
            date='March 2, 2019'
            isRecurring
            isCompleted
            header='ListItemMeeting (isCompleted)'
            anchorLabel='SpaceString'
            anchorOnClick={() => console.log('anchor clicked')}
            childrenRight={<Avatar title='NA'/>} popoverContent={'test'}
          />
        </List>
      </div>
    );
  }
}
**/

/**
* @name Menu Overlay
*
* @category containers
* @component menu-overlay
* @section default
*
* @js
*

import {
  Button,
  EditableTextfield,
  Icon,
  ListItemSection,
  Menu,
  MenuContent,
  MenuItem,
  MenuOverlay,
  SubMenu
} from '@collab-ui/react';

export default class MenuOverlayDefault extends React.PureComponent {
  onClick(event, value) {
    alert(`${value} clicked`);
  }

  render() {
    return(
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <MenuOverlay
            menuTrigger={
              <Button ariaLabel='Show Menu'>Show Menu</Button>
            }
          >
            <MenuContent>
              <EditableTextfield inputText='Content Area'/>
            </MenuContent>
            <Menu>
              <SubMenu
                selectedValue="Out of office until 2:00pm"
                label="Status"
              >
                <MenuItem isHeader label="Set Do Not Disturb:"/>
                <MenuItem disabled label="1 hour" onClick={this.onClick} value="1 hour"/>
                <MenuItem keepMenuOpen label="5 hour" onClick={this.onClick} value="5 hour"/>
                <MenuItem keepMenuOpen label="8 hour"/>
              </SubMenu>
              <SubMenu
                selectedValue="English"
                label="Language"
              >
                <MenuItem label="English"/>
                <MenuItem label="Spanish"/>
              </SubMenu>
              <MenuItem
                label="Settings"
              />
            </Menu>
          </MenuOverlay>
        </div>

        <div className="docs-example docs-example--spacing">

          <h3>
            <p><code className="small">direction=(top-center)</code></p>
          </h3>
          <MenuOverlay
            menuTrigger={
              <Button ariaLabel='Show Custom Menu'>Show Customized MenuItems</Button>
            }
            direction='top-center'
          >
            <MenuContent>Content</MenuContent>
            <Menu>
              <MenuItem>
                <ListItemSection position="left">
                  <Icon name='edit_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Edit space settings
                </ListItemSection>
              </MenuItem>
              <MenuItem keepMenuOpen>
                <ListItemSection position="left">
                  <Icon name='favorite_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Add to favorites
                </ListItemSection>
              </MenuItem>
              <MenuItem>
                <ListItemSection position="left">
                  <Icon name='alert_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Notifications
                </ListItemSection>
              </MenuItem>
              <MenuItem>
                <ListItemSection position="left">
                  <Icon name='accessories_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Add Integrations & Bots
                </ListItemSection>
              </MenuItem>
              <MenuItem>
              <ListItemSection position="left">
                  <Icon name='stored-info_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  View space policy
                </ListItemSection>
              </MenuItem>
              <MenuItem keepMenuOpen>
                <ListItemSection position="left">
                  <Icon name='archive_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Archive space
                </ListItemSection>
              </MenuItem>
              <MenuItem keepMenuOpen>
                <ListItemSection position="left">
                  <Icon name='cancel_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Remove space from team
                </ListItemSection>
              </MenuItem>
              <MenuItem>
                <ListItemSection position="left">
                  <Icon name='exit-room_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Leave space
                </ListItemSection>
              </MenuItem>
            </Menu>
          </MenuOverlay>
        </div>

      </div>
    );
  }
}
**/

/**
* @name Default Modal
* @description Modal with default size.
* @category containers
* @component modal
* @section default
*
* @js

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal: false,
    showModal2: false,
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Default/Medium Modal'
            onClick={() => this.setState({showModal: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Default/Medium Modal with Message'
            onClick={() => this.setState({showModal2: true})}
            ariaLabel='Open Modal 2'
            color='primary'
          />

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal: false})}
            show={this.state.showModal}
            ref={modal1 => this.modal1 = modal1}
            htmlId='modal1'
            backdropClickExit
          >
            <ModalHeader
              headerLabel='Default Modal'
              showCloseButton
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal1.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal1.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal2: false})}
            show={this.state.showModal2}
            ref={modal2 => this.modal2 = modal2}
            htmlId='modal2'
            backdropClickExit
          >
            <ModalHeader
              headerLabel='Default Modal'
              message='To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.'
              showCloseButton
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal2.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal2.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}

**/

/**
* @name Small Modal
* @description Modal with small size.
* @category containers
* @component modal
* @section small
*
* @js

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal3: false,
    showModal4: false,
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Small Modal'
            onClick={() => this.setState({showModal3: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Small Modal with Message'
            onClick={() => this.setState({showModal4: true})}
            ariaLabel='Open Modal'
            color='primary'
          />

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal3: false})}
            show={this.state.showModal3}
            ref={modal3 => this.modal3 = modal3}
            size='small'
            htmlId='modal3'
          >
            <ModalHeader
              headerLabel='Small Modal'
              showCloseButton
            />
            <ModalBody>
              <form ref={moform2 => this.moform2 = moform2} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal3.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault;
                  this.modal3.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal4: false})}
            show={this.state.showModal4}
            ref={modal4 => this.modal4 = modal4}
            size='small'
            htmlId='modal4'
          >
            <ModalHeader
              headerLabel='Small Modal'
              showCloseButton
              message='To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.'
            />
            <ModalBody>
              <form ref={moform2 => this.moform2 = moform2} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal4.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault;
                  this.modal4.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
**/

/**
* @name Large Modal
* @description Modal with large size.
* @category containers
* @component modal
* @section large
*
* @js

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal5: false,
    showModal6: false,
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Large Modal'
            onClick={() => this.setState({showModal5: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Large Modal with Message'
            onClick={() => this.setState({showModal6: true})}
            ariaLabel='Open Modal'
            color='primary'
          />

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal5: false})}
            show={this.state.showModal5}
            ref={modal5 => this.modal5 = modal5}
            htmlId='modal5'
            size='large'
          >
            <ModalHeader
              headerLabel='Large Modal'
              showCloseButton
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal5.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal5.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal6: false})}
            show={this.state.showModal6}
            ref={modal6 => this.modal6 = modal6}
            htmlId='modal6'
            size='large'
          >
            <ModalHeader
              headerLabel='Large Modal'
              showCloseButton
              message='To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite. To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.'
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal6.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal6.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
**/

/**
* @name Full Modal
 * @description Modal with full size.
* @category containers
* @component modal
* @section full
*
* @js

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showModal7: false,
    showModal8: false,
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Full Modal'
            onClick={() => this.setState({showModal7: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Full Modal with Message'
            onClick={() => this.setState({showModal8: true})}
            ariaLabel='Open Modal'
            color='primary'
          />

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal7: false})}
            show={this.state.showModal7}
            ref={modal7 => this.modal7 = modal7}
            htmlId='modal7'
            size='full'
          >
            <ModalHeader
              headerLabel='Full Modal'
              showCloseButton
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal7.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal7.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

          <Modal
            applicationId='app'
            onHide={() => this.setState({showModal8: false})}
            show={this.state.showModal8}
            ref={modal8 => this.modal8 = modal8}
            htmlId='modal8'
            size='full'
          >
            <ModalHeader
              headerLabel='Full Modal'
              showCloseButton
              message='To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.'
            />
            <ModalBody>
              <form ref={form1 => this.form1 = form1} />
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modal8.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  this.modal8.closeModal();
                }}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
**/

/**
* @name Dialog Modal
* @description Modal with dialog size.
* @category containers
* @component modal
* @section dialog
*
* @js

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Icon
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showDialog: false,
    showModalInternal: false
  }

  render() {
    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <Button
            children='Dialog Modal'
            onClick={() => this.setState({showDialog: true})}
            ariaLabel='Open Modal'
            color='primary'
          />
          <Button
            children='Render To Div'
            onClick={() => this.setState({showModalInternal: true})}
            ariaLabel='Open Modal'
            color='primary'
          />

          <Modal
            icon={<Icon name="warning_72" color="$yellow"/>}
            applicationId='app'
            onHide={() => this.setState({showDialog: false})}
            show={this.state.showDialog}
            ref={modalDialog => this.modalDialog = modalDialog}
            size='dialog'
            htmlId='modalDialog'
          >
            <ModalHeader
              headerLabel='Dialog Modal'
            />
            <ModalBody>
              <span>I'm just a dialog box</span>
            </ModalBody>
            <ModalFooter>
              <Button
                children='Cancel'
                onClick={() => this.modalDialog.closeModal()}
                ariaLabel='Close Modal'
                color='default'
              />
              <Button
                children='OK'
                onClick={() => this.modalDialog.closeModal()}
                ariaLabel='Submit Form'
                color='blue'
              />
            </ModalFooter>
          </Modal>

        <div id='render-to-modal'/>

        <Modal
          icon={<Icon name="warning_72" color="$yellow"/>}
          applicationId='app'
          onHide={() => this.setState({showModalInternal: false})}
          show={this.state.showModalInternal}
          ref={ref => this.modalInternal = ref}
          size='dialog'
          htmlId='modalInternal'
          renderTo='render-to-modal'
        >
          <ModalHeader
            headerLabel='Dialog Modal'
          />
          <ModalBody>
            <span>I'm just a dialog box</span>
          </ModalBody>
          <ModalFooter>
            <Button
              children='Cancel'
              onClick={() => this.modalInternal.closeModal()}
              ariaLabel='Close Modal'
              color='default'
            />
            <Button
              children='OK'
              onClick={() => this.modalInternal.closeModal()}
              ariaLabel='Submit Form'
              color='blue'
            />
          </ModalFooter>
        </Modal>

        </div>
      </div>
    );
  }
}

**/

/**
* @name Progress Bar Default
*
* @category communication
* @component progress-bar
* @section default
*
* @js
import { ProgressBar } from '@collab-ui/react';

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Default'
        min={0}
        max={100}
        value={50}
      />
    </div>
  );
}

**/

/**
* @name Progress Bar Dynamic Colors
*
* @category communication
* @component progress-bar
* @section Dynamic Colors
*
* @js

import {
  Button,
  ProgressBar,
} from '@collab-ui/react';

export default class Default extends React.PureComponent{
  state= {
    pbValue: 0
  }

  render() {
    return (
      <div>
        <Button
          children='Randomize'
          onClick={() => this.setState({pbValue: Math.floor(Math.random() * (101))})}
          ariaLabel='Randomize'
          color='primary'
        />
        <div className='columns small-6'>
          <ProgressBar
            label='ProgressBar Default'
            value={this.state.pbValue}
            dynamic
          />
        </div>
      </div>
    );
  }
}

**/

/**
* @name Progress Bar Static Color
*
* @category communication
* @component progress-bar
* @section Static Color
*
* @js
import { ProgressBar } from '@collab-ui/react';

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Static'
        value={50}
        color='danger'
      />
    </div>
  );
}

**/

/**
* @name Progress Bar Percentage Display
*
* @category communication
* @component progress-bar
* @section Percentage Display
*
* @js
import { ProgressBar } from '@collab-ui/react';

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Percentage'
        value={50}
        displayFormat='percentage'
      />
    </div>
  );
}

**/

/**
* @name Progress Bar No Display
*
* @category communication
* @component progress-bar
* @section No Display
*
* @js
import { ProgressBar } from '@collab-ui/react';

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Display None'
        value={75}
        displayFormat='none'
      />
    </div>
  );
}

**/

/**
* @name Progress Bar Min Max Modified
*
* @category communication
* @component progress-bar
* @section Min Max Modified
*
* @js
import { ProgressBar } from '@collab-ui/react';

export default function() {
  return (
    <div className='columns small-6'>
      <ProgressBar
        label='ProgressBar Min Max'
        min={0}
        max={250}
        value={125}
      />
    </div>
  );
}

**/

/**
* @name Progress Bar Determinate/Indeterminate
*
* @category communication
* @component progress-bar
* @section Determinate/Indeterminate
*
* @js
import { ProgressBar } from '@collab-ui/react';

export default function() {
  return (
    <div className='columns small-6'>
      <div>Pending: Determinate/Indeterminate Need to Have CSS Styles Defined in Collab-UI</div>
      <ProgressBar
        label='ProgressBar Determinate/Indeterminate'
        value={60}
        displayFormat='percentage'
      />
    </div>
  );
}

**/

/**
* @name Radio Button Group
* @description Groups of Radio Buttons
*
* @category controls
* @component radio
* @section default
*
* @js

import {
  InputHelper,
  Radio,
  RadioGroup,
} from '@collab-ui/react';

export default class DefaultRadio extends React.Component {
  render() {
    return (
      <div className='row'>
        <h3>Radio Button Group</h3>
        <br />
        <RadioGroup>
          <Radio
            value='me'
            label='me'
            htmlId='testCheckbox1'
            onChange={()=>{}}
            inputRef={ref=>this.input=ref}
          />
          <Radio
            value='you'
            label='you'
            htmlId='testCheckbox2'
            onChange={()=>{}}
          />
          <Radio
            value='us'
            label='us'
            htmlId='testCheckbox3'
            onChange={()=>{}}
          >
            <InputHelper message={'I\'m here to help'} />
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}

**/

/**
* @name Disabled Radio
* @description Radios can be disabled by passing in the disabled prop.
*
* @category controls
* @component radio
* @section disabled
*
* @js
import { Radio } from '@collab-ui/react';

export default function DisabledRadio() {
  return (
    <Radio
      value='disabledRadio'
      label='Disabled Radio'
      htmlId='disabledRadio'
      disabled
      onChange={()=>{}}
    />
  );
}
**/

/**
* @name Checked Radio
* @description Radios can be checked by passing in the checked prop.
*
* @category controls
* @component radio
* @section checked
*
* @js
import { Radio } from '@collab-ui/react';

export default function CheckedRadio() {
  return (
    <Radio
      value='checkedRadio'
      label='Checked Radio'
      htmlId='checkedRadio'
      checked
      onChange={()=>{}}
    />
  );
}
**/

/**
* @name Nested Radio
* @description The level of nesting radios is controlled by the nestedLevel prop.  You can have up to 3 nested levels.  Ex. nestedLevel={1} nestedLevel={2} nestedLevel=[3} etc.
*
* @category controls
* @component radio
* @section nested
*
* @js
import { Radio } from '@collab-ui/react';

export default class RadioNested extends React.PureComponent {
  state = {
    value: 'parent'
  }

  render() {
    return (
      <span>
        <Radio
          value='parent'
          label='Parent Radio Example'
          htmlId='parentRadio'
          name='nestedRadios'
          checked={this.state.value === 'parent'}
          onChange={() => this.setState({ value: 'parent' })}
          key='child-0'
        />
        <Radio
          value='child1'
          label='Child Radio Nested 1 Level'
          htmlId='childRadio1'
          name='nestedRadios'
          nestedLevel={1}
          checked={this.state.value === 'child1'}
          onChange={() => this.setState({ value: 'child1' })}
          key='child-1'
        />
        <Radio
          value='child2'
          label='Child Radio Nested 2 Level'
          htmlId='childRadio2'
          name='nestedRadios'
          nestedLevel={2}
          checked={this.state.value === 'child2'}
          onChange={() => this.setState({ value: 'child2' })}
          key='child-2'
        />
        <Radio
          value='child3'
          label='Child Radio Nested 3 Level'
          htmlId='childRadio3'
          name='nestedRadios'
          nestedLevel={3}
          checked={this.state.value === 'child3'}
          onChange={() => this.setState({ value: 'child3' })}
          key='child-3'
        />
      </span>
    );
  }
}
**/

/**
* @name Normal Search Input
* @description Search inputs allow the user to input search text.
*
* @category controls
* @component search-input
* @section default
*
* @js
import { SearchInput } from '@collab-ui/react';

export default class DefaultSearchInput extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <SearchInput
          name='defaultSearchInput'
          htmlId='defaultSearchInput'
          inputSize='small-5'
        />
      </div>
    );
  }
}

**/

/**
* @name Pill Search Input
* @description To use the pill style search input, set <code>type='pill'</code>.
*
* @category controls
* @component search-input
* @section pill
*
* @js
import { SearchInput } from '@collab-ui/react';

export default class PillSearchInput extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <SearchInput
          name='pillSearchInput'
          htmlId='pillSearchInput'
          type='pill'
          inputSize='small-5'
        />
      </div>
    );
  }
}

**/

/**
* @name Default SideNav
* @description Default SideNav
*
* @category layout
* @component side-nav
* @section default
*
* @js
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'

export default class SideNavDefault extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;

    return (
      <div className='row' style={{marginBottom: '1rem'}}>
        <SideNav navSectionTitle='OVERVIEW' topMenu>
          <List>
            <ListItem label='Platform Introduction' customAnchorNode={anchorNode} />
            <ListItem label='Bots' customAnchorNode={anchorNode} />
            <ListItem label='Widgets' customAnchorNode={anchorNode} />
            <ListItem label='Integration' customAnchorNode={anchorNode} />
            <ListItem label='Guest Issuer' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
      </div>
    );
  }
}
**/

/**
* @name Expandable SideNav
* @description Side Navigation with collapse effect
*
* @category layout
* @component side-nav
* @section expand
*
* @js
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'

export default class SideNavExpand extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;

    return (
      <div className='row' style={{marginBottom: '1rem'}}>
        <SideNav navSectionTitle='Guides' expandable expanded={false}>
          <List>
            <ListItem label='Authentication' customAnchorNode={anchorNode} />
            <ListItem label='Admin API' customAnchorNode={anchorNode} />
            <ListItem label='Webhooks' customAnchorNode={anchorNode} />
            <ListItem label='Compliance' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
      </div>
    );
  }
}
**/

/**
* @name Nested Expandable SideNav
* @description Nested Side Navigation with collapse effect
*
* @category layout
* @component side-nav
* @section nested
*
* @js
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'

export default class SideNavNested extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;

    return (
      <div className='row' style={{marginBottom: '1rem'}}>
        <SideNav navSectionTitle='Reference' expandable expanded={false}>
          <List>
            <ListItem label='Admins' customAnchorNode={anchorNode} />
            <ListItem label='Devices' customAnchorNode={anchorNode} />
            <ListItem label='Licenses' customAnchorNode={anchorNode} />
            <SideNav navSectionTitle='Messages' className='cui-side-nav__reference' expandable expanded={false}>
              <List>
                <ListItem label='List Messages' customAnchorNode={anchorNode} />
                <ListItem label='Create a Messages' customAnchorNode={anchorNode} />
                <ListItem label='Get Message Details' customAnchorNode={anchorNode} />
                <ListItem label='Delete a Message' customAnchorNode={anchorNode} />
              </List>
            </SideNav>
          </List>
        </SideNav>
      </div>
    );
  }
}
**/

/**
* @name Full SideNav
* @description Full Side Navigation
*
* @category layout
* @component side-nav
* @section full
*
* @js
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'

export default class SideNavFull extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;

    return (
      <div className='row' style={{marginBottom: '1rem'}}>
        <SideNav navSectionTitle='OVERVIEW' topMenu>
          <List>
            <ListItem label='Platform Introduction' customAnchorNode={anchorNode} />
            <ListItem label='Bots' customAnchorNode={anchorNode} />
            <ListItem label='Widgets' customAnchorNode={anchorNode} />
            <ListItem label='Integration' customAnchorNode={anchorNode} />
            <ListItem label='Guest Issuer' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
        <div style={{marginBottom: '1rem'}}></div>
        <SideNav navSectionTitle='REST API' topMenu>
          <List>
            <ListItem label='Basics' customAnchorNode={anchorNode} />
            <SideNav navSectionTitle='Guides' expandable expanded={false}>
              <List className='cui-submenu'>
                <ListItem label='Authentication' customAnchorNode={anchorNode} />
                <ListItem label='Admin API' customAnchorNode={anchorNode} />
                <ListItem label='Webhooks' customAnchorNode={anchorNode} />
                <ListItem label='Compliance' customAnchorNode={anchorNode} />
                <ListItem label='Metrics and Reporting' customAnchorNode={anchorNode} />
              </List>
            </SideNav>
            <SideNav navSectionTitle='Reference' className='cui-side-nav__reference-container' expandable expanded={false}>
              <List className='cui-submenu'>
                <SideNav navSectionTitle='Admins' />
                <SideNav navSectionTitle='Devices' />
                <SideNav navSectionTitle='Licenses' />
                <SideNav navSectionTitle='Memberships' />
                <SideNav navSectionTitle='Messages' className='cui-side-nav__reference'>
                  <List>
                    <ListItem label='List Messages' customAnchorNode={anchorNode} />
                    <ListItem label='Create a Messages' customAnchorNode={anchorNode} />
                    <ListItem label='Get Message Details' customAnchorNode={anchorNode} />
                    <ListItem label='Delete a Message' customAnchorNode={anchorNode} />
                  </List>
                </SideNav>
                <SideNav navSectionTitle='Organizations' />
                <SideNav navSectionTitle='People' />
                <SideNav navSectionTitle='Policies' />
                <SideNav navSectionTitle='Roles' />
                <SideNav navSectionTitle='Rooms' />
                <SideNav navSectionTitle='Teams' />
                <SideNav navSectionTitle='Team Memberships' />
              </List>
            </SideNav>
          </List>
        </SideNav>
        <div style={{marginBottom: '1rem'}}></div>
        <SideNav navSectionTitle='SDKS' topMenu>
          <List>
            <ListItem label='iOS' customAnchorNode={anchorNode} />
            <ListItem label='Android' customAnchorNode={anchorNode} />
            <ListItem label='Widgets' customAnchorNode={anchorNode} />
            <ListItem label='Windows' customAnchorNode={anchorNode} />
            <ListItem label='Community' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
      </div>
    );
  }
}
**/

/**
* @name Default SocialList
* @description Default social list
*
* @category containers
* @component social-list
* @section default
* @react
import {
  List,
  ListItem,
  SocialList,
} from '@collab-ui/react';

export default class SocialListDefault extends React.PureComponent {
  render() {
    return (
      <SocialList>
        <List tabType='horizontal' className='social-list'>
          <ListItem>
            <i className='icon icon-facebook-circle_40' />
          </ListItem>
          <ListItem>
            <i className='icon icon-twitter-circle_40' />
          </ListItem>
          <ListItem>
            <i className='icon icon-linkedin-circle_40' />
          </ListItem>
        </List>
      </SocialList>
    );
  }
}
**/

/**
* @name Space List Meeting
*
* @category containers
* @component list-item
* @section space-meeting
*
* @js
*
import {
  Avatar,
  Icon,
  List,
  SpaceListMeeting,
} from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    return(
      <div className="medium-5 columns">
        <List style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <SpaceListMeeting
            buttonLabel='Now'
            attendees={[
              {title: 'Joe Bojangles'},
              {title: 'Joe Boe'},
              {title: 'Joe Coe'},
              {title: 'Joe Doe'},
              {title: 'Joe Foe'},
              {title: 'Joe Goe'},
              {title: 'Joe Joe'},
              {title: 'Joe Koe'},
              {title: 'Joe Loe'},
              {title: 'Joe Moe'},
              {title: 'Joe Noe'},
              {title: 'Joe Poe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            header='Attendees Prop'
            subheader='must be very long long long long long message message'
          />
          <SpaceListMeeting
            header='isBold(true)'
            subheader='subheader'
            isBold
          />
          <SpaceListMeeting
            buttonLabel='In 5 Min'
            header='MeetingType(group)'
            subheader='subheader'
            meetingType='group'
          />
          <SpaceListMeeting
            buttonLabel='2:25'
            header='MeetingType(number)'
            subheader='subheader'
            meetingType='number'
          />
          <SpaceListMeeting
            attendees={[
              {title: 'Joe Boe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            buttonLabel='30:25'
            header='MeetingType(device)'
            meetingType='device'
          />
          <SpaceListMeeting
            attendees={[
              {title: 'Joe Boe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            buttonLabel='30:25'
            header='ChildrenLeft Prop'
            childrenLeft={<Avatar icon={<Icon color='blue' name='mention_12' />} />}
          />
        </List>
      </div>
    );
  }
}
**/

/**
* @name Space List
*
* @category containers
* @component list-item
* @section space
*
* @js
*
import {
  Icon,
  List,
  ListItemHeader,
  SpaceListItem,
} from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns">
        <List style={{backgroundColor: 'black'}}>
          <SpaceListItem isOverview header='Overview Item' />
          <SpaceListItem header='Header Only'/>
          <SpaceListItem header='Bold Unread' isBold isUnread/>
          <SpaceListItem header='Bold Mentioned' isBold isMentioned/>
          <SpaceListItem header='isAlertOn' isAlertOn/>
          <SpaceListItem header='isMuted' isMuted/>
          <SpaceListItem header='Disabled' subheader='subheader' disabled/>
          <SpaceListItem header='Subheader as Node' subheader={<span style={{color: '#98D5CA'}}>Marketing</span>}/>
          <ListItemHeader header='List Header-Type(space)' children={<a>More</a>} type='space'/>
          <SpaceListItem header='Header with SearchTerm' searchTerm='search'/>
          <SpaceListItem header='Both Headers w/ SearchTerm' subheader='Searchable subheader' searchTerm='search'/>
          <SpaceListItem header='Subheader(node)-searchTerm' subheader={<span style={{color: '#D7ABE1'}}>Searching</span>} searchTerm='search'/>
          <SpaceListItem header='Type(search)' headerSecondary='16:00' subheader='HighlightColor changes search color' searchTerm='search' type='search' highlightColor='white'/>
          <SpaceListItem header='Type(filter)' headerSecondary='12/03/2018' subheader='headerSecondary=string' searchTerm='Barbara' type='filter' />
          <SpaceListItem header='Type(filter-search)' headerSecondary='12/03/2018' subheader='For search after a (filter)' type='filter-search' searchTerm='(filter)'/>
          <SpaceListItem header='Type(filter-summary) (8)' type='filter-summary' childrenLeft={<Icon name='alert_12' />}/>
          <SpaceListItem header='Type(flag)-attachments' attachments={[<span><Icon name='document_12' />  <span>Ideas.pdf</span></span>]} subheader='resultRight=node, attachments=[node]' headerSecondary='12/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
          <SpaceListItem header='Type(flag)' subheader='header&subheader=node' headerSecondary='08/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
        </List>
      </div>
    );
  }
}
**/

/**
* @name Contrast Space List
*
* @category containers
* @component list-item
* @section space-contrast
*
* @js
*
import {
  Icon,
  List,
  ListItemHeader,
  SpaceListItem,
} from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns">
        <div className="cui--contrast">
          <List style={{backgroundColor: 'black'}}>
            <SpaceListItem isOverview header='Overview Item' />
            <SpaceListItem header='Header Only'/>
            <SpaceListItem header='Bold Unread' isBold isUnread/>
            <SpaceListItem header='Bold Mentioned' isBold isMentioned/>
            <SpaceListItem header='isAlertOn' isAlertOn/>
            <SpaceListItem header='isMuted' isMuted/>
            <SpaceListItem header='Disabled' subheader='subheader' disabled/>
            <SpaceListItem header='Subheader as Node' subheader={<span style={{color: '#98D5CA'}}>Marketing</span>}/>
            <ListItemHeader header='List Header-Type(space)' children={<a>More</a>} type='space'/>
            <SpaceListItem header='Header with SearchTerm' searchTerm='search'/>
            <SpaceListItem header='Both Headers w/ SearchTerm' subheader='Searchable subheader' searchTerm='search'/>
            <SpaceListItem header='Subheader(node)-searchTerm' subheader={<span style={{color: '#D7ABE1'}}>Searching</span>} searchTerm='search'/>
            <SpaceListItem header='Type(search)' headerSecondary='16:00' subheader='HighlightColor changes search color' searchTerm='search' type='search' highlightColor='white'/>
            <SpaceListItem header='Type(filter)' headerSecondary='12/03/2018' subheader='headerSecondary=string' searchTerm='Barbara' type='filter' />
            <SpaceListItem header='Type(filter-search)' headerSecondary='12/03/2018' subheader='For search after a (filter)' type='filter-search' searchTerm='(filter)'/>
            <SpaceListItem header='Type(filter-summary) (8)' type='filter-summary' childrenLeft={<Icon name='alert_12' />}/>
            <SpaceListItem header='Type(flag)-attachments' attachments={[<span><Icon name='document_12' />  <span>Ideas.pdf</span></span>]} subheader='resultRight=node, attachments=[node]' headerSecondary='12/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
            <SpaceListItem header='Type(flag)' subheader='header&subheader=node' headerSecondary='08/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
          </List>
        </div>
      </div>
    );
  }
}
**/

/**
* @name Default Time Picker
* @description Inputs are useful.
*
* @category controls
* @component time-picker
* @section default
*
* @js

import { Input, TimePicker } from '@collab-ui/react';

export default class Default extends React.PureComponent {
  render() {
    return (
      <div>
        <div className='timePicker-container'>
          <TimePicker
            selectedTime={new Date()}
          />
        </div>
      </div>
    );
  }
}

**/

/**
* @name Military Time Picker
* @description 24HR Time Picker
*
* @category controls
* @component time-picker
* @section 24-hour
*
* @js

import { Input, TimePicker } from '@collab-ui/react';

export default class Default extends React.PureComponent {
  render() {
    return (
      <div>
        <div className='timePicker-container'>
          <TimePicker
            selectedTime={new Date()}
            militaryTime
          />
        </div>
      </div>
    );
  }
}

**/

/**
* @name Step Time Picker
* @description Step Time Picker
*
* @category controls
* @component time-picker
* @section 30-minute-step
*
* @js

import { Input, TimePicker } from '@collab-ui/react';

export default class Default extends React.PureComponent {
  render() {
    return (
      <div>
        <div className='timePicker-container'>
          <TimePicker
            minuteInterval={30}
            selectedTime={new Date()}
          />
        </div>
      </div>
    );
  }
}

**/

/**
* @name Default Toggle Switch
* @description Toggle Switches are useful.
*
* @category controls
* @component toggle-switch
* @section default
*
* @js
import { ToggleSwitch } from '@collab-ui/react';

export default class Checkbox extends React.PureComponent {
  render() {
    return (
      <ToggleSwitch
        checked={false}
        label='Toggle Switch'
        htmlId='testToggleSwitch1'
      />
    );
  }
}

*/

/**
* @name Disabled Toggle Switch
* @description Toggle Switches are useful.
*
* @category controls
* @component toggle-switch
* @section disabled
*
* @js
import { ToggleSwitch } from '@collab-ui/react';

export default function ToggleSwitch() {
  return (
    <ToggleSwitch
      disabled
      label='Toggle Switch'
      htmlId='testToggleSwitch2'
    />
  );
}

**/


/**
*
* @category communication
* @component icon
* @section default
*
* @js
*
import { Icon } from '@collab-ui/react';

export default class Default extends React.PureComponent {

  render() {
    return(
      <div>
        <Icon name='accessories_16' />
        <Icon name='accessories_20' />
        <Icon name='accessories_36' />
        <Icon name='accessories_56' />
      </div>
    );
  }
}
**/

/**
*
* @category communication
* @component icon
* @section color
*
* @js
*
import { Icon } from '@collab-ui/react';

export default class Default extends React.PureComponent {

  render() {
    return(
      <div>
        <Icon name='accessories_16' color='blue' />
        <Icon name='accessories_20' color='blue' />
        <Icon name='accessories_36' color='blue' />
        <Icon name='accessories_56' color='blue' />
      </div>
    );
  }
}
**/

/**
*
* @category communication
* @component icon
* @section click
*
* @js
*
import { Icon } from '@collab-ui/react';

export default class Default extends React.PureComponent {

  render() {
    return(
      <div>
        <Icon name='accessories_16' color='blue' ariaLabel='Accessories' onClick={() => console.log('Icon 16 - clicked')} />
        <Icon name='accessories_20' color='blue' ariaLabel='Accessories' onClick={() => console.log('Icon 20 - clicked')} />
        <Icon name='accessories_36' color='blue' ariaLabel='Accessories' onClick={() => console.log('Icon 36 - clicked')} />
        <Icon name='accessories_56' color='blue' ariaLabel='Accessories' onClick={() => console.log('Icon 56 - clicked')} />
      </div>
    );
  }
}
**/

/**
*
* @category communication
* @component icon
* @section type
*
* @js
*
import { Icon } from '@collab-ui/react';

export default class Default extends React.PureComponent {

  render() {
    return(
      <div>
        <div className='row'>
          <div>Default</div>
          <div style={{padding: '5px'}}>
            <Icon name='clear-active_24' ariaLabel='Clear' onClick={() => console.log('Icon 20 - clicked')} />
          </div>
        </div>
        <div className='row'>
          <div>Type(white)</div>
          <div style={{ backgroundColor: 'black', padding: '5px', width: 'fit-content'}}>
            <Icon name='clear-active_24' ariaLabel='Clear' type='white' onClick={() => console.log('Icon 36 - clicked')} />
          </div>
        </div>
      </div>
    );
  }
}
**/

/**
* @name Default Select
* @description Selects can be used for single or multi-select
*
* @category controls
* @component select
* @section default
*
* @js
import { Select, SelectOption } from '@collab-ui/react';

export default class DefaultSelect extends React.PureComponent {
  render() {
    return (
      <div className="medium-6 columns">
        <Select defaultValue='Select Item Here' >
          <SelectOption value='test1' label='test1' />
          <SelectOption value='test2' label='test2' />
          <SelectOption value='test3' label='test3' />
          <SelectOption value='test4' label='test4' />
        </Select>
      </div>
    );
  }
}

**/

/**
* @name Multi-Select
* @description Selects can be used for multi-select
*
* @category controls
* @component select
* @section multi-select
*
* @js
import { Select, SelectOption } from '@collab-ui/react';

export default class DefaultSelect extends React.PureComponent {
  render() {
    return (
      <div className="medium-6 columns">
        <Select isMulti defaultValue='Select Item Here' >
          <SelectOption value='test1' label='test1' />
          <SelectOption value='test2' label='test2' />
          <SelectOption value='test3' label='test3' />
          <SelectOption value='test4' label='test4' />
        </Select>
      </div>
    );
  }
}

**/

/**
* @name Disabled
* @description Selects can be disabled
*
* @category controls
* @component select
* @section disabled
*
* @js
import { Select, SelectOption } from '@collab-ui/react';

export default class DisabledSelect extends React.PureComponent {
  render() {
    return (
      <div className="medium-6 columns">
        <Select defaultValue='Select Item Here' disabled>
          <SelectOption value='test1' label='test1' />
          <SelectOption value='test2' label='test2' />
          <SelectOption value='test3' label='test3' />
          <SelectOption value='test4' label='test4' />
        </Select>
      </div>
    );
  }
}

**/

/**
* @name Default Slider
* @description Sliders with range mentioned.
*
* @category controls
* @component slider
* @section default
*
* @js
import { Slider } from '@collab-ui/react';

export default class DefaultSlider extends React.Component {
  state = {
    slider1: {low: 100, high: 200},
    slider2: {low: 100, high: 200}
  }
  render() {
    return (
      <span>
        <div className="row" key='child-0'>
          <div>Low: {this.state.slider1.low} High: {this.state.slider1.high}</div>
          <Slider
            min={0}
            max={500}
            tick={100}
            value={this.state.slider1}
            step={1}
            onChange={value => this.setState({ slider1: value })}
          />
        </div>
        <br key='child-1'/>
        <div className="row" key='child-2'>
          <div>Low: {this.state.slider2.low} High: {this.state.slider2.high} (canCross prop = true)</div>
          <Slider
            min={0}
            max={500}
            tick={100}
            value={this.state.slider2}
            step={1}
            canCross
            onChange={value => this.setState({slider2: value})}
          />
        </div>
      </span>
    );
  }
}
**/

/**
* @name Slider with one pointer
* @description Sliders with one pointer.
*
* @category controls
* @component slider
* @section single-pointer
*
* @js
import { Slider } from '@collab-ui/react';

export default class SliderOnePointer extends React.Component {
  render() {
    return (
      <Slider
        min={0}
        max={500}
        tick={100}
        value={200}
        step={1}
      />
    );
  }
}
**/

/**
* @name Tabs Pills
*
* @category layout
* @component tabs
* @section horizontal-pills
*
* @js

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
**/

/**
* @name Tabs Pills (Justified)
*
* @category layout
* @component tabs
* @section horizontal-pills-justified
*
* @js

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
        <Tabs justified>
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
**/

/**
* @name Popover Default
*
* @category communication
* @component popover
* @section default
*
* @js
import {
  Button,
  Popover,
} from '@collab-ui/react';

 export default function Default() {

  const content = (
    <span key="1" style={{ padding: '10px' }}>Popover Top</span>
  );

  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(top-center)</code></p>
          <p><code className="small">{'targetOffset=({vertical: 10})'}</code></p>
        </h3>
        <Popover content={content} direction={'top-center'} targetOffset={{vertical: 10}}>
          <Button children='Hover' ariaLabel='Hover' />
        </Popover>

      </div>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">delay=(500)</code></p>
          <p><code className="small">direction=(top-center)</code></p>
        </h3>
        <Popover content={content} delay={500} direction={'top-center'}>
          <Button children='Hover with Delay' ariaLabel='Hover with Delay' />
        </Popover>

      </div>
    </div>
  );
}
**/

/**
* @name Popover on Click
*
* @category communication
* @component popover
* @section onclick
*
* @js

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
**/

/**
* @name Popover on Focus
*
* @category communication
* @component popover
* @section onfocus
*
* @js

 import {
  Button,
  Popover
} from '@collab-ui/react';

 export default function PopOverFocus() {

  const contentLeft = (
    <span key="1" style={{ padding: '10px'}}>Popover Left</span>
  );

  const contentRight = (
    <span key="1" style={{ padding: '10px'}}>Popover Right</span>
  );

  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(right-center)</code></p>
          <p><code className="small">popoverTrigger=(Focus)</code></p>
        </h3>
        <Popover
          content={contentRight}
          direction={'right-center'}
          popoverTrigger={'Focus'}
        >
          <Button
            children='Focus Right'
            ariaLabel='Focus Right'
          />
        </Popover>

      </div>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(left-center)</code></p>
          <p><code className="small">popoverTrigger=(Focus)</code></p>
        </h3>
        <Popover
          content={contentLeft}
          direction={'left-center'}
          popoverTrigger={'Focus'}
        >
          <Button
            children='Focus Left'
            ariaLabel='Focus Left'
          />
        </Popover>

      </div>
    </div>
  );
}
**/

/**
* @name Popover with Size Constraints
*
* @category communication
* @component popover
* @section sizing
*
* @js

 import {
  Button,
  Popover
} from '@collab-ui/react';

 export default function Default() {

  const medium = (
    <span key="1" style={{ height: '1800px' }}>Popover(height: 1800px)</span>
  );

  const short = (
    <span key="1" style={{ height: '500px' }}>Popover(height: 500px)</span>
  );

  const tall = (
    <span key="1" style={{ height: '3000px' }}>Popover(height: 3000px)</span>
  );

  const wide = (
    <span key="1" style={{ height: '1900px', width: '1600px' }}>Popover(height: 1900px, width: 1600px)</span>
  );

  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(top-center)</code></p>
          <p><code className="small">isContained=(true)</code></p>
          <p><code className="small">popoverTrigger=(Click)</code></p>
        </h3>
        <Popover
          isContained
          content={tall}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Tall-NoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          showArrow={false}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Tall-NoArrow' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          showArrow={false}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Tall-NoArrowNoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Wide' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={short}
          direction={'top-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Short' ariaLabel='Click' />
        </Popover>

      </div>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(right-center)</code></p>
          <p><code className="small">isContained=(true)</code></p>
          <p><code className="small">popoverTrigger=(Click)</code></p>
        </h3>
        <Popover
          isContained
          content={wide}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'right-center'}
          popoverTrigger={'Click'}
        >
          <Button children='Wide-NoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          showArrow={false}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Wide-NoArrow' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          showArrow={false}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Wide-NoArrowNoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Wide' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          direction={'right-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>

      </div>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(left-center)</code></p>
          <p><code className="small">isContained=(true)</code></p>
          <p><code className="small">popoverTrigger=(Click)</code></p>
        </h3>
        <Popover
          isContained
          content={wide}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'left-center'}
          popoverTrigger={'Click'}
        >
          <Button children='Wide-NoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          showArrow={false}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Wide-NoArrow' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          showArrow={false}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Wide-NoArrowNoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Wide' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          direction={'left-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30, horizontal: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>

      </div>
      <div className="docs-example docs-example--spacing">

         <h3>
          Props
          <p><code className="small">direction=(bottom-center)</code></p>
          <p><code className="small">isContained=(true)</code></p>
          <p><code className="small">popoverTrigger=(Click)</code></p>
        </h3>
        <Popover
          isContained
          content={tall}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Tall' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Tall-NoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          showArrow={false}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Tall-NoArrow' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={tall}
          showArrow={false}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 0 }}
        >
          <Button children='Tall-NoArrowNoOffset' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={wide}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Wide' ariaLabel='Click' />
        </Popover>
        <Popover
          isContained
          content={short}
          direction={'bottom-center'}
          popoverTrigger={'Click'}
          targetOffset={{ vertical: 30 }}
        >
          <Button children='Short' ariaLabel='Click' />
        </Popover>

      </div>


      <h3>Overflow Container</h3>
      <div
        className="docs-example docs-example--spacing"
        style={{
          border: '2px solid #666666',
          width: '100%',
          height: '500px',
          overflow: 'scroll',
          padding: '125px'
        }}
      >
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(top-center)</code></p>
            <p><code className="small">isContained=(true)</code></p>
            <p><code className="small">checkOverflow=(true)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Tall-NoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            showArrow={false}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Tall-NoArrow' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            showArrow={false}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Tall-NoArrowNoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Wide' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={short}
            direction={'top-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Short' ariaLabel='Click' />
          </Popover>

        </div>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(right-center)</code></p>
            <p><code className="small">isContained=(true)</code></p>
            <p><code className="small">checkOverflow=(true)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'right-center'}
            popoverTrigger={'Click'}
          >
            <Button children='Wide-NoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            showArrow={false}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Wide-NoArrow' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            showArrow={false}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Wide-NoArrowNoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Wide' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'right-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>

        </div>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(left-center)</code></p>
            <p><code className="small">isContained=(true)</code></p>
            <p><code className="small">checkOverflow=(true)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'left-center'}
            popoverTrigger={'Click'}
          >
            <Button children='Wide-NoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            showArrow={false}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Wide-NoArrow' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            showArrow={false}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Wide-NoArrowNoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Wide' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'left-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30, horizontal: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>

        </div>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">isContained=(true)</code></p>
            <p><code className="small">checkOverflow=(true)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Tall' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Tall-NoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            showArrow={false}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Tall-NoArrow' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={tall}
            showArrow={false}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 0 }}
          >
            <Button children='Tall-NoArrowNoOffset' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={wide}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Wide' ariaLabel='Click' />
          </Popover>
          <Popover
            isContained
            checkOverflow
            content={short}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
            targetOffset={{ vertical: 30 }}
          >
            <Button children='Short' ariaLabel='Click' />
          </Popover>

        </div>
      </div>
    </div>
  );
}
**/

/**
* @name Tooltip Default
*
* @category communication
* @component tooltip
* @section default
*
* @js
import {
  Button,
  Tooltip,
} from '@collab-ui/react';

export default function TooltipDefault() {
  return (
    <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(top-center)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            direction='top-center'
          >
            <Button
              children='Hover Top'
              ariaLabel='Hover Top'
            />
          </Tooltip>
        </div>
     </div>
   );
 }

**/

/**
* @name Tooltip Bottom
*
* @category communication
* @component tooltip
* @section positional
*
* @js

 import {
   Button,
   Tooltip,
 } from '@collab-ui/react';

 export default function TooltipDefault() {
   return (
     <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">tooltipTrigger=(Focus)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            direction='bottom-center'
            tooltipTrigger='Focus'
          >
            <Button
              children='Focus Bottom'
              ariaLabel='Focus Bottom'
            />
          </Tooltip>

        </div>
     </div>
   );
 }

**/

/**
* @name Tooltip Click
*
* @category communication
* @component tooltip
* @section trigger
*
* @js
 import {
   Button,
   Tooltip,
 } from '@collab-ui/react';

 export default function TooltipDefault() {
   return (
     <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">width=(500)</code></p>
            <p><code className="small">tooltipTrigger=(Click)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            tooltipTrigger='Click'
            width={500}
          >
            <Button
              children='Click to Trigger'
              ariaLabel='Click to Trigger'
            />
          </Tooltip>

        </div>
     </div>
   );
 }

**/
