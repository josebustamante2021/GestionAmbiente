import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionProgacademicasComponent } from './simulacion-progacademicas.component';

describe('SimulacionProgacademicasComponent', () => {
  let component: SimulacionProgacademicasComponent;
  let fixture: ComponentFixture<SimulacionProgacademicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulacionProgacademicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionProgacademicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
