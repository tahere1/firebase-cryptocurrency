import { Component, OnInit , ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Router } from "@angular/router";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import * as icons from 'base64-cryptocurrency-icons/build/index.js';


@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit {
  cryptoList:any;
  displayedColumns: string[] = ['symbol','coinNameEn', 'coinNameFa', 'price', 'priceToman', 'buy'];
  dataSource :any;
  isLoading: boolean = true;
  
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor(public firebaseService: FirebaseService, 
    public router: Router,
    public _MatPaginatorIntl: MatPaginatorIntl) {
    // this.firebaseService.writeCoin();
    this.firebaseService.readCoinData().subscribe((result) => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    }
    // , error => this.isLoading = false
    ); 
  }

  
  ngOnInit(): void { 
    this._MatPaginatorIntl.firstPageLabel = 'اولین صفحه';
    this._MatPaginatorIntl.itemsPerPageLabel = 'تعداد آیتم';
    this._MatPaginatorIntl.lastPageLabel = 'اخرین صفحه';
    this._MatPaginatorIntl.nextPageLabel = 'صفحه بعدی';
    this._MatPaginatorIntl.previousPageLabel = 'صفحه قبلی'; 
  }

  sortData(data: any) {
    data.sort = this.empTbSort;
  }

  getRecord(row:any){
    localStorage.setItem("coinData", JSON.stringify(row));
    this.router.navigate(['/buy-coin']);
  }

  loadIcon(cryptoName:string){
    return icons[cryptoName]?.icon;
  }

}
