import { Injectable } from '@angular/core';
import { coins} from '../shared/cryptoList';
import { Users } from '../shared/users';
import { Observable} from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, child, set, get} from "firebase/database";
import {MatDialog , MatDialogConfig} from "@angular/material/dialog";
import { DialogBodyComponent } from 'src/app/components/dialog/dialog-body/dialog-body.component';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afDb: AngularFireDatabase,private dialog: MatDialog) { }

  writeUserData(user: Users ) {
    const db = getDatabase();
    set(ref(db, 'users/' + user.username), {
      firstname : user.firstname,
      lastname : user.lastname,
      username : user.username,
      password : user.password
    });
  }

  readUserData(userId:any){
    const dbRef = ref(getDatabase());
    const userObservable = new Observable((observer) => {
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {
              observer.next(snapshot.val());
          } else {
            // alert("نام کاربری خود را به درستی وارد نمایید.");
            const dialogConfig = new MatDialogConfig();
          dialogConfig.data = { 
            dialogTitle: "ورود به حساب کاربری",
            dialogContent : "لطفا نام کاربری خود را به درستی وارد نمایید.",
            dialogAccept: false
          };
          dialogConfig.direction = 'rtl';
          dialogConfig.width="50%";
          this.dialog.open(DialogBodyComponent, dialogConfig);

          }
        }).catch((error) => {
          // console.error(error);
          console.log(error);
        });
    });
    return userObservable;
  }
  checkDuplicateUsername(userId:any){
    const dbRef = ref(getDatabase());
    const userObservable = new Observable((observer) => {
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {
              observer.next(true);
          } 
          else{
            observer.next(false);
          }
        }).catch((error) => {
          console.log(error);
        });
    });
    return userObservable;
  }
  
  //---------------------------------------------------------------------------------
  // Buy and Sell coins :
  buyCoin(buyData:any){
    // var newKey = this.afDb.database.ref().child('transactions/buy').push(buyData).key;
    this.afDb.database.ref().child('transactions/buy').push(buyData);
    const db = getDatabase(); 
    set(ref(db, 'purchasedCoin/'+buyData.userId+"/"+buyData.symbol), {
      getCoin : buyData.getCoin
    });
  }
  sellCoin(sellData:any, remainingCoin:number ){
    this.afDb.database.ref().child('transactions/sell').push(sellData);
    const db = getDatabase(); 
    set(ref(db, 'purchasedCoin/'+sellData.userId+"/"+sellData.symbol), {
      getCoin : remainingCoin
    });
  }
  getCoinsAmount(userId:string , coinSymbol:string){
    const dbRef = ref(getDatabase());
    const coinObservable = new Observable((observer) => {
        get(child(dbRef, `purchasedCoin/${userId}/${coinSymbol}`)).then((snapshot) => {
          if (snapshot.exists()) {
              observer.next(snapshot.val().getCoin);
          }

        }).catch((error) => {
          // console.error(error);
          console.log(error);
        });
    });
    return coinObservable;
  }

  getUserCoinsAmount(userId:string){
    const dbRef = ref(getDatabase());
    const coinObservable = new Observable((observer) => {
        get(child(dbRef, `purchasedCoin/${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {
              observer.next(snapshot.val());
          }
        }).catch((error) => {
          // console.error(error);
          console.log(error);
        });
    });
    return coinObservable;
  }


  // --------------------------------------------------------------------------------
  // show transactions list : 
  tradeList(type:string){
    return this.afDb.list('/transactions/' + type).valueChanges();
  }

  //-------------------------------------------------------------------------------
  // Coins data from realtime firebase :
  readCoinData() {
    return this.afDb.list('/coins').valueChanges();
  }
  // writing Coins data to realtime firebase :
  writeCoin() {
    const db = getDatabase();
    coins.forEach(element => {
      set(ref(db, 'coins/' + element.coinNameEn), {
        coinId: element.coinId ,
        coinNameFa: element.coinNameFa,
        coinNameEn: element.coinNameEn,
        price: element.price,
        priceToman : element.priceToman,
        symbol : element.symbol, 
      });
    });
  }
  //-------------------------------------------------------------------------------


}
