import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { snakeCase } from '../../../lib/utils';
import AsyncComponent from '../AsyncComponent';
import KitchenSinkComponents from '../../ComponentList';

export default class KitchenSink extends React.PureComponent {
  render() {
    return (
      <>
        <h1>React Kitchen Sink</h1>
        <div className='row'>
          <Switch>
            {
              KitchenSinkComponents.map(ele=> (
                <Route
                  key={ele}
                  exact
                  path={`/${snakeCase(ele)}`}
                  render={()=> (
                    <AsyncComponent
                      loader={() => import(`../../../lib/${ele}/examples/KitchenSink.js`)}
                    />
                  )}
                />
              ))
            }
          </Switch>
        </div>
      </>
    );
  }
}
