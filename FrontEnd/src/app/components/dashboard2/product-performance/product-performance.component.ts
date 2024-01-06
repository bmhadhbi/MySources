import { Component, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
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
  ApexMarkers,
} from 'ng-apexcharts';


export interface ProductChartOption {
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
  marker: ApexMarkers;
}

export interface ExpanceProductChartOption {
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
  marker: ApexMarkers;
}


export interface performanceData {
  id: number;
  imagePath: string;
  pname: string;
  category: string;
  progress: number;
  sales: number;
  status: string;
}

const ELEMENT_DATA: performanceData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/s6.jpg',
    pname: 'Gaming Console',
    category: 'Electronics',
    progress: 78.5,
    sales: 3.9,
    status: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/s9.jpg',
    pname: 'Leather Purse',
    category: 'Fashion',
    progress: 58.6,
    sales: 3.5,
    status: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/s7.jpg',
    pname: 'Red Velvate Dress',
    category: 'Womens Fashion',
    progress: 25,
    sales: 3.8,
    status: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/s4.jpg',
    pname: 'Headphone Boat',
    category: 'Electronics',
    progress: 96.3,
    sales: 3.54,
    status: 'critical',
  },
];

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-performance',
  standalone: true,
  imports: [
    NgApexchartsModule,
    MaterialModule,
    TablerIconsModule,
    CommonModule,
  ],
  templateUrl: './product-performance.component.html',
})
export class AppProductPerformanceComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public ProductChartOption!: Partial<ProductChartOption> | any;
  public ExpanceProductChartOption!: Partial<ExpanceProductChartOption> | any;
  
  displayedColumns: string[] = ['product', 'progress', 'status', 'sales'];
  dataSource = ELEMENT_DATA;

  months: month[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];

  constructor() {
    this.ProductChartOption = {
      series: [
        {
          name: 'Products Performance',
          data: [35, 60, 30, 55, 40],
          color: '#03c9d7',
        },
      ],

      chart: {
        toolbar: {
          show: false,
        },
        foreColor: '#adb0bb',
        fontFamily: "'DM Sans',sans-serif",
        type: 'line',
        height: 30,
        sparkline: {
          enabled: true,
        },
      },

      marker: {
        size: 0,
      },

      tooltip: {
        theme: 'dark',
      },

      grid: {
        show: false,
      },

      stroke: {
        show: true,
        width: 2,
        curve: 'smooth',
      },
    };

    // chart 2
    this.ExpanceProductChartOption = {
      series: [
        {
          name: 'Expence',
          data: [300, 300, 180, 320, 250, 300, 300],
          color: '#03c9d7',
        },
        {
          name: 'Budget',
          data: [60, 90, 80, 60, 70, 100, 80],
          color: '#fb9778',
        },
      ],

      chart: {
        type: 'bar',
        height: 285,
        stacked: true,
        toolbar: {
          show: false,
        },
        foreColor: '#adb0bb',
        fontFamily: 'DM sans',
        sparkline: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      marker: {
        size: 0,
      },
      fill: {
        type: 'solid',
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '35%',
          borderRadius: 9,
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: 'category',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        min: 100,
        max: 400,
        tickAmount: 3,
      },

      stroke: {
        show: true,
        width: 2,
        curve: 'smooth',
      },
    };
   }
}
