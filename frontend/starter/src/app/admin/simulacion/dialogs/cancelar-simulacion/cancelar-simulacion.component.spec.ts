import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarSimulacionComponent } from './cancelar-simulacion.component';

describe('CancelarSimulacionComponent', () => {
  let component: CancelarSimulacionComponent;
  let fixture: ComponentFixture<CancelarSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarSimulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
