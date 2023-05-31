import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruscottoSpeseComponent } from './cruscotto-spese.component';

describe('CruscottoSpeseComponent', () => {
  let component: CruscottoSpeseComponent;
  let fixture: ComponentFixture<CruscottoSpeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruscottoSpeseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CruscottoSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
