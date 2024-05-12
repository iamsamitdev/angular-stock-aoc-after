import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from './../services/auth.service'

export const authenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const rest = inject(AuthService)

  // console.log('authenGuard', rest.isLoggedIn())

  if (rest.isLoggedIn()) {
    // already logged-in
    if (state.url == '/login' || state.url == '/register') {
      router.navigate(['stock'])
    }
    return true
  } else {
    // not yet logged-in
    if (state.url != '/login' && state.url != '/register') {
      router.navigate(['login'])
    }
    return true
  }
}