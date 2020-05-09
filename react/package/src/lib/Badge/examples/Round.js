import React from 'react';
import { Badge } from '@momentum-ui/react';
export default function BadgeRound() {
    return (
      <div className="row">
        <div className="example-spacing">
          <Badge rounded>
            <div>Default</div>
          </Badge>
          <br />
          <Badge rounded color="blue">
            <div>Blue</div>
          </Badge>
          <br />
          <Badge rounded color="red">
            <div>Red</div>
          </Badge>
          <br />
          <Badge rounded color="yellow">
            <div>Yellow</div>
          </Badge>
          <br />
          <Badge rounded color="green">
            <div>Green</div>
          </Badge>
          <br />
          <Badge rounded color="mint">
            <div>Mint</div>
          </Badge>
          <br />
          <Badge rounded color="pastel">
            <div>Default</div>
          </Badge>
          <br />
          <Badge rounded color="blue-pastel">
            <div>Blue</div>
          </Badge>
          <br />
          <Badge rounded color="red-pastel">
            <div>Red</div>
          </Badge>
          <br />
          <Badge rounded color="yellow-pastel">
            <div>Yellow</div>
          </Badge>
          <br />
          <Badge rounded color="green-pastel">
            <div>Green</div>
          </Badge>
          <br />
          <Badge rounded color="mint-pastel">
            <div>Mint</div>
          </Badge>
        </div>
      </div>
    );
  }
