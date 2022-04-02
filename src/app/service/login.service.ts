import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseService } from 'src/app/service/firebase.service';
import { UserStore } from 'src/app/store/user.store';
import { UserQuery } from 'src/app/store/user.query';
import {MatDialog , MatDialogConfig} from "@angular/material/dialog";
import { DialogBodyComponent } from 'src/app/components/dialog/dialog-body/dialog-body.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public firebaseService: FirebaseService,
              public router: Router,
              private userStore: UserStore , 
              private userQuery : UserQuery,
              private dialog: MatDialog) { }

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
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = { 
            dialogTitle: "ورود به حساب کاربری",
            dialogContent : "رمز عبور شما نادرست است. لطفا رمز عبور صحیح را وارد نمایید",
            dialogAccept: false
          };
          dialogConfig.direction = 'rtl';
          dialogConfig.width="50%";
          this.dialog.open(DialogBodyComponent, dialogConfig);
        }
    });
  }

}
