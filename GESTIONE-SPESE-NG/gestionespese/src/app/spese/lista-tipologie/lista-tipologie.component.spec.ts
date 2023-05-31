import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipologieComponent } from './lista-tipologie.component';

describe('ListaTipologieComponent', () => {
  let component: ListaTipologieComponent;
  let fixture: ComponentFixture<ListaTipologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipologieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
