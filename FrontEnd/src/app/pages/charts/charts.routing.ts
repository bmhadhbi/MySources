import { Routes } from '@angular/router';

// components
import { AppAreaChartComponent } from './area/area.component';
import { AppCandlestickChartComponent } from './candlestick/candlestick.component';
import { AppColumnChartComponent } from './column/column.component';
import { AppDoughnutpieChartComponent } from './doughnut-pie/doughnut-pie.component';
import { AppGredientChartComponent } from './gredient/gredient.component';
import { AppLineChartComponent } from './line/line.component';
import { AppRadialRadarChartComponent } from './radial-radar/radial-radar.component';

export const ChartsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'area',
        component: AppAreaChartComponent,
      },
      {
        path: 'candlestick',
        component: AppCandlestickChartComponent,
      },
      {
        path: 'column',
        component: AppColumnChartComponent,
      },
      {
        path: 'doughnut-pie',
        component: AppDoughnutpieChartComponent,
      },
      {
        path: 'gredient',
        component: AppGredientChartComponent,
      },
      {
        path: 'line',
        component: AppLineChartComponent,
      },
      {
        path: 'radial-radar',
        component: AppRadialRadarChartComponent,
      },
    ],
  },
];
