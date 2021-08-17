import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionTurnoComponent } from './validacion-turno.component';

describe('ValidacionTurnoComponent', () => {
  let component: ValidacionTurnoComponent;
  let fixture: ComponentFixture<ValidacionTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidacionTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
