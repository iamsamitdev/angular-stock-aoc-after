import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { MatDialog } from '@angular/material/dialog'
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component'
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardImage, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    standalone: true,
    imports: [
        MatCard,
        MatCardImage,
        MatCardHeader,
        MatCardTitle,
        FormsModule,
        ReactiveFormsModule,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatIcon,
        MatSuffix,
        MatIconButton,
        MatCardActions,
        MatButton,
    ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup

  // Variables สำหรับรับค่าจากฟอร์ม
  userData = {
    username: '',
    email: '',
    password: '',
  }

  // สำหรับซ่อนแสดง password
  hide = true

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Validate form
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  // ฟังก์ชัน Submit สำหรับ Register
  submitRegister() {
    if (this.registerForm.invalid) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'มีข้อผิดพลาด',
          icon: 'error',
          iconColor: 'red',
          subtitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        },
      })
    } else {
      this.userData.username = this.registerForm.value.username
      this.userData.email = this.registerForm.value.email
      this.userData.password = this.registerForm.value.password

      // เรียกใช้งาน Service สำหรับ Register
      this.http.Register(this.userData).subscribe({
        next: (data: any) => {
          console.log(data)
          if (data.status === 'Success') {
            this.dialog.open(AlertDialogComponent, {
              data: {
                title: 'สำเร็จ',
                icon: 'check_circle',
                iconColor: 'green',
                subtitle: 'สมัครสมาชิกสำเร็จ',
              },
            })
            this.router.navigate(['/login'])
          } else {
            this.dialog.open(AlertDialogComponent, {
              data: {
                title: 'มีข้อผิดพลาด',
                icon: 'error',
                iconColor: 'red',
                subtitle: 'มีข้อผิดพลาดในการสมัครสมาชิก',
              },
            })
          }
        },
        error: (error: any) => {
          console.log(error)
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'มีข้อผิดพลาด',
              icon: 'error',
              iconColor: 'red',
              subtitle: error.error.message,
            },
          })
        },
      })
    }
  }

  onClickCancel() {
    this.router.navigate(['/login'])
  }
}
