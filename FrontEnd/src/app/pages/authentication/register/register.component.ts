import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { AccountService } from '../../../services/account.service';
import { UserEdit } from '../../../models/user-edit.model';
import { AppDialogInfoComponent } from '../../dialogs/dialog-info.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

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
    private accountService: AccountService,
    public dialog: MatDialog) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.status != 'VALID') {
      this.openDialog('0ms', '0ms', 'Error!', 'form is not valid', 'Ok', '')
      return;
    }

    this.accountService.newUser(this.getNewUser())
      .subscribe({
        next: () => {
          this.openDialog('0ms', '0ms', 'Infos!', 'Your account has been created successfully. A confirmation mail has been sent, please validate your account', 'Ok', '')
        },
        error: error => {
          this.openDialog('0ms', '0ms', 'Error!', 'error has occurred', 'Ok', '')
        }
      });
  }

  getNewUser(): UserEdit {
    const formModel = this.form.value;
    const newUser = new UserEdit();

    newUser.userName = formModel.uname ?? '';
    newUser.fullName = formModel.name ?? '';
    newUser.email = formModel.email ?? '';
    newUser.currentPassword = formModel.password ?? '';
    newUser.newPassword = formModel.password ?? '';
    newUser.roles = ["admin"];

    return newUser;
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    header,
    message,
    okText,
    otherText
  ): void {
    this.dialog.open(AppDialogInfoComponent, {
      width: '290px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        header: header,
        message: message,
        okButtonText: okText,
        otherButtonText: otherText
      }
    });
  }
}
