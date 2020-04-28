import React from 'react';
import { Button, ContentItem, Icon } from '@momentum-ui/react';

export default class ChatContentItem extends React.PureComponent {
  render() {
    const actionNode = (
      <div>
        <Button
          ariaLabel="Open in folder"
          style={{ backgroundColor: 'black' }}
          circle
          size={32}
        >
          <Icon name="open-in-folder_14" color="white" />
        </Button>

        <Button
          ariaLabel="Download"
          style={{ backgroundColor: 'black' }}
          circle
          size={32}
        >
          <Icon name="icon-arrow-tail-down_14" color="white" />
        </Button>
      </div>
    );

    const handleClick = () => {
      alert('Image onClick');
    };

    return (
      <div className="columns large">
        <div className="docs-example docs-example--spacing">
          <ContentItem
            actionNode={actionNode}
            aspect="sixteenNine"
            content="https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg"
            fileSize="24 KB"
            onClick={handleClick}
            type="chat"
            title="Screen Shot 208-11-07 at 10.30.02 AM.png"
          />
        </div>

        <div className="docs-example docs-example--spacing">
          <ContentItem
            aspect="sixteenNine"
            content="https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg"
            fileSize="24 KB"
            isProtected={true}
            onClick={handleClick}
            title="Nice seating.png"
            type="chat"
          />
        </div>
      </div>
    );
  }
}
