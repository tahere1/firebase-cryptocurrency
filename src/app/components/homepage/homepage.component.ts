import { Component, OnInit } from '@angular/core';
import * as icons from 'base64-cryptocurrency-icons/build/index.js'


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  loadIcon(cryptoName:string){
    return icons[cryptoName]?.icon;
  }
  
}
