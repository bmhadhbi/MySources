import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FeatherModule } from 'angular-feather';

export interface TotalSaleChartOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
}

@Component({
  selector: 'app-total-sales',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule, FeatherModule],
  templateUrl: './total-sales.component.html',
})
export class AppTotalSalesComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public TotalSaleChartOption!: Partial<TotalSaleChartOption> | any;

  constructor() {
    this.TotalSaleChartOption = {
      series: [25, 35, 35],
      chart: {
        toolbar: {
          show: false,
        },
        foreColor: '#adb0bb',
        fontFamily: "'DM Sans',sans-serif",
        type: 'donut',
        height: 280,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
      labels: ['2021', '2022', '2023'],
      colors: ['#03c9d7', '#fb9778', '#ecf0f2'],
      stroke: {
        colors: ['transparent'],
      },
      plotOptions: {
        pie: {
          donut: {
            size: '78%',
            background: 'transparent',
            labels: {
              show: false,
              name: {
                show: true,
                fontSize: '18px',
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
              total: {
                show: false,
                label: 'Our Visitors',
                color: '#98aab4',
              },
            },
          },
        },
      },
    };
  }
}
