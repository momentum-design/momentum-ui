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
          circle
          style={{backgroundColor:'black'}}
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
      <ContentItem
        actionNode={actionNode}
        fileSize='24 KB'
        icon='icon-pdf_72'
        subtitle='Barbara German, 12/05/18'
        title='Ideas.pdf'
        type='file'/>
    </div>
    );
  }
}