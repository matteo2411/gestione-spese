import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaTipologiaComponent } from './crea-tipologia.component';

describe('CreaTipologiaComponent', () => {
  let component: CreaTipologiaComponent;
  let fixture: ComponentFixture<CreaTipologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaTipologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaTipologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
