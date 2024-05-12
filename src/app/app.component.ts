import { Component, ViewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgStyle } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [
      NgStyle, 
      MenuComponent, 
      HeaderComponent, 
      RouterOutlet, 
      MatSidenavModule,
    ]
})
export class AppComponent {
  isExpanded = true
  isLoggedIn = false

  @ViewChild('sidenav', { static: true }) sidenav: any

  constructor() {
    // Check if the user is logged in
    this.isLoggedIn = localStorage.getItem('LoggedInToken') ? true : false
  }

  toggleSideBar() {
    this.sidenav.toggle();
  }
}