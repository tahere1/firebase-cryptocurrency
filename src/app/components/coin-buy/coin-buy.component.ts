import { Component, OnInit , OnDestroy } from '@angular/core';
// import { Cryptocurrency } from 'src/app/shared/cryptocurrency';
import { FirebaseService } from 'src/app/service/firebase.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { UserQuery } from 'src/app/store/user.query';



@Component({
  selector: 'app-coin-buy',
  templateUrl: './coin-buy.component.html',
  styleUrls: ['./coin-buy.component.css']
})
export class CoinBuyComponent implements OnInit {
  item:any;
  coinData :any;
  totalPrice :number=0;
  public PriceForm: FormGroup;
  userName : string = "";
  userIsLoggedIn :boolean = false;
  persianDate :string = "";
  
  constructor(public firebaseService: FirebaseService,
    public formBuilder: FormBuilder,
    public router: Router,
    public datepipe: DatePipe,
    private userQuery: UserQuery) {
        // get coin data from localStorage :
        this.item = localStorage.getItem('coinData');
        this.coinData = JSON.parse(this.item);
        // form :
        this.PriceForm = this.formBuilder.group({
          buyCrypto: ['', [Validators.required, Validators.min(10000)]]
        }) 
        // 
        this.persianDate= new Date().toLocaleDateString('fa-Ir');
   }

  ngOnInit(): void {
    // check user login :
    this.userQuery.multiProps$.subscribe((result:any) => {
      this.userName = result.username;
      this.userIsLoggedIn= result.isLogedIn;
    });
    var x = localStorage.getItem("login");
    if(x != null && this.userName == ''){
        var userData = JSON.parse(x);
        this.userName =  userData.username;
        this.userIsLoggedIn = userData.isLogedIn;
      } 

  }

  updatePrice(x:any){
    // var y: number = +x.target.value;
    this.totalPrice = +x.target.value;
  }
  onSubmitPrice(){
    var totalCoin = this.totalPrice/ this.coinData.priceToman;
    // let currentTime = this.datepipe.transform((new Date), 'h:mm:ss');
    var buyData = {
      coinId : this.coinData.coinId,
      coinNameFa : this.coinData.coinNameFa,
      coinNameEn : this.coinData.coinNameEn,
      symbol : this.coinData.symbol,
      priceToman : this.coinData.priceToman,
      userId: this.userName,
      totalPrice : this.totalPrice,
      getCoin : totalCoin,
      time : this.datepipe.transform((new Date), 'h:mm:ss'),
      Date : this.persianDate,
      type:"خرید"
    };
    this.firebaseService.buyCoin(buyData);
    alert(" تعداد " +totalCoin +" رمز ارز " +this.coinData.coinNameFa +" به مبلغ  " 
    +this.totalPrice+" به حساب شما اضافه شد. " );
     this.router.navigate(['/']);
  }


}
