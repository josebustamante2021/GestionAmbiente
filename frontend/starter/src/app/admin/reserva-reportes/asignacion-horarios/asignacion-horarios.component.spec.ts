import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionHorariosComponent } from './asignacion-horarios.component';

describe('AsignacionHorariosComponent', () => {
  let component: AsignacionHorariosComponent;
  let fixture: ComponentFixture<AsignacionHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
