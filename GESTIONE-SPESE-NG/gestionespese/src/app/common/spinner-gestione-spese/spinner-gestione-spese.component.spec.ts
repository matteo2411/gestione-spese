import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerGestioneSpeseComponent } from './spinner-gestione-spese.component';

describe('SpinnerGestioneSpeseComponent', () => {
  let component: SpinnerGestioneSpeseComponent;
  let fixture: ComponentFixture<SpinnerGestioneSpeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerGestioneSpeseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerGestioneSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
