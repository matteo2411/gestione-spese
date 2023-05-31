import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaAccountComponent } from './crea-account.component';

describe('CreaAccountComponent', () => {
  let component: CreaAccountComponent;
  let fixture: ComponentFixture<CreaAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
