import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import {MatTableDataSource} from '@angular/material/table';
import * as icons from 'base64-cryptocurrency-icons/build/index.js'


@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {

  displayedColumnsSell: string[] = ['symbol','sellCoinAmount', 'priceToman', 'totalPrice', 'Date', 'time'];
  displayedColumnsBuy: string[] = ['symbol','getCoin', 'priceToman', 'totalPrice', 'Date', 'time'];
  dataSourceSell :any;
  dataSourceBuy :any;
  isSellTableHasData : boolean = true;
  isBuyTableHasData : boolean = true;
  isLoadingSell: boolean = true;
  isLoadingBuy: boolean = true;

  constructor(public firebaseService: FirebaseService) { 
    this.firebaseService.tradeList("buy").subscribe((result) => {
      this.isLoadingBuy = false;
      this.dataSourceBuy = new MatTableDataSource(result);
    });
    this.firebaseService.tradeList("sell").subscribe((result) => {
      this.isLoadingSell = false;
      this.dataSourceSell = new MatTableDataSource(result);
    });
    
  }

  ngOnInit(): void {
    // this.dataSourceSell.filterPredicate = function(data:any|string, filter: string): boolean {
    //   return data.symbol.toLowerCase().includes(filter) === filter;
    // };
    // this.dataSourceBuy.filterPredicate = function(data:any|string, filter: string): boolean {
    //   return data.symbol.toLowerCase().includes(filter) === filter;
    // };
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;  
    // ------------- Buy Filter -----------------
    this.dataSourceSell.filter = filterValue;
    if(this.dataSourceBuy.filteredData.length > 0){
      this.isSellTableHasData = true;
    } else {
      this.isSellTableHasData = false;
    }
    //  ----- Sell Filter --------------------
    this.dataSourceBuy.filter = filterValue;
    if(this.dataSourceBuy.filteredData.length > 0){
      this.isBuyTableHasData = true;
    } else {
      this.isBuyTableHasData = false;
    }
  }

  loadIcon(cryptoName:string){
    return icons[cryptoName]?.icon;
  }

}
