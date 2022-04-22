import { Component, OnInit,  ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UserQuery } from 'src/app/store/user.query';
import * as icons from 'base64-cryptocurrency-icons/build/index.js';


@Component({
  selector: 'app-user-crypto-list',
  templateUrl: './user-crypto-list.component.html',
  styleUrls: ['./user-crypto-list.component.css']
})
export class UserCryptoListComponent implements OnInit {

  displayedColumns: string[] = ['icons', 'symbol', 'coinAmount'];
  dataSource :any;
  userName :string = '';
  userCoinsData :any;
  isLoading: boolean = true;
  

  constructor(public firebaseService: FirebaseService,
    private userQuery: UserQuery) {
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
        this.isLoading = false;
        this.userCoinsData = result;
      }, 
        error => this.isLoading = false
      );
   }

  ngOnInit(): void {  }

  get transformedBody() {
    return Object.keys(this.userCoinsData);
  }

  loadIcon(cryptoName:string){
    return icons[cryptoName]?.icon;
  }
}
