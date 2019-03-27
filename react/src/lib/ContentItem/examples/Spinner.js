import React from 'react';
import { ContentItem } from '@collab-ui/react';

export default class ContentItemLoading extends React.PureComponent {
  render() {
    return (
      <div className="columns large">
        <div className="docs-example docs-example--spacing">
          <ContentItem
            aspect="threeTwo"
            content="https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg"
            loading={true}
            loadingText="Loading"
            subtitle="Barbara German, 4 days"
            type="file"
            title="Logo.pdf"
          />
        </div>

        <div className="docs-example docs-example--spacing">
          <ContentItem
            aspect="sixteenNine"
            content="https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg"
            loading={true}
            subtitle="Barbara German, 4 days"
            type="chat"
            title="Logo.pdf"
          />
        </div>

        <div className="docs-example docs-example--spacing">
          <ContentItem
            aspect="sixteenNine"
            loading={true}
            subtitle="Barbara German, 4 days"
            type="chat"
            title="Logo.pdf"
          />
        </div>
      </div>
    );
  }
}
