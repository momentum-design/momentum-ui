import React from 'react';
import { Button, ContentItem, Icon } from '@momentum-ui/react';

export default class GifContentItem extends React.PureComponent {
  render() {
    const actionNode = (
      <div>
        <Button
          ariaLabel="Show in conversation"
          style={{ backgroundColor: 'black' }}
          circle
          size={32}
        >
          <Icon name="chat_12" color="white" />
        </Button>

        <Button
          ariaLabel="Open in folder"
          style={{ backgroundColor: 'black' }}
          circle
          size={32}
        >
          <Icon name="open-in-folder_12" color="white" />
        </Button>

        <Button
          ariaLabel="Download"
          style={{ backgroundColor: 'black' }}
          circle
          size={32}
        >
          <Icon name="icon-arrow-tail-down_12" color="white" />
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
            aspect="threeTwo"
            content="http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif"
            gifIcon="icon icon-gif_20"
            onClick={handleClick}
            subtitle="Barbara German, 4 days"
            title="Race Horse.gif"
            type="file"
          />
        </div>
        <div className="docs-example docs-example--spacing">
          <ContentItem
            aspect="sixteenNine"
            content="http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif"
            fileSize="50 KB"
            gifIcon="icon icon-gif_24"
            isProtected={true}
            title="Race Horse.gif"
            type="chat"
          />
        </div>
      </div>
    );
  }
}
