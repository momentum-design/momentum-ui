import React from 'react';
import { Button, ContentItem, Icon } from '@collab-ui/react';

export default class ContentItemIcon extends React.PureComponent {
  render() {
    const handleClick = () => {
      alert('file onClick');
    };

    const folderClick = e => {
      alert('folder clicked');
      e.stopPropagation();
    };

    const downloadClick = e => {
      alert('download clicked');
      e.stopPropagation();
    };

    const actionNode = (
      <div>
        <Button
          ariaLabel="For the Win"
          circle
          onClick={folderClick}
          style={{ backgroundColor: 'black' }}
          size={32}
        >
          <Icon name="open-in-folder_14" color="white" />
        </Button>

        <Button
          ariaLabel="For the Win"
          circle
          onClick={downloadClick}
          style={{ backgroundColor: 'black' }}
          size={32}
        >
          <Icon name="icon-arrow-tail-down_14" color="white" />
        </Button>
      </div>
    );

    return (
      <div className="columns large">
        <ContentItem
          actionNode={actionNode}
          fileSize="24 KB"
          icon="icon-pdf_72"
          onClick={handleClick}
          subtitle="Barbara German, 12/05/18"
          title="Ideas.pdf"
          type="file"
        />
      </div>
    );
  }
}
