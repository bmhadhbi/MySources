import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-social-card',
  standalone: true,
  imports: [MaterialModule, FeatherModule],
  templateUrl: './social-card.component.html',
})
export class AppSocialCardComponent {}
