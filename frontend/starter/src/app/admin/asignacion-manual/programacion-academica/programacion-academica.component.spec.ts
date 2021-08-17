import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionAcademicaComponent } from './programacion-academica.component';

describe('ProgramacionAcademicaComponent', () => {
  let component: ProgramacionAcademicaComponent;
  let fixture: ComponentFixture<ProgramacionAcademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramacionAcademicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
