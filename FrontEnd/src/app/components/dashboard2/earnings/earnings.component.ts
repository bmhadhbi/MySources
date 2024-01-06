import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [MaterialModule, FeatherModule],
  templateUrl: './earnings.component.html',
})
export class AppEarningsComponent {}
