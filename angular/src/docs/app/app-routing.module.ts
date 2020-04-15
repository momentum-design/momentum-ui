import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleDataTableComponent } from 'src/lib/data-table/examples';
import { ExampleCheckboxKitchenSinkComponent } from '../../lib/checkbox/examples';
import { ExampleInputKitchenSinkComponent } from '../../lib/input/examples';
import { ExampleRadioKitchenSinkComponent } from '../../lib/radio/examples';
import { SelectFormComponent } from '../../lib/select/examples';
import { ExampleStepperKitchenSinkComponent } from '../../lib/stepper/examples';
import { TooltipDefaultComponent } from '../../lib/tooltip/examples/tooltip-default.component';
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
        path: 'datatable',
        component: ExampleDataTableComponent,
      },
      {
        path: 'checkbox',
        component: ExampleCheckboxKitchenSinkComponent,
      },
      {
        path: 'input',
        component: ExampleInputKitchenSinkComponent,
      },
      {
        path: 'radio',
        component: ExampleRadioKitchenSinkComponent,
      },
      {
        path: 'select',
        component: SelectFormComponent,
      },
      {
        path: 'stepper',
        component: ExampleStepperKitchenSinkComponent,
      },
      {
        path: 'tooltip',
        component: TooltipDefaultComponent,
      }
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
export class AppRoutingModule { }
