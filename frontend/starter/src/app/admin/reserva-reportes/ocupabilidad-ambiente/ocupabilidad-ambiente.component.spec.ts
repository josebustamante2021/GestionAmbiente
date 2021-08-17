import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupabilidadAmbienteComponent } from './ocupabilidad-ambiente.component';

describe('OcupabilidadAmbienteComponent', () => {
  let component: OcupabilidadAmbienteComponent;
  let fixture: ComponentFixture<OcupabilidadAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupabilidadAmbienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupabilidadAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
