import React from 'react';
import { Breadcrumbs } from '@collab-ui/react';

export default function DefaultBreadCrumbs() {
    return (
      <div className='row'>
        <div className='columns small-12'>
          <Breadcrumbs>
            <li href='javascript:void(0)'>
              Default
            </li>
          </Breadcrumbs>
        </div>
        <div className='columns small-12'>
          <Breadcrumbs>
            <li href='javascript:void(0)'>
              Default
            </li>
            <li href='javascript:void(0)'>
              Default2
            </li>
          </Breadcrumbs>
        </div>
        <div className='columns small-12'>
          <Breadcrumbs>
            <li href='javascript:void(0)'>
              Default
            </li>
            <li href='javascript:void(0)'>
              Default2
            </li>
            <li href='javascript:void(0)'>
              Default3
            </li>
          </Breadcrumbs>
        </div>
      </div>
    );
  }
