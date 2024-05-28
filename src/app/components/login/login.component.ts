import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { MatDialog } from '@angular/material/dialog'
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component'
import { AuthService } from '../../services/auth.service'
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardImage, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card'
import { Meta } from '@angular/platform-browser'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [
        MatCard,
        MatCardImage,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatIcon,
        MatSuffix,
        MatIconButton,
        MatCardActions,
        MatButton,
        ReactiveFormsModule
    ],
})
export class LoginComponent implements OnInit {
  // Form Validation
  loginForm!: FormGroup
  submitted: boolean = false

  // Variables สำหรับรับค่าจากฟอร์ม
  userData = {
    username: '',
    password: '',
  }

  // สร้างตัวแปรเก็บข้อมูลการ Login
  userLogin = {
    "username": "",
    "email": "",
    "role": "",
    "token": ""
  }

  // สำหรับซ่อนแสดง password
  hide = true

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: UserService,
    private dialog: MatDialog,
    private meta: Meta
) {}

  ngOnInit() {

    // กำหนด Meta Tag description
    this.meta.addTag({ name: 'description', content: 'Login page for Stock Management' })

    // กำหนดค่าให้กับ Form
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // iamsamit
      password: ['', [Validators.required, Validators.minLength(8)]], // Samit@1234
    })
  }

  // ฟังก์ชัน Submit สำหรับ Login
  submitLogin() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return
    } else {
      this.userData.username = this.loginForm.value.username
      this.userData.password = this.loginForm.value.password

      // เรียกใช้งาน Service สำหรับ Login
      this.http.Login(this.userData).subscribe({
        
        next: (data: any) => {
          if (data.token != null) {

            this.dialog.open(AlertDialogComponent, {
              data: {
                title: 'Login Success',
                icon: 'check_circle',
                iconColor: 'green',
                subtitle: 'Welcome to our website.',
              },
            })

            this.userLogin = {
              "username": data.userData.userName,
              "email": data.userData.email,
              "role": data.userData.roles[0],
              "token": data.token
            }

            // console.log(this.userLogin)

            // บันทึกข้อมูลลง local storage
            this.auth.setUser(this.userLogin)

            // delay 2 วินาที
            setTimeout(() => {
              // Redirect ไปหน้า backend
              window.location.href = '/dashboard'
            }, 2000);

          }
        },

        error: (error) => {
          console.log(error)
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'มีข้อผิดพลาด',
              icon: 'error',
              iconColor: 'red',
              subtitle: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง',
            },
          })
        },

      })
    }
  }

  // สำหรับลิงก์ไปหน้า Register
  onClickRegister() {
    this.router.navigate(['/register'])
  }
}
