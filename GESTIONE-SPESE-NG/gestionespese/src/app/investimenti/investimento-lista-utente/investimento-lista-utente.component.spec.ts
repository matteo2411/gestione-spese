import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentoListaUtenteComponent } from './investimento-lista-utente.component';

describe('InvestimentoListaUtenteComponent', () => {
  let component: InvestimentoListaUtenteComponent;
  let fixture: ComponentFixture<InvestimentoListaUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestimentoListaUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestimentoListaUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
