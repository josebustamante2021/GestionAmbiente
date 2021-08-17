import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarAmbienteEspecialidadComponent } from './quitar-ambiente-especialidad.component';

describe('QuitarAmbienteEspecialidadComponent', () => {
  let component: QuitarAmbienteEspecialidadComponent;
  let fixture: ComponentFixture<QuitarAmbienteEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitarAmbienteEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarAmbienteEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
