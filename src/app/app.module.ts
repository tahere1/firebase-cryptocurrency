import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// Routing
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
// Components
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { CoinBuyComponent } from './components/coin-buy/coin-buy.component';
import { CoinSellComponent } from './components/coin-sell/coin-sell.component'; 
import { UserCryptoListComponent } from './components/user-crypto-list/user-crypto-list.component';
import { DialogBodyComponent } from './components/dialog/dialog-body/dialog-body.component'
import { DialogSellComponent } from './components/dialog/dialog-sell/dialog-sell.component';
import { DialogBuyComponent } from './components/dialog/dialog-buy/dialog-buy.component';

// Date and Time 
import { DatePipe } from '@angular/common';
// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './Module/angular-material.module';
// import {MatDialogModule} from "@angular/material/dialog";

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// FormsModule 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Flex Layout 
import { FlexLayoutModule } from "@angular/flex-layout";
// firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// Sate Management:
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
// import { UserCreateLoginComponent } from './components/user-create-login/user-create-login.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'crypto-list', component: CryptoListComponent },
  { path: 'transactions-list', component: TransactionsListComponent},
  { path: 'buy-coin', component: CoinBuyComponent },
  { path: 'user-crypto-list', component: UserCryptoListComponent },
  // { path: 'user-new', component:  UserCreateLoginComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    CryptoListComponent,
    CreateUserComponent,
    LoginUserComponent,
    TransactionsListComponent,
    CoinBuyComponent,
    CoinSellComponent,
    UserCryptoListComponent,
    DialogBodyComponent,
    DialogSellComponent,
    DialogBuyComponent,
    HomepageComponent,
    // UserCreateLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    // Material :
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    // MatDialogModule,
    // firebase Initialize:
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // akita :
    environment.production ? [] : AkitaNgDevtools.forRoot(),  
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogBodyComponent]
})
export class AppModule { }
