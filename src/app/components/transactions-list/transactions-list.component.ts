import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import {MatTableDataSource} from '@angular/material/table';


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
  constructor(public firebaseService: FirebaseService) { 
    this.firebaseService.tradeList("buy").subscribe((result) => {
      this.dataSourceBuy = new MatTableDataSource(result);
    });
    this.firebaseService.tradeList("sell").subscribe((result) => {
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
    this.dataSourceSell.filter = filterValue;
    this.dataSourceBuy.filter = filterValue;
  }

}
