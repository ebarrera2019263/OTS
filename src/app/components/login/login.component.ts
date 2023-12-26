import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataLogin: any ={
    "email":"",
    "password":""
  };

  constructor(private http: HttpClient){
  }
  ngOnInit(): void {
    
  }


  

  logDataLogin() {
    console.log(this.dataLogin);
  }


  Login() {
    return this.http.post('http://127.0.0.1:8000/api/auth/login', this.dataLogin).subscribe(
      data => console.log(data),
      error => console.log(error)
      
    )
  }
}
