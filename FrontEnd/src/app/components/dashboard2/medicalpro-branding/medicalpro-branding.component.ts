import { Component } from '@angular/core';

import { MaterialModule } from '../../../material.module';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-medicalpro-branding',
  standalone: true,
  imports: [MaterialModule, FeatherModule],
  templateUrl: './medicalpro-branding.component.html',
})
export class AppMedicalproBrandingComponent {

  constructor() {
  }
}
