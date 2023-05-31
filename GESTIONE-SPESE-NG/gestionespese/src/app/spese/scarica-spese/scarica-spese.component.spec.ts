import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaricaSpeseComponent } from './scarica-spese.component';

describe('ScaricaSpeseComponent', () => {
  let component: ScaricaSpeseComponent;
  let fixture: ComponentFixture<ScaricaSpeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaricaSpeseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaricaSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
