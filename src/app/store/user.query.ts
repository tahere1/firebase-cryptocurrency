import { Query } from '@datorama/akita';
import { UserState, UserStore } from './user.store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class UserQuery extends Query<UserState> {
    // allState$ = this.select();
    // selectName$ = this.select('username');
    // selectUserName$ = this.select(state => state.username);
    // // Returns [firstname,lastname,username,isLogedIn]
    // multiPropsCallback$ = this.select(
    //   [state => state.firstname, state => state.lastname , state => state.username , state => state.isLogedIn]
    // )
    // isLoggedIn$ = this.select(state => state.isLogedIn);
    // Returns { firstname,lastname,username,isLogedIn}
    multiProps$ = this.select(['firstname','lastname','username','isLogedIn']);
      
    
    constructor(protected override store: UserStore) {
      super(store);
    }
    get usernameLoggedIn() {
      return this.getValue().username;
    }
    get isLoggedIn() {
      return this.getValue().isLogedIn;
    }
    saveToLocalStorage(){
      this.multiProps$.subscribe((result:any)=>{
        localStorage.setItem("login", JSON.stringify(result));
      });
    }

    deleteLocalStorage(){
      localStorage.removeItem("login");
    }
    
  }
