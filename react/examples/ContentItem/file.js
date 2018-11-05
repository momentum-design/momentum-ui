import React from 'react';
import { 
  Button,
  ContentItem,
  Icon,
} from '@collab-ui/react';
 export default class FileContentItem extends React.PureComponent {
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
          <Icon name='chat_12' color='white' />
        </Button>
        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='open-in-folder_12' color='white' />
        </Button>
        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='icon-arrow-tail-down_12' color='white' />
        </Button>
      </div>
    )
    return(
    <div className='columns large'>
      <ContentItem
        actionNode={actionNode}
        content='https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/06/090615_IKEA_sized.jpg;w=630'
        subtitle='Barbara German, 4 days'
        type='file'
        title='Logo.pdf' />
      <ContentItem
        content='https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/06/090615_IKEA_sized.jpg;w=630'
        isProtected={true}
        subtitle='Barbara German, 4 days'
        type='file'
        title='Logo.pdf' />
    </div>
    );
  }
}