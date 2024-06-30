import { Component, OnInit, Output, EventEmitter, Input, inject } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'

import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [MatToolbar, MatToolbarRow, MatIconButton, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem]
})
export class HeaderComponent implements OnInit {

  private auth = inject(AuthService)

  // สร้างตัวแปรไว้เก็บข้อมูลผู้ใช้งานที่ Login
  userProfile: any = {
    "username": "",
    "email": "",
    "role": ""
  }

  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isOpened?: boolean

  pageName: string = 'Stock'
  version = '17.3'

  // ฟังก์ชัน ngOnInit จะถูกเรียกเมื่อ Component ถูกสร้างขึ้น
  ngOnInit(): void {
    // ดึงข้อมูลผู้ใช้งานที่ Login มาแสดง
    this.userProfile.username = this.auth.getUser().username
    this.userProfile.email = this.auth.getUser().email
    this.userProfile.role = this.auth.getUser().role
  }

  // ฟังก์ชัน onToggleSidenav จะถูกเรียกเมื่อมีการคลิกที่ปุ่มเมนู
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  // ฟังก์ชัน onClickSignout จะถูกเรียกเมื่อมีการคลิกที่ปุ่ม Signout
  onClickSignout() {
    this.auth.logout()
    window.location.href = '/login'
  }

}