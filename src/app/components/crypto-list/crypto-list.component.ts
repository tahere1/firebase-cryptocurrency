import { Component, OnInit , ViewChild} from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Router } from "@angular/router";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit {
  cryptoList:any;
  displayedColumns: string[] = ['symbol','coinNameEn', 'coinNameFa', 'price', 'priceToman', 'buy'];
  dataSource :any;

  constructor(public firebaseService: FirebaseService, public router: Router) {
    // this.firebaseService.writeCoin();
    this.firebaseService.readCoinData().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
    });    
  }
  @ViewChild('empTbSort') empTbSort = new MatSort();

  ngOnInit(): void { }

  sortData(data: any) {
    data.sort = this.empTbSort;
  }

  getRecord(row:any){
    localStorage.setItem("coinData", JSON.stringify(row));
    this.router.navigate(['/buy-coin']);
  }
  

}
