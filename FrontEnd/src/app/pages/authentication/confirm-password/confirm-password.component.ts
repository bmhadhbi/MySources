import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { AccountService } from '../../../services/account.service';
import { Utilities } from '../../../services/utilities';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf, FeatherModule],
  templateUrl: './confirm-password.component.html',
})
export class AppConfirmComponent {
  options = this.settings.getOptions();
  message: string;
  constructor(
    private settings: CoreService,
    private route: ActivatedRoute,
    private accountService: AccountService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const loweredParams: any = Utilities.GetObjectWithLoweredPropertyNames(params);
      const userId = loweredParams.hight;
      const code = loweredParams.low;

      //if (!userId || !code) {
      //  alert(userId + ' ' + code);
      //  //this.router.navigate(['/authentication/login']);
      //} else {
      this.confirmEmail(userId, code);
      //}
    });
  }

  confirmEmail(userId: string, code: string) {
    //this.alertService.startLoadingMessage('', 'Confirming account email...');
    this.accountService.confirmUserAccount(userId, code)
      .subscribe({
        next: _ => this.message = "Your account has been confirmed. You can log in by back to login page",
        error: error => this.message = "We were unable to confirm the email for user"
      });
  }
}
