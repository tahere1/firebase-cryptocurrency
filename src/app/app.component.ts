import { Component, OnInit} from '@angular/core';
// akita : 
import { UserStore } from 'src/app/store/user.store';
import { UserQuery } from 'src/app/store/user.query';
import * as icons from 'base64-cryptocurrency-icons/build/index.js'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crypto-firebase';
  username:any;
  userisLoggedIn:boolean = false;

  constructor(private userStore: UserStore, private userQuery: UserQuery) {}

  ngOnInit(): void {
    this.userQuery.multiProps$.subscribe((result:any) => {
      this.username = result.username;
      this.userisLoggedIn = result.isLogedIn;
    });
    var x = localStorage.getItem("login");
    if(x != null && this.username == ''){
        var userData = JSON.parse(x);
        this.username =  userData.username;
        this.userisLoggedIn = userData.isLogedIn;
      } 
  }
  logout(){
    this.userStore.reset();
    this.userQuery.deleteLocalStorage();
    this.username = '';
    this.userisLoggedIn = false;
  }

  loadIcon(cryptoName:string){
    return icons[cryptoName]?.icon;
  }

}
