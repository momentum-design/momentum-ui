import React from 'react';
import { ContentItem } from '@collab-ui/react';

export default class ContentItemFailed extends React.PureComponent {
  render() {
    return (
      <div className="columns large">
        <ContentItem
          failedText="Failed to load  preview. Tap to download the file."
          fileSize="24 KB"
          onDownload={this.alertSomething}
          title="Nice seating.png"
          type="chat"
          showInFolder={this.showInFolder}
        />
      </div>
    );
  }
}
