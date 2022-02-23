import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCryptoListComponent } from './user-crypto-list.component';

describe('UserCryptoListComponent', () => {
  let component: UserCryptoListComponent;
  let fixture: ComponentFixture<UserCryptoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCryptoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCryptoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
