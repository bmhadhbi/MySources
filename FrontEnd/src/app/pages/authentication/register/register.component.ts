import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { AccountService } from '../../../services/account.service';
import { UserEdit } from '../../../models/user-edit.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf, FeatherModule],
  templateUrl: './register.component.html',
})
export class AppRegisterComponent {
  options = this.settings.getOptions();

  constructor(
    private settings: CoreService,
    private router: Router,
    private accountService: AccountService) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    if (this.form.status != 'VALID') {
      // Causes validation to update.
      alert('form is not valid');
      return;
    }

    this.accountService.newUser(this.getNewUser())
      .subscribe({
        next: () => { alert('Your account has benn created successfully. a confirmation mail has been sent, please use it to validate your account'); },
        error: error => {
          console.log(error)
          alert("error has occured");
        }
      });
  }

  getNewUser(): UserEdit {
    const formModel = this.form.value;
    const newUser = new UserEdit();

    newUser.userName = formModel.uname ?? '';
    newUser.email = formModel.email ?? '';
    newUser.currentPassword = formModel.password ?? '';
    newUser.newPassword = formModel.password ?? '';
    newUser.roles = ["admin"];


    return newUser;
  }
}
