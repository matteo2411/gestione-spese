import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentiAssociaUtenteComponent } from './investimenti-associa-utente.component';

describe('InvestimentiAssociaUtenteComponent', () => {
  let component: InvestimentiAssociaUtenteComponent;
  let fixture: ComponentFixture<InvestimentiAssociaUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestimentiAssociaUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestimentiAssociaUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
