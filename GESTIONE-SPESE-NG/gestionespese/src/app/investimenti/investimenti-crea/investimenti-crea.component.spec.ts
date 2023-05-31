import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestimentiCreaComponent } from './investimenti-crea.component';

describe('InvestimentiCreaComponent', () => {
  let component: InvestimentiCreaComponent;
  let fixture: ComponentFixture<InvestimentiCreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestimentiCreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestimentiCreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
