import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarAmbienteComponent } from './quitar-ambiente.component';

describe('QuitarAmbienteComponent', () => {
  let component: QuitarAmbienteComponent;
  let fixture: ComponentFixture<QuitarAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitarAmbienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
