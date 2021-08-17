import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionTurnoComponent } from './distribucion-turno.component';

describe('DistribucionTurnoComponent', () => {
  let component: DistribucionTurnoComponent;
  let fixture: ComponentFixture<DistribucionTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribucionTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribucionTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
