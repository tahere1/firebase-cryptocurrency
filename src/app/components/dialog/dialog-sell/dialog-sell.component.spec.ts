import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSellComponent } from './dialog-sell.component';

describe('DialogSellComponent', () => {
  let component: DialogSellComponent;
  let fixture: ComponentFixture<DialogSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
