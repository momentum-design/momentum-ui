import React from 'react';
import { ContentItem } from '@momentum-ui/react';

export default class ContentItemWidthHeight extends React.PureComponent {
  render() {
    return (
      <div className="columns large">
        <ContentItem
          content="https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg"
          fileSize="24 KB"
          height={400}
          title="Nice seating.png"
          type="chat"
          width={300}
        />
      </div>
    );
  }
}
