import React from 'react';
import {
  ActivityButton,
  Button,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
} from '@momentum-ui/react';
import Bounce from './Bounce';

class NotFoundPage extends React.Component {
  constructor(props){
    super(props);
    this.elementContainer = React.createRef();
  }

  render() {
    return (
      <div className='site-con page-body-buffer' ref={this.elementContainer}>
        <div className="site-warp site-not-found-header">
          <h1>Oops!</h1>
          <p>The page you are looking for can’t be found.</p>
        </div>
        <div className="site-warp site-not-found-body">
          <Bounce className="site-not-found-element-activity--meetings" parentContainer={this.elementContainer}>
            <ActivityButton type="meetings" />
          </Bounce>
          <Bounce className="site-not-found-element-activity--camera" parentContainer={this.elementContainer}>
            <ActivityButton type="camera" />
          </Bounce>
          <Bounce className="site-not-found-element-radio" parentContainer={this.elementContainer}>
            <RadioGroup values={["does not exist"]}>
              <Radio
                value="Sorry"
                label="Sorry"
                htmlId="exampleCheckbox1"
                onChange={() => {}}
              />
              <Radio
                value="the page"
                label="the page"
                htmlId="exampleCheckbox2"
                onChange={() => {}}
              />
              <Radio
                value="you are looking for"
                label="you are looking for"
                htmlId="exampleCheckbox3"
                onChange={() => {}}
              />
              <Radio
                value="does not exist"
                label="does not exist"
                htmlId="exampleCheckbox4"
                onChange={() => {}}
              />
            </RadioGroup>
          </Bounce>
          <Bounce className="site-not-found-element-input" parentContainer={this.elementContainer}>
            <Input
              placeholder="you're looking for"
              shape="pill"
              type="text"
            />
          </Bounce>
          <Bounce className="site-not-found-element-select" parentContainer={this.elementContainer}>
            <Select
              defaultValue="Select Menu"
            >
              <SelectOption label="Sorry"/>
              <SelectOption label="the page"/>
              <SelectOption label="you are looking for"/>
              <SelectOption label="does not exist"/>
            </Select>
          </Bounce>
          <Bounce className="site-not-found-element-button--blue" parentContainer={this.elementContainer}>
            <Button color="blue">Try again</Button>
          </Bounce>
          <Bounce className="site-not-found-element-button--gray" parentContainer={this.elementContainer}>
            <Button color="dark-gray">Button</Button>
          </Bounce>

          {/* <Icon className="site-not-found-element-icon" name="view-list-circle_100" /> */}
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
