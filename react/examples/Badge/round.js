import React from 'react';
import { Badge } from '@collab-ui/react';
export default function Rounded() {
    return (
      <div className='row'>
        <div className='example-spacing'>
          <p><span className='h3'>Default</span><code>rounded</code></p>
          <div>
            <Badge rounded>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>rounded color='blue'</code></p>
          <div>
            <Badge color='blue' rounded>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>rounded color='red'</code></p>
          <div>
            <Badge color='red' rounded>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>rounded color='yellow'</code></p>
          <div>
            <Badge color='yellow' rounded>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>rounded color='green'</code></p>
          <div>
            <Badge color='green' rounded>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>rounded color='mint'</code></p>
          <div>
            <Badge color='mint' rounded>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Default</span><code>rounded color='pastel'</code></p>
          <div>
            <Badge color='pastel' rounded>
                <div>Default</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Blue</span><code>rounded color='blue-pastel'</code></p>
          <div>
            <Badge color='blue-pastel' rounded>
              <div>Blue</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Red</span><code>rounded color='red-pastel'</code></p>
          <div>
            <Badge color='red-pastel' rounded>
              <div>Red</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Yellow</span><code>rounded color='yellow-pastel'</code></p>
          <div>
            <Badge color='yellow-pastel' rounded>
              <div>Yellow</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Green</span><code>rounded color='green-pastel'</code></p>
          <div>
            <Badge color='green-pastel' rounded>
              <div>Green</div>
            </Badge>
          </div>
          <br></br>
          <p><span className='h3'>Mint</span><code>rounded color='mint-pastel'</code></p>
          <div>
            <Badge color='mint-pastel' rounded>
              <div>Mint</div>
            </Badge>
          </div>
          <br></br>
        </div>
      </div>
    );
  }