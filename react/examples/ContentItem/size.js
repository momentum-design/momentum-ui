import React from 'react';
import { ContentItem } from '@collab-ui/react';
 export default class FileContentItem extends React.PureComponent {
  render() {
    return(
      <div>
        <ContentItem
          aspect='twoThree'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          type='file'
          title='2:3' />
        <ContentItem
          aspect='threeFour'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          type='file'
          title='3:4' />
        <ContentItem
          aspect='sixteenNine'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          type='file'
          title='16:9' />
        <ContentItem
          aspect='nineSixteen'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          type='file'
          title='9:16' />
        <ContentItem
          aspect='oneOne'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          type='file'
          title='1:1' />
        <ContentItem
          aspect='fourThree'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          type='file'
          title='4:3' />
        <ContentItem
          aspect='oneOne'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          title='1:1, 3:2 Container' />
        <ContentItem
          aspect='threeFour'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          title='3:4, 3:2 container' />
        <ContentItem
          aspect='twoThree'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          title='2:3, 3:2 container' />
        <ContentItem
          aspect='tall'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          title='Tall, 3:2 container' />
        <ContentItem
          aspect='wide'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          title='Wide, 16:9 container' />
        <ContentItem
          aspect='fourThree'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          title='4:3' />
        <ContentItem
          aspect='threeTwo'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          title='3:2' />
        <ContentItem
          aspect='sixteenNine'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          title='16:9' />
      </div>
    );
  }
}