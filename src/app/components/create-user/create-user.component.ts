import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { UserStore } from 'src/app/store/user.store';
import { UserQuery } from 'src/app/store/user.query';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  errorName:string = "نام کاربر باید حداقل شامل دو کاراکتر باشد.";
  errorLastName:string = "لطفا نام خانوادگی خود را وارد نمایید";
  errorUsername:string = "نام کاربری باید حداقل شامل سه کاراکتر باشد.";
  errorPassword:string = "رمز عبور باید حداقل شامل چهار کاراکتر باشد.";

  items: Array<any> = [];
  public userForm: FormGroup;
  constructor( public firebaseService: FirebaseService,
     public formBuilder: FormBuilder,
     public router: Router,
     private userStore: UserStore, 
     private userQuery : UserQuery ) {
    this.userForm = this.formBuilder.group({
      firstname: ['' , [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4) ]]
    }) 
   }


  ngOnInit(): void { }

  onSubmit(){

    // var UsernameExist = this.firebaseService.checkDuplicateUsername(this.userForm.value.username);
    this.firebaseService.checkDuplicateUsername(this.userForm.value.username)
        .subscribe((result) => {
            if(result == false){ //  this Username does not Exist
                this.firebaseService.writeUserData(this.userForm.value);
                this.userStore.update(state => ({
                    firstname: this.userForm.value.firstname,
                    lastname: this.userForm.value.lastname,
                    username: this.userForm.value.username,
                    isLogedIn: true
                  }));
                this.userQuery.saveToLocalStorage();
                this.userForm.reset();
                alert("حساب کاربری شما با موفقیت ثبت گردید.");
                this.router.navigate(['/']);
            }
            else {
              alert("این نام کاربری تکراری است. لطفا نام کاربری خود را تغییر دهید.");

            }
        });
    
  }
}
