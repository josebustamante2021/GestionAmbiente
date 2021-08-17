import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigracionListaComponent } from './migracion-lista.component';

describe('MigracionListaComponent', () => {
  let component: MigracionListaComponent;
  let fixture: ComponentFixture<MigracionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigracionListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigracionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
