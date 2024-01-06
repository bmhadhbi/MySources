import { Component, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [MaterialModule, FeatherModule],
  templateUrl: './purchases.component.html',
})
export class AppPurchasesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
