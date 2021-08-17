import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularAsignacionComponent } from './anular-asignacion.component';

describe('AnularAsignacionComponent', () => {
  let component: AnularAsignacionComponent;
  let fixture: ComponentFixture<AnularAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnularAsignacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
