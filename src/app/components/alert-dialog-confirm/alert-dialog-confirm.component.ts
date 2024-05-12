import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-alert-dialog-confirm',
  standalone: true,
  imports: [MatIcon, MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './alert-dialog-confirm.component.html',
  styleUrls: ['./alert-dialog-confirm.component.scss']
})
export class AlertDialogConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      subtitle: string,
      message: string,
      cancelText: string,
      confirmText: string,
      icon: string,
      iconColor: string,
      confirmAction?: () => void
    }
  ) { }

  closeDialog(): void {
    this.dialogRef.close(false); // Close without confirmation
  }

  confirmAction(): void {
    if (this.data.confirmAction) {
      this.data.confirmAction(); // Execute provided action
    }
    this.dialogRef.close(true); // Close with confirmation
  }
}
