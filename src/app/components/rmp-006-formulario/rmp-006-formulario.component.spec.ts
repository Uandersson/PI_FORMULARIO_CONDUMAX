import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMonitoringFormComponent } from './rmp-006-formulario.component';

describe('ProcessMonitoringFormComponent', () => {
  let component: ProcessMonitoringFormComponent;
  let fixture: ComponentFixture<ProcessMonitoringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessMonitoringFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessMonitoringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});