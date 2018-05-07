import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './core/category/category.component';
import { CategoryService } from './core/category/category.service';
import { ComponentComponent } from './core/component/component.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ChangelogComponent } from './develop/changelog/changelog.component';
import { ContributingComponent } from './develop/contributing/contributing.component';
import { GettingStartedComponent } from './develop/getting-started/getting-started.component';
import { KitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { PlaygroundComponent } from './playground/playground.component';
import { SampleContentComponent } from './sample-content/sample-content.component';
import { ColorsComponent } from './styles/colors/colors.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    children: [],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
  },
  {
    path: 'sample-content',
    component: SampleContentComponent,
  },
  {
    path: 'kitchen-sink',
    component: KitchenSinkComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'develop/changelog',
    component: ChangelogComponent,
  },
  {
    path: 'develop/contributing',
    component: ContributingComponent,
  },
  {
    path: 'develop/getting-started',
    component: GettingStartedComponent,
  },
  {
    path: 'styles/colors',
    component: ColorsComponent,
  },
  {
    path: ':category',
    component: CategoryComponent,
  },
  {
    path: ':category/:component',
    component: ComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
