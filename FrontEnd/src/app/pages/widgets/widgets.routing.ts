import { Routes } from '@angular/router';

// widgets
import { AppBannersComponent } from './banners/banners.component';
import { AppCardsComponent } from './cards/cards.component';
import { AppChartsComponent } from './charts/charts.component';

export const WidgetsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'banners',
        component: AppBannersComponent,
      },
      {
        path: 'cards',
        component: AppCardsComponent,
      },
      {
        path: 'charts',
        component: AppChartsComponent,
      },
    ],
  },
];
