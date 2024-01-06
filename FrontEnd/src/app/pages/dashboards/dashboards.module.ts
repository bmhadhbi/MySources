import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardsRoutes } from './dashboards.routing';

import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';
import { AppDashboard3Component } from './dashboard3/dashboard3.component';

@NgModule({
  imports: [
    RouterModule.forChild(DashboardsRoutes),
    AppDashboard1Component,
    AppDashboard2Component,
    AppDashboard3Component
  ],
})
export class DashboardsModule {}
