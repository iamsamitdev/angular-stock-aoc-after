import { Component, OnInit, Inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { 
  MatDialogRef, 
  MAT_DIALOG_DATA, 
  MatDialogTitle, 
  MatDialogContent, 
  MatDialogActions 
} from '@angular/material/dialog'

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrl: './alert-dialog.component.scss',
    standalone: true,
    imports: [
      MatIcon, 
      MatDialogTitle, 
      MatDialogContent, 
      MatDialogActions, 
      MatButton
    ]
})
export class AlertDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close(null)
  }

}
