import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { UserModelLogin, UserModelRegister  } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = environment.dotnet_api_url

  // Header
  httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  // Method for Login
  Login(data: UserModelLogin): Observable<UserModelLogin> {
    return this.http.post<UserModelLogin>(
      this.apiURL + 'Authenticate/login', 
      data, 
      this.httpOptions
    )
  }

  // Method for Register
  Register(data: UserModelRegister): Observable<UserModelRegister> {
    return this.http.post<UserModelRegister>(
      this.apiURL + 'Authenticate/register-user', 
      data, 
      this.httpOptions
    )
  }
}