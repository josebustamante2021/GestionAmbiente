import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAmbienteComponent } from './asignar-ambiente.component';

describe('AsignarAmbienteComponent', () => {
  let component: AsignarAmbienteComponent;
  let fixture: ComponentFixture<AsignarAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAmbienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
