import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UserQuery } from 'src/app/store/user.query';

@Component({
  selector: 'app-user-crypto-list',
  templateUrl: './user-crypto-list.component.html',
  styleUrls: ['./user-crypto-list.component.css']
})
export class UserCryptoListComponent implements OnInit {

  displayedColumns: string[] = ['symbol', 'coinAmount'];
  dataSource :any;
  userName :string = '';
  userCoinsData :any;
  constructor(public firebaseService: FirebaseService,private userQuery: UserQuery) {
    // get username:
    this.userQuery.multiProps$.subscribe((result:any) => {
      this.userName = result.username;
    });
    var x = localStorage.getItem("login");
    if(x != null && this.userName == ''){
        var userData = JSON.parse(x);
        this.userName =  userData.username;
      } 
      // get user's coins from firebase :
      this.firebaseService.getUserCoinsAmount(this.userName).subscribe((result)=>{
        console.log(result);
        this.userCoinsData = result;
      });
   }

  ngOnInit(): void {}

  get transformedBody() {
    return Object.keys(this.userCoinsData);
  }
}
