import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  {
    path: 'playground',
    component: PlaygroundComponent,
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
