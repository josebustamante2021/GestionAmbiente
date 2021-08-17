import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarCapacidadComponent } from './cambiar-capacidad.component';

describe('CambiarCapacidadComponent', () => {
  let component: CambiarCapacidadComponent;
  let fixture: ComponentFixture<CambiarCapacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarCapacidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarCapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
