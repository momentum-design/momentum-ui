import React from 'react';
import {
  SliderCross,
  SliderDefault,
  SliderTwoHandles,
  SliderStep
} from './index';
import { Slider } from '@momentum-ui/react';
export default class SliderKitchenSink extends React.Component {
  render() {
    return (
      <div className='medium-6 columns'>
        <div>
          <Slider
            min={0}
            max={100}
            value={{
              low: 20,
              high: 40
            }}
          />
        </div>
        <br/>
        <SliderCross />
        <br/>
        <SliderDefault />
        <br/>
        <SliderTwoHandles />
        <br/>
        <SliderStep />
      </div>
    );
  }
}
