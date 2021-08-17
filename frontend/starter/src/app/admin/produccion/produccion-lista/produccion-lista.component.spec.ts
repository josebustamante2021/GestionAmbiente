import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionListaComponent } from './produccion-lista.component';

describe('ProduccionListaComponent', () => {
  let component: ProduccionListaComponent;
  let fixture: ComponentFixture<ProduccionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduccionListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
