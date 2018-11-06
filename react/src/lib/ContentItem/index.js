import React from 'react';
import PropTypes from 'prop-types';
import ChatContentItem from '@collab-ui/react/ContentItem/ChatContent';
import FileContentItem from '@collab-ui/react/ContentItem/FileContent';
import IconContent from '@collab-ui/react/ContentItem/IconContent';

class ContentItem extends React.PureComponent {

  render() {
    const {
      actionNode,
      aspect,
      className,
      content,
      failedText,
      fileSize,
      height,
      icon,
      isProtected,
      loading,
      loadingText,
      style,
      subtitle,
      title,
      type,
      width,
      ...otherProps
    } = this.props;

    const findAspect = (width, height) => {

      if(width && height){

        const aspectRatioObj = {
          1 : 'oneOne',
          .75 : 'threeFour',
          .66 : 'twoThree',
          .4 : 'tall',
          4.35 : 'wide',
          1.33 : 'fourThree',
          1.5 : 'threeTwo',
          1.78 : 'sixteenNine'
        };

        const providedAspectRatio = width/height;

        const closestAspectRatio = Object.keys(aspectRatioObj).reduce((prev, curr) =>
          Math.abs(curr - providedAspectRatio) < Math.abs(prev - providedAspectRatio)
          ? curr
          : prev
        );

        return aspectRatioObj[closestAspectRatio];
      }
      return type === 'chat' ? 'sixteenNine' : 'threeTwo';
    };

    const chosenItem = () => {

      if(failedText && type==='chat') {
        return (
          <div className={
            'cui-content cui-content--failed' +
            `${(className && ` ${className}`) || ''}`
          }>
            <div className='cui-content--failed-container'>
              <i className='icon icon-warning_28 cui-content--failed-warning'/>
              <p className='cui-content--failed-message'>{failedText}</p>
            </div>
          </div>
        );
      } else if (type==='chat'){
        return (
          <ChatContentItem
            actionNode={actionNode}
            aspect={aspect ? aspect : findAspect(width,height)}
            className={className}
            content={content}
            fileSize={fileSize}
            height={height}
            isProtected={isProtected}
            loading={loading}
            style={style}
            title={title}
            type={type}
            width={width}
            {...otherProps} />
        );
      } else if (type==='file' && !icon){
        return (
          <FileContentItem
            actionNode={actionNode}
            aspect={aspect ? aspect : findAspect(width,height)}
            className={className}
            content={content}
            height={height}
            icon={icon}
            isProtected={isProtected}
            loading={loading}
            loadingText={loadingText}
            subtitle={subtitle}
            title={title}
            type={type}
            width={width}
            {...otherProps} />
        );
      } else if (icon){
        return (
          <IconContent
            actionNode={actionNode}
            className={className}
            icon={icon}
            isProtected={isProtected}
            loading={loading}
            subtitle={subtitle}
            title={title}
            {...otherProps} />
        );
      }
    };

    return (
      <div>
        {chosenItem()}
      </div>
    );
  }
}


ContentItem.displayName = 'ContentItem';

ContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: null,
  failedText: '',
  fileSize: '',
  icon: '',
  isProtected: false,
  loading: false,
  loadingText: 'Loading',
  style: null,
  subtitle: '',
  title: '',
  type: 'chat',
};

ContentItem.propTypes = {
  /** @prop Node to render buttons inside Content Item | null */
  actionNode: PropTypes.node,
  /** @prop Set the Content Item's aspect size | null */
  aspect: PropTypes.oneOf(['fourThree', 'nineSixteen', 'oneOne', 'sixteenNine', 'tall', 'threeFour', 'threeTwo', 'twoThree', 'wide']),
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Set the image/gif of the Content Item | '' */
  content: PropTypes.string,
  /** @prop Set the failed text to show when content fails to load | '' */
  failedText: PropTypes.string,
  /** @prop Show the size of the file | '' */
  fileSize: PropTypes.string,
  /** @prop Show icon at top right corner of Content Item */
  gifIcon: PropTypes.string,
  /** @prop Height of the image in px */
  height: PropTypes.number,
  /** @prop Set the type of icon to show | '' */
  icon: PropTypes.string,
  /** @prop Show visibility of action node buttons | false */
  isProtected: PropTypes.bool,
  /** @prop Show loading spinner | false */
  loading: PropTypes.bool,
  /** @prop Change loading text */
  loadingText: PropTypes.string,
  /** @prop Additional css styling applied to the button | null  */
  style: PropTypes.object,
  /** @prop Set the subtitle of the Content Item | '' */
  subtitle: PropTypes.string,
  /** @prop Set the title of the Content Item | '' */
  title: PropTypes.string,
  /** @prop Set the type of Content Item to display */
  type: PropTypes.oneOf(['chat', 'file']),
  /** @prop Width of the image in px */
  width: PropTypes.number
};


export default ContentItem;

/**
* @name Content Item with and without isProtected prop
*
* @category containers
* @component content-item
* @section default
*
* @js
*
import { Button, Icon } from '@collab-ui/react';

 export default class ChatContentItem extends React.PureComponent {

  render() {

    const actionNode =
    (
      <div>
        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
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

    const handleClick = () => {
      alert('Image onClick')
    }

    return(
    <div className='columns large'>
      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          actionNode={actionNode}
          aspect='sixteenNine'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          fileSize='24 KB'
          onClick={handleClick}
          type='chat'
          title='Nice seating.png' />
      </div>

      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          aspect='sixteenNine'
          content= 'https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          fileSize='24 KB'
          isProtected={true}
          onClick={handleClick}
          title='Nice seating.png'
          type='chat' />
      </div>

      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          aspect='sixteenNine'
          content= 'http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif'
          fileSize='50 KB'
          gifIcon='icon icon-gif_24'
          isProtected={true}
          title='Race Horse.gif'
          type='chat' />
      </div>
    </div>
    );
  }
}
**/


/**
* @name Content Item in File View with and without isProtected Prop
*
* @category containers
* @component content-item
* @section file
*
* @js
*
import { Button, Icon } from '@collab-ui/react';

 export default class FileContentItem extends React.PureComponent {

  render() {

    const actionNode =
    (
      <div>
        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='chat_12' color='white' />
        </Button>

        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='open-in-folder_12' color='white' />
        </Button>

        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='icon-arrow-tail-down_12' color='white' />
        </Button>
      </div>
    )

     const handleClick = () => {
      alert('Image onClick');
    }

    return(
    <div className='columns large'>
      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          actionNode={actionNode}
          aspect='threeTwo'
          content='https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/06/090615_IKEA_sized.jpg;w=630'
          onClick={handleClick}
          subtitle='Barbara German, 4 days'
          title='Logo.pdf'
          type='file' />
        </div>

      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          aspect='threeTwo'
          content='https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/06/090615_IKEA_sized.jpg;w=630'
          isProtected={true}
          subtitle='Barbara German, 4 days'
          title='Screen Shot 2018-10-11 at 5.22.32 PM.png'
          type='file' />
      </div>

      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          actionNode={actionNode}
          aspect='threeTwo'
          content='http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif'
          gifIcon='icon icon-gif_20'
          onClick={handleClick}
          subtitle='Barbara German, 4 days'
          title='Race Horse.gif'
          type='file' />
      </div>
    </div>
    );
  }
}

**/
/**
* @name Content Item with different size
*
* @category containers
* @component content-item
* @section size
*
* @js
*
import { Button, Icon } from '@collab-ui/react';

 export default class FileContentItem extends React.PureComponent {

  render() {
    const actionNode =
    (
      <div>
        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='chat_12' color='white' />
        </Button>

        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='open-in-folder_12' color='white' />
        </Button>

        <Button
          ariaLabel='For the Win'
          style={{backgroundColor:'black'}}
          circle
          size={32}
        >
          <Icon name='icon-arrow-tail-down_12' color='white' />
        </Button>
      </div>
    )

     const handleClick = () => {
      alert('Image onClick');
    }

    return(
      <div>
        <ContentItem
          aspect='twoThree'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          type='file'
          actionNode={actionNode}
          onClick={handleClick}
          title='2:3' />

        <ContentItem
          aspect='threeFour'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          onClick={handleClick}
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
          aspect='threeTwo'
          content='http://www.emertatmassage.com/wp-content/uploads/2014/06/img-16.jpg'
          subtitle='Barbara German, 4 days'
          type='file'
          title='3:2' />

        <ContentItem
          aspect='oneOne'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          onClick={handleClick}
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
**/

/**
* @name Content Item Loading
*
* @category containers
* @component content-item
* @section spinner
*
* @js
*

 export default class FileContentItem extends React.PureComponent {

  render() {
    return(
    <div className='columns large'>

      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          aspect='threeTwo'
          content= 'https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          loading={true}
          loadingText='Loading'
          subtitle='Barbara German, 4 days'
          type='file'
          title='Logo.pdf' />
        </div>

      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          aspect='sixteenNine'
          content= 'https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          loading={true}
          subtitle='Barbara German, 4 days'
          type='chat'
          title='Logo.pdf' />
      </div>

      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          aspect='sixteenNine'
          loading={true}
          subtitle='Barbara German, 4 days'
          type='chat'
          title='Logo.pdf' />
      </div>
    </div>
    );
  }
}
**/

/**
* @name Finding aspect with image Width and Height Prop
*
* @category containers
* @component content-item
* @section aspect
*
* @js
*

 export default class FileContentItem extends React.PureComponent {

  render() {
    return(
    <div className='columns large'>
      <ContentItem
        content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
        fileSize='24 KB'
        height={400}
        title='Nice seating.png'
        type='chat'
        width={300} />
    </div>
    );
  }
}
**/

/**
* @name Failed to Load Content
*
* @category containers
* @component content-item
* @section failed
*
* @js
*

 export default class FileContentItem extends React.PureComponent {

  render() {
    return(
    <div className='columns large'>
      <ContentItem
        failedText='Failed to load  preview. Tap to download the file.'
        fileSize='24 KB'
        onDownload={this.alertSomething}
        title='Nice seating.png'
        type='chat'
        showInFolder={this.showInFolder} />
    </div>
    );
  }
}
**/

/**
* @name Icon File View
*
* @category containers
* @component content-item
* @section icon
*
* @js
*
import { Button, Icon } from '@collab-ui/react';

 export default class FileContentItem extends React.PureComponent {

  render() {

    const handleClick = () => {
      alert('file onClick');
    }

    const folderClick = e => {
      alert('folder clicked');
      e.stopPropagation();
    }

    const downloadClick = e => {
      alert('download clicked');
      e.stopPropagation();
    }

    const actionNode =
    (
      <div>
        <Button
          ariaLabel='For the Win'
          circle
          onClick={folderClick}
          style={{backgroundColor:'black'}}
          size={32}
        >
          <Icon name='open-in-folder_14' color='white' />
        </Button>

        <Button
          ariaLabel='For the Win'
          circle
          onClick={downloadClick}
          style={{backgroundColor:'black'}}
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
        onClick={handleClick}
        subtitle='Barbara German, 12/05/18'
        title='Ideas.pdf'
        type='file'/>
    </div>
    );
  }
}
**/