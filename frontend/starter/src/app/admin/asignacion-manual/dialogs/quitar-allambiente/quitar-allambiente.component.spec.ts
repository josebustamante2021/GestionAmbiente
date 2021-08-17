import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarAllambienteComponent } from './quitar-allambiente.component';

describe('QuitarAllambienteComponent', () => {
  let component: QuitarAllambienteComponent;
  let fixture: ComponentFixture<QuitarAllambienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitarAllambienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarAllambienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
