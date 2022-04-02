import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialog-buy',
  templateUrl: './dialog-buy.component.html',
  styleUrls: ['./dialog-buy.component.css']
})
export class DialogBuyComponent implements OnInit {
  totalCoin: number;
  coinNameFa : string;
  coinSymbol :string;
  totalPrice : number; 

  constructor(public router: Router, 
    public dialogRef: MatDialogRef<DialogBuyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.totalCoin = data.TotalCoin;
      this.coinNameFa = data.CoinNameFa;
      this.totalPrice = data.TotalPrice;
      this.coinSymbol = data.CoinSymbol;
    }


  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
