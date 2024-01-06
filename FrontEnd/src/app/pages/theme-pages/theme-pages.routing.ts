import { Routes } from '@angular/router';

// theme pages
import { AppAccountSettingComponent } from './account-setting/account-setting.component';
import { AppFaqComponent } from './faq/faq.component';
import { AppPricingComponent } from './pricing/pricing.component';
import { AppTreeviewComponent } from './treeview/treeview.component';

export const ThemePagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'account-setting',
        component: AppAccountSettingComponent,
      },
      {
        path: 'faq',
        component: AppFaqComponent,
      },
      {
        path: 'pricing',
        component: AppPricingComponent,
      },
      {
        path: 'treeview',
        component: AppTreeviewComponent,
      },
    ],
  },
];
