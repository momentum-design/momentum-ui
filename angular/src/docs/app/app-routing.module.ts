import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleCheckboxKitchenSinkComponent } from '../../lib/checkbox/examples';
import { ExampleRadioKitchenSinkComponent } from '../../lib/radio/examples';
import { KitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';
import { PlaygroundComponent } from './playground/playground.component';

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
      },
      {
        path: 'radio',
        component: ExampleRadioKitchenSinkComponent,
      },
    ],
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
