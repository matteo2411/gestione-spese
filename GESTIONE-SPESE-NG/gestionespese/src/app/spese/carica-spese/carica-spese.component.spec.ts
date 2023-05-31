import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaricaSpeseComponent } from './carica-spese.component';

describe('CaricaSpeseComponent', () => {
  let component: CaricaSpeseComponent;
  let fixture: ComponentFixture<CaricaSpeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaricaSpeseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaricaSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
