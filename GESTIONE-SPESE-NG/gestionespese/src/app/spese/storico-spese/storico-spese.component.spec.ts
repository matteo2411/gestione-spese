import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoSpeseComponent } from './storico-spese.component';

describe('StoricoSpeseComponent', () => {
  let component: StoricoSpeseComponent;
  let fixture: ComponentFixture<StoricoSpeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoSpeseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoricoSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
