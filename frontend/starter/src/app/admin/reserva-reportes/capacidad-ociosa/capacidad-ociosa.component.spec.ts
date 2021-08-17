import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadOciosaComponent } from './capacidad-ociosa.component';

describe('CapacidadOciosaComponent', () => {
  let component: CapacidadOciosaComponent;
  let fixture: ComponentFixture<CapacidadOciosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacidadOciosaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadOciosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
