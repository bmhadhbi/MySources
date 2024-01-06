import { Component, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-total-earnings',
  standalone: true,
  imports: [MaterialModule, FeatherModule],
  templateUrl: './total-earnings.component.html',
})
export class AppTotalEarningsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
