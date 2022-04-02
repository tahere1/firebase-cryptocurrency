import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBuyComponent } from './dialog-buy.component';

describe('DialogBuyComponent', () => {
  let component: DialogBuyComponent;
  let fixture: ComponentFixture<DialogBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
