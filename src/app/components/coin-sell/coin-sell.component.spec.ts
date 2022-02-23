import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSellComponent } from './coin-sell.component';

describe('CoinSellComponent', () => {
  let component: CoinSellComponent;
  let fixture: ComponentFixture<CoinSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
