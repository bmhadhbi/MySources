import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { FeatherModule } from "angular-feather"
import { AccountService } from '../../../services/account.service';
import { UserLogin } from '../../../models/user-login.model';
import { AppDialogOverviewComponent } from '../../ui-components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogInfoComponent } from '../../dialogs/dialog-info.component';
import { LocalService } from '../../../services/local-service';
import { DBkeys } from '../../../services/db-keys';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf, FeatherModule],
  templateUrl: './login.component.html',
})
export class AppLoginComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService,
    private router: Router,
    private accountService: AccountService,
    private localService: LocalService,
    public dialog: MatDialog) {
    this.localService.saveData(DBkeys.IsUserLoggedIn, "false");
    this.localService.saveData(DBkeys.CurrentUserName, '');
    this.localService.saveData(DBkeys.CurrentUser, JSON.stringify(""));
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false)
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.status != 'VALID') {
      this.openDialog('0ms', '0ms', 'form is not valid');
      return;
    }

    this.accountService.loginWithPassword(this.getUserLogin())
      .subscribe({
        next: result => {
          if (result.isAuthenticated == true) {
            this.localService.saveData(DBkeys.IsUserLoggedIn, "true");
            this.localService.saveData(DBkeys.CurrentUserName, this.form?.value?.uname ?? '');
            this.localService.saveData(DBkeys.CurrentUser, JSON.stringify(result.user));

            this.router.navigate(['/dashboards/dashboard2']);
          }
          else {
            this.localService.saveData(DBkeys.IsUserLoggedIn, "false");
            this.localService.saveData(DBkeys.CurrentUserName, '');
            this.localService.saveData(DBkeys.CurrentUser, '');
            this.openDialog('0ms', '0ms', 'login or password incorrect');
          }
        },
        error: error => {
          this.openDialog('0ms', '0ms', 'an error has occurred');
        }
      });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    message
  ): void {
    this.dialog.open(AppDialogInfoComponent, {
      width: '290px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        header: "Error!",
        message: message,
        okButtonText: "Ok",
        otherButtonText: ""
      }
    });
  }

  getUserLogin(): UserLogin {
    const formModel = this.form.value;
    return new UserLogin(formModel.uname ?? '', formModel.password ?? '', formModel.rememberMe ?? false);
  }
}
