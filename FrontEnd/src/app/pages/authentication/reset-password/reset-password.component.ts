import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { AccountService } from '../../../services/account.service';
import { Utilities } from '../../../services/utilities';
import { AppDialogInfoComponent } from '../../dialogs/dialog-info.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
    private accountService: AccountService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const loweredParams: any = Utilities.GetObjectWithLoweredPropertyNames(params);
      this.resetCode = loweredParams.low;

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
      this.openDialog('0ms', '0ms', 'Error!', 'form is not valid', 'Ok', '');
      return;
    }

    //this.alertService.startLoadingMessage('', 'Resetting password...');
    const formModel = this.form.value;
    this.accountService.resetPassword(formModel.email ?? '', formModel.password ?? '', this.resetCode)
      .subscribe({
        next: _ => {
          this.openDialog('0ms', '0ms', 'Infos!', 'Your password was successfully reset', 'Ok', '');
          this.router.navigate(['/authentication/login']);
        }, error: error => { this.openDialog('0ms', '0ms', 'Error!', 'An error was occured', 'Ok', ''); }
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
