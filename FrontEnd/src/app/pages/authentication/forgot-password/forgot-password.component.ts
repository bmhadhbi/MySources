import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
})
export class AppForgotPasswordComponent {
  options = this.settings.getOptions();

  constructor(
    private settings: CoreService,
    private accountService: AccountService,
    private router: Router) {
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {

    this.accountService.getRecoverPasswordEndpoint(this.form.value.email ?? 'bechir.mhadhbi@gmail.com')
      .subscribe({ next: () => { alert('a password initialization email has been sent to you. please look at your mail box to set a new password') }, error: error => { alert('an error has occured')} });
    //this.accountService.getRecoverPasswordEndpoint(this.form.value.email ?? 'bechir.mhadhbi@gmail.com')
    // console.log(this.form.value);
    //this.router.navigate(['/dashboards/dashboard1']);
  }
}
