import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  public loginForm: FormGroup;

  constructor( public loginService: LoginService, public formBuilder: FormBuilder) 
    {
      this.loginForm = this.formBuilder.group({
        username: [''],
        password: ['']
      })              
    }
  ngOnInit(): void { }

  onLogin(){
    const formUsername = this.loginForm.value.username;
    const formPassword = this.loginForm.value.password;
    this.loginService.userLogin(formUsername , formPassword);
  }

}
