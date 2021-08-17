import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadHorariosComponent } from './disponibilidad-horarios.component';

describe('DisponibilidadHorariosComponent', () => {
  let component: DisponibilidadHorariosComponent;
  let fixture: ComponentFixture<DisponibilidadHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibilidadHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilidadHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
