import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '@collab-ui/angular';
import { SharedModule } from '../shared/shared.module';
import { Error1Component } from './error.1.component';
import { Error2Component } from './error.2.component';
import { Error3Component } from './error.3.component';
import { PanelsComponent } from './panels.component';
import { PasswordReset1Component } from './password-reset.1.component';
import { PasswordReset3Component } from './password-reset.3.component';
import { PasswordReset51Component } from './password-reset.5-1.component';
import { SignIn1Component } from './signin1.component';
import { SignIn2Component } from './signin2.component';
import { SignIn32Component } from './signin3-2.component';
import { SignIn4Component } from './signin4.component';
import { SignUp1Component } from './signup.1.component';
import { SignUp4Component } from './signup.4.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CardModule.forRoot(),
  ],
  declarations: [
    PanelsComponent,
    SignIn1Component,
    SignIn2Component,
    SignIn32Component,
    SignIn4Component,
    SignUp1Component,
    SignUp4Component,
    PasswordReset1Component,
    PasswordReset3Component,
    PasswordReset51Component,
    Error1Component,
    Error2Component,
    Error3Component,
  ],
  exports: [
  ],
})
export class PanelsModule { }
