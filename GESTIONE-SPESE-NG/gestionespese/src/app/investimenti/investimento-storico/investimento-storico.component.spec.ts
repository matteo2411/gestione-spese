import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentoStoricoComponent } from './investimento-storico.component';

describe('InvestimentoStoricoComponent', () => {
  let component: InvestimentoStoricoComponent;
  let fixture: ComponentFixture<InvestimentoStoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestimentoStoricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestimentoStoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
