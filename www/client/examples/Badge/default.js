import React from 'react';
import { Badge } from '@collab-ui/react';
export default function BadgeDefault() {
    return (
      <div className="row">
        <div className="example-spacing">
          <Badge>
            <div>Default</div>
          </Badge>
          <br />
          <Badge color="blue">
            <div>Blue</div>
          </Badge>
          <br />
          <Badge color="red">
            <div>Red</div>
          </Badge>
          <br />
          <Badge color="yellow">
            <div>Yellow</div>
          </Badge>
          <br />
          <Badge color="green">
            <div>Green</div>
          </Badge>
          <br />
          <Badge color="mint">
            <div>Mint</div>
          </Badge>
          <br />
          <Badge color="pastel">
            <div>Default</div>
          </Badge>
          <br />
          <Badge color="blue-pastel">
            <div>Blue</div>
          </Badge>
          <br />
          <Badge color="red-pastel">
            <div>Red</div>
          </Badge>
          <br />
          <Badge color="yellow-pastel">
            <div>Yellow</div>
          </Badge>
          <br />
          <Badge color="green-pastel">
            <div>Green</div>
          </Badge>
          <br />
          <Badge color="mint-pastel">
            <div>Mint</div>
          </Badge>
        </div>
      </div>
    );
  }