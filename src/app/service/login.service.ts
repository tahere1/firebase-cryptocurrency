import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseService } from 'src/app/service/firebase.service';
import { UserStore } from 'src/app/store/user.store';
import { UserQuery } from 'src/app/store/user.query';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public firebaseService: FirebaseService,
              public router: Router,
              private userStore: UserStore , 
              private userQuery : UserQuery) { }

  userLogin(formUsername:string ,formPassword : any ){
    this.firebaseService.readUserData(formUsername).subscribe((result:any) => {
      if (formPassword == result.password) {
        this.userStore.update(state => ({
              firstname:result.firstname,
              lastname:result.lastname,
              username: result.username,
              isLogedIn: true
            }));
        this.userQuery.saveToLocalStorage();
        this.router.navigate(['/']);
      }
      else {
          alert("رمز عبور شما نادرست است.");
        }
    });
  }

}
