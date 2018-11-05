import React from 'react';
import { 
  Button, 
  ContentItem,
  Icon,
} from '@collab-ui/react';
 export default class ChatContentItem extends React.PureComponent {
  render() {
    const actionNode =
    (
      <div>
        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='open-in-folder_14' color='white' />
        </Button>
        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='icon-arrow-tail-down_14' color='white' />
        </Button>
      </div>
    )
    return(
    <div className='columns large'>
      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          actionNode={actionNode}
          aspect='sixteenNine'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          fileSize='24 KB'
          title='Nice seating.png' />
      </div>
      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          aspect='sixteenNine'
          title='Nice seating.png'
          fileSize='24 KB'
          content= 'https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          isProtected={true}
          type='chat' />
        </div>
    </div>
    );
  }
}