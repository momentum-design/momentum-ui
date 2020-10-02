import React from 'react';
import { Button } from '@momentum-ui/react';

class Icons extends React.PureComponent {

  render() {

    return (
      <div className="site-con">
        <div className="site-con site-banner-con-icons">
          <div className='site-warp fix-margin site-banner-normal'>
            <p className='site-banner-normal-title'>Icons</p>
            <div className='site-banner-share'>
              <Button
                ariaLabel='Figma'
                className='md-button--dark-gray site-banner-share_figma'
                size={52}
              >Figma</Button>
              <Button
                ariaLabel='IGithub'
                className='md-button--dark-gray site-banner-share_github'
                size={52}
              >Github</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Icons;
