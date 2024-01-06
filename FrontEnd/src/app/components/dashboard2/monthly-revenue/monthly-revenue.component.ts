import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-monthly-revenue',
  standalone: true,
  imports: [MaterialModule, FeatherModule],
  templateUrl: './monthly-revenue.component.html',
})
export class AppMonthlyRevenueComponent {}
