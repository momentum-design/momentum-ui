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
      failed,
      fileSize,
      icon,
      isProtected,
      loading,
      style,
      subtitle,
      title,
      type,
      ...otherProps
    } = this.props;

    const chosenItem = () => {

      if(failed && type==='chat') {
        return (
          <div className={
            'cui-content cui-content--failed' +
            `${(className && ` ${className}`) || ''}`
          }>
            <div className="cui-content--failed-container">
              <i className='icon icon-warning_28 cui-content--failed-warning'/>
              <p className='cui-content--failed-message'> Failed to load  preview. Tap to download the file. </p>
            </div>
          </div>
        );
      } else if (type==='chat'){
        return (
          <ChatContentItem
            actionNode={actionNode}
            aspect={aspect}
            className={className}
            content={content}
            fileSize={fileSize}
            isProtected={isProtected}
            loading={loading}
            style={style}
            title={title}
            type={type}
            {...otherProps} />
        );
      } else if (type==='file' && !icon){
        return (
          <FileContentItem
            actionNode={actionNode}
            aspect={aspect}
            className={className}
            content={content}
            icon={icon}
            isProtected={isProtected}
            loading={loading}
            subtitle={subtitle}
            title={title}
            type={type}
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
  failed: null,
  fileSize: '',
  icon: '',
  isProtected: false,
  loading: false,
  style: null,
  subtitle: '',
  title: '',
  type: 'chat',
};

ContentItem.propTypes = {
  actionNode: PropTypes.node,
  aspect: PropTypes.oneOf(['oneOne','tall','threeFour','wide','fourThree','nineSixteen','sixteenNine','twoThree','threeTwo']),
  className: PropTypes.string,
  content: PropTypes.string,
  failed: PropTypes.bool,
  fileSize: PropTypes.string,
  icon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(['chat', 'file']),
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

    return(
    <div className='columns large'>
      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          actionNode={actionNode}
          aspect='sixteenNine'
          content='https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          subtitle='Barbara German, 4 days'
          type='chat'
          fileSize='24 KB'
          title='Nice seating.png' />
      </div>

      <div className= 'docs-example docs-example--spacing'>
        <ContentItem
          aspect='sixteenNine'
          title='Nice seating.png'
          fileSize='24 KB'
          content= 'https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          isProtected={true}
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


    return(
    <div className='columns large'>
      <ContentItem
        actionNode={actionNode}
        content='https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/06/090615_IKEA_sized.jpg;w=630'
        subtitle='Barbara German, 4 days'
        type='file'
        title='Logo.pdf' />

      <ContentItem
        content='https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/06/090615_IKEA_sized.jpg;w=630'
        isProtected={true}
        subtitle='Barbara German, 4 days'
        type='file'
        title='Logo.pdf' />
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
          content= 'https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
          loading={true}
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

    const actionNode =
    (
      <div>
        <Button
          ariaLabel='For the Win'
          circle
          style={{backgroundColor:'black'}}
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

    return(
    <div className='columns large'>
      <ContentItem
        actionNode={actionNode}
        fileSize='24 KB'
        icon='icon-pdf_72'
        subtitle='Barbara German, 12/05/18'
        title='Ideas.pdf'
        type='file'/>
    </div>
    );
  }
}
**/

