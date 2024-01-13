import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { AccountService } from '../../../services/account.service';
import { UserEdit } from '../../../models/user-edit.model';
import { Utilities } from '../../../services/utilities';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf, FeatherModule],
  templateUrl: './reset-password.component.html',
})
export class AppResetComponent {
  options = this.settings.getOptions();
  resetCode: string;
  constructor(
    private route: ActivatedRoute,
    private settings: CoreService,
    private router: Router,
    private accountService: AccountService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const loweredParams: any = Utilities.GetObjectWithLoweredPropertyNames(params);
      this.resetCode = loweredParams.code;

      this.resetCode = loweredParams.code;

      if (!this.resetCode) {
        this.router.navigate(['/authentication/login']);
      }
    });
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.status != 'VALID') {
      // Causes validation to update.
      alert('form is not valid');
      return;
    }

     
      //this.alertService.startLoadingMessage('', 'Resetting password...');
    const formModel = this.form.value;
    this.accountService.resetPassword(formModel.email??'', formModel.password??'', this.resetCode)
      .subscribe({ next: _ => { alert('Your password was successfully reset');  } , error: error => alert('An error was occured') });

  }

  getNewUser(): UserEdit {
    const formModel = this.form.value;
    const newUser = new UserEdit();

    newUser.email = formModel.email ?? '';
    newUser.currentPassword = formModel.password ?? '';
    newUser.newPassword = formModel.password ?? '';
    newUser.roles = ["admin"];

    return newUser;
  }
}
