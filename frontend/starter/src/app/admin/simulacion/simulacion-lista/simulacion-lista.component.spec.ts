import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionListaComponent } from './simulacion-lista.component';

describe('SimulacionListaComponent', () => {
  let component: SimulacionListaComponent;
  let fixture: ComponentFixture<SimulacionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulacionListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
