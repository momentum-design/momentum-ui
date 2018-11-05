import React from 'react';
import { Badge } from '@collab-ui/react';
export default function Types() {
    return (
      <div className='row'>
        <div className='example-spacing'>
          <p><span className='h3'>Default</span></p>
          <div>
            <Badge>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>color='blue'</code></p>
          <div>
            <Badge color='blue'>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>color='red'</code></p>
          <div>
            <Badge color='red'>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>color='yellow'</code></p>
          <div>
            <Badge color='yellow'>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>color='green'</code></p>
          <div>
            <Badge color='green'>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>color='mint'</code></p>
          <div>
            <Badge color='mint'>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Default</span><code>color='pastel'</code></p>
          <div>
            <Badge color='pastel'>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>color='blue-pastel'</code></p>
          <div>
            <Badge color='blue-pastel'>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>color='red-pastel'</code></p>
          <div>
            <Badge color='red-pastel'>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>color='yellow-pastel'</code></p>
          <div>
            <Badge color='yellow-pastel'>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>color='green-pastel'</code></p>
          <div>
            <Badge color='green-pastel'>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>color='mint-pastel'</code></p>
          <div>
            <Badge color='mint-pastel'>
              <div>Mint</div>
            </Badge>
          </div>
        </div>
      </div>
    );
  }