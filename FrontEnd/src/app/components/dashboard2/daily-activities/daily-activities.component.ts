import { Component, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-shop-daily-activities',
  standalone: true,
  imports: [MaterialModule, FeatherModule],
  templateUrl: './daily-activities.component.html',
})
export class AppShopDailyActivitiesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
