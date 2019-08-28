import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';
import { KitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';
import { ExampleCheckboxKitchenSinkComponent } from '../../lib/checkbox/examples';

const routes: Routes = [
  {
    path: 'playground',
    component: PlaygroundComponent,
  },
  {
    path: 'kitchen-sink',
    component: KitchenSinkComponent,
    children: [
      {
        path: 'checkbox',
        component: ExampleCheckboxKitchenSinkComponent,
      }
    ]
  },
  {
    path: '**',
    component: PlaygroundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
