import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coin-sell',
  templateUrl: './coin-sell.component.html',
  styleUrls: ['./coin-sell.component.css']
})
export class CoinSellComponent implements OnInit {
  item:any;
  coinData :any; // selected coin data;
  totalCoinPrice :number=0; // The price of the coins to be sold;
  totalUserCoin:number=0; // The amount of cryptocurrency the user has;
  inputCoinsAmount:number = 0;
  persianDate :string = "";
  // form :
  public SellForm: FormGroup;
  // user :
  private userData: any;
  private u:any;
  userName : string = "";
  userIsLogin :boolean = false;

  constructor(public firebaseService: FirebaseService,
    public formBuilder: FormBuilder,
    public router: Router,
    public datepipe: DatePipe){ 
        // set ِDate :
        this.persianDate= new Date().toLocaleDateString('fa-Ir');
        // get coin data from localStorage :
        this.item = localStorage.getItem('coinData');
        this.coinData = JSON.parse(this.item);
        // form :
        this.SellForm = this.formBuilder.group({
          buyCrypto: ['', [Validators.required, Validators.min(0)]]
        }) 

  }

  ngOnInit(): void {
    // check user login :
    this.u = localStorage.getItem('login');
    if(this.u!= null){
      this.userData = JSON.parse(this.u);
      this.userName = this.userData.username;
      this.userIsLogin = true;
      // get The amount of cryptocurrency the user has from firebaseService :
      this.firebaseService.getCoinsAmount(this.userName, this.coinData.symbol).subscribe((result:any) => {
          this.totalUserCoin = result;
      });
    }
  }
  
  onSubmitSell(){
    if(this.inputCoinsAmount>0 && this.inputCoinsAmount<=this.totalUserCoin ){
        var sellData = {
          coinId : this.coinData.coinId,
          coinNameFa : this.coinData.coinNameFa,
          coinNameEn : this.coinData.coinNameEn,
          symbol : this.coinData.symbol,
          priceToman : this.coinData.priceToman,
          userId: this.userName,
          totalPrice :this.totalCoinPrice,
          sellCoinAmount : this.inputCoinsAmount,
          time : this.datepipe.transform((new Date), 'h:mm:ss'),
          Date : this.persianDate,
          type:"فروش"
      };
      let remainingCoin = this.totalUserCoin - this.inputCoinsAmount;
      this.firebaseService.sellCoin(sellData , remainingCoin);
      alert("مبلغ "+ this.totalCoinPrice + " تومان به حساب شما اضافه شد. " 
      + "\n تعداد رمز ارز " + this.coinData.coinNameFa 
      + " باقی مانده برابر است با : " + remainingCoin );
      this.router.navigate(['/']);
    }
    else if(this.inputCoinsAmount == 0 && this.totalUserCoin >0){
      alert("لطفا تعداد رمز ارز را وارد نمایید.");
    }
    else if(this.inputCoinsAmount > this.totalUserCoin){
      alert("شما این تعداد رمز ارز برای فروش ندارید.");
    }
    else if(this.inputCoinsAmount == 0){
      alert("تعداد رمز ارز وارد شده برای فروش برابر با صفر است.");
    }
  }


  updateInutCoins(x:any){
    this.inputCoinsAmount = +x.target.value;
    this.totalCoinPrice = this.inputCoinsAmount * this.coinData.priceToman;
  }

}
