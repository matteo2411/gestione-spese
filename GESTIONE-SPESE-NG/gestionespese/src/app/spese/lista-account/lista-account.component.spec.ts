import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAccountComponent } from './lista-account.component';

describe('ListaAccountComponent', () => {
  let component: ListaAccountComponent;
  let fixture: ComponentFixture<ListaAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
