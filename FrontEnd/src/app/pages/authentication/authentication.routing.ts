import { Routes } from '@angular/router';

import { AppErrorComponent } from './error/error.component';
import { AppMaintenanceComponent } from './maintenance/maintenance.component';
import { AppForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppLoginComponent } from './login/login.component';
import { AppRegisterComponent } from './register/register.component';
import { AppLockscreenComponent } from './lockscreen/lockscreen.component';
import { AppResetComponent } from './reset-password/reset-password.component';
import { AppConfirmComponent } from './confirm-password/confirm-password.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: AppErrorComponent,
      },
      {
        path: 'maintenance',
        component: AppMaintenanceComponent,
      },
      {
        path: 'forgot',
        component: AppForgotPasswordComponent,
      },
      {
        path: 'confirm',
        component: AppConfirmComponent,
      },
      {
        path: 'login',
        component: AppLoginComponent,
      },
      {
        path: 'register',
        component: AppRegisterComponent,
      },
      {
        path: 'lockscreen',
        component: AppLockscreenComponent,
      },
      {
        path: 'reset',
        component: AppResetComponent,
      },
    ],
  },
];
