import React from 'react';
import { ContentItem } from '@collab-ui/react';
 export default class FileContentItem extends React.PureComponent {
  render() {
    return(
    <div className='columns large'>
      <ContentItem
        failed={true}
        fileSize='24 KB'
        onDownload={this.alertSomething}
        title='Nice seating.png'
        type='chat'
        showInFolder={this.showInFolder} />
    </div>
    );
  }
}