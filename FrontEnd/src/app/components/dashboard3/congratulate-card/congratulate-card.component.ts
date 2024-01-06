import { Component, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-congratulate-card',
  standalone: true,
  imports: [MaterialModule, FeatherModule],
  templateUrl: './congratulate-card.component.html',
})
export class AppCongratulateCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
