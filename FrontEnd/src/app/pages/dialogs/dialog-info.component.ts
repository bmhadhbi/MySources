import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'dialog-info',
    templateUrl: 'dialog-info.component.html',
})
export class AppDialogInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
