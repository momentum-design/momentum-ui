import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ActivityButton,
  Button,
  Icon,
  Input,
  Select,
  SelectOption,
} from '@momentum-ui/react';

const NotFoundPage = () => {
  return (
    <div className='site-con page-body-buffer'>
      <div className="site-warp site-not-found-header">
        <h1>Page not found</h1>
      </div>
      <div className="site-warp site-not-found-body">
        <div className="site-not-found-body__element-container">
          <div className="site-not-found-element-radio">
            <p>We can’t find</p>
            <div></div>
          </div>
          <NavLink to="/">
            <Button className="site-not-found-element-button--blue" color="blue">THE PAGE</Button>
          </NavLink>
          <Input
            className="site-not-found-element-input"
            placeholder="you're looking for"
            shape="pill"
            type="text"
          />
        </div>
        <div className="site-not-found-body__element-container">
          <div className="site-not-found-element-icon__container">
            <Icon className="site-not-found-element-icon" name="view-list-circle_100" />
          </div>
        </div>
        <div className="site-not-found-body__element-container">
          <Select
            className="site-not-found-element-select"
            defaultValue="To fix this, try..."
          >
            <SelectOption label="Checking that your search or url is correct"/>
            <SelectOption label="Asking a Momentum team member what’s up"/>
            <SelectOption label="Building it yourself (with our libraries) "/>
          </Select>
          <ActivityButton className="site-not-found-element-activity--meetings" type="meetings" />
          <NavLink to="/">
            <Button className="site-not-found-element-button--gray" color="dark-gray">The homepage</Button>
          </NavLink>
          <ActivityButton className="site-not-found-element-activity--camera" type="camera" />
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
