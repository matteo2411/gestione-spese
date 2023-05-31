import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentiListaComponent } from './investimenti-lista.component';

describe('InvestimentiListaComponent', () => {
  let component: InvestimentiListaComponent;
  let fixture: ComponentFixture<InvestimentiListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestimentiListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestimentiListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
