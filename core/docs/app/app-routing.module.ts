import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './core/category/category.component';
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
import { SignIn1Component } from './panels/signin1.component';
import { SignIn2Component } from './panels/signin2.component';
import { SignIn32Component } from './panels/signin3-2.component';
import { SignIn4Component } from './panels/signin4.component';
import { SignUp1Component } from './panels/signup.1.component';
import { SignUp4Component } from './panels/signup.4.component';
import { Error1Component } from './panels/error.1.component';
import { Error2Component } from './panels/error.2.component';
import { PasswordReset1Component } from './panels/password-reset.1.component';
import { PasswordReset3Component } from './panels/password-reset.3.component';
import { PasswordReset51Component } from './panels/password-reset.5-1.component';
import { PanelsComponent } from './panels/panels.component';
import { Error3Component } from './panels/error.3.component';

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
    path: 'panels',
    component: PanelsComponent,
  },
  {
    path: 'panels/signin/1',
    component: SignIn1Component,
  },
  {
    path: 'panels/signin/2',
    component: SignIn2Component,
  },
  {
    path: 'panels/signin/3-2',
    component: SignIn32Component,
  },
  {
    path: 'panels/signin/4',
    component: SignIn4Component,
  },
  {
    path: 'panels/signup/1',
    component: SignUp1Component,
  },
  {
    path: 'panels/signup/4',
    component: SignUp4Component,
  },
  {
    path: 'panels/error/1',
    component: Error1Component,
  },
  {
    path: 'panels/error/2',
    component: Error2Component,
  },
  {
    path: 'panels/error/404',
    component: Error3Component,
  },
  {
    path: 'panels/password-reset/1',
    component: PasswordReset1Component,
  },
  {
    path: 'panels/password-reset/3',
    component: PasswordReset3Component,
  },
  {
    path: 'panels/password-reset/5-1',
    component: PasswordReset51Component,
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
