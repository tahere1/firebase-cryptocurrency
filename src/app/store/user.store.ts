import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


export interface UserState {
  firstname: string,
  lastname: string,
  username: string,
  isLogedIn : boolean;
}

export function createInitialState(): UserState {
  return {
    firstname:'',
    lastname:'' ,
    username: '' ,
    isLogedIn: false
  };
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'user' , resettable: true })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}