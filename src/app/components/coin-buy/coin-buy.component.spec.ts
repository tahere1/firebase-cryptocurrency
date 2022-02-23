import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinBuyComponent } from './coin-buy.component';

describe('CoinBuyComponent', () => {
  let component: CoinBuyComponent;
  let fixture: ComponentFixture<CoinBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
