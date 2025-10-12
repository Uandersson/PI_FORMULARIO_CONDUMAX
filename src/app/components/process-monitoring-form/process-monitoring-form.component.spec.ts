import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMonitoringFormComponent } from './process-monitoring-form.component';

describe('ProcessMonitoringFormComponent', () => {
  let component: ProcessMonitoringFormComponent;
  let fixture: ComponentFixture<ProcessMonitoringFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessMonitoringFormComponent]
    });
    fixture = TestBed.createComponent(ProcessMonitoringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});