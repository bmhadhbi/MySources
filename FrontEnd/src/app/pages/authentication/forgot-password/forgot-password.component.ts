import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { AccountService } from '../../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogInfoComponent } from '../../dialogs/dialog-info.component';

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
    public dialog: MatDialog) {
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.accountService.recoverPassword(this.form.value.email ?? 'bechir.mhadhbi@gmail.com')
      .subscribe({
        next: () => { this.openDialog('0ms', '0ms', 'Infos!', 'A password initialization mail has been sent to you.please look at your mail box to set a new password','Ok','') },
        error: error => { this.openDialog('0ms', '0ms','Error!','An error has occurred','Ok','') }
      });
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
