import React from 'react';
import { Button, ContentItem, Icon } from '@momentum-ui/react';

export default class FileContentItem extends React.PureComponent {
  render() {
    const actionNode = (
      <div>
        <Button
          ariaLabel="For the Win"
          style={{ backgroundColor: 'black' }}
          circle
          size={32}
        >
          <Icon name="chat_12" color="white" />
        </Button>

        <Button
          ariaLabel="For the Win"
          style={{ backgroundColor: 'black' }}
          circle
          size={32}
        >
          <Icon name="open-in-folder_12" color="white" />
        </Button>

        <Button
          ariaLabel="For the Win"
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
            content="https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/06/090615_IKEA_sized.jpg;w=630"
            onClick={handleClick}
            subtitle="Barbara German, 4 days"
            title="Logo.pdf"
            type="file"
          />
        </div>

        <div className="docs-example docs-example--spacing">
          <ContentItem
            aspect="threeTwo"
            content="https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/06/090615_IKEA_sized.jpg;w=630"
            isProtected={true}
            subtitle="Barbara German, 4 days"
            title="Screen Shot 2018-10-11 at 5.22.32 PM.png"
            type="file"
          />
        </div>
      </div>
    );
  }
}
