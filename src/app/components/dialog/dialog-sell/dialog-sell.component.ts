import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialog-sell',
  templateUrl: './dialog-sell.component.html',
  styleUrls: ['./dialog-sell.component.css']
})
export class DialogSellComponent implements OnInit {
  totalCoinPrice: number;
  totalCoin : number;
  coinNameFa : string;
  coinSymbol :string;
  remainingCoin : number;
  constructor(public router: Router,
    public dialogRef: MatDialogRef<DialogSellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.totalCoinPrice = data.TotalCoinPrice;
      this.totalCoin = data.TotalCoin;
      this.coinNameFa = data.CoinNameFa;
      this.coinSymbol = data.CoinSymbol
      this.remainingCoin =  data.remainingCoin;
    }


  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
