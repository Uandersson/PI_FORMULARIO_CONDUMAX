import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. CORREÇÃO AQUI: Importar o nome da classe correta
import { ProcessMonitoringComponent } from './rmp-009-formulario.component';

// 2. CORREÇÃO AQUI: Usar o nome correto no 'describe'
describe('ProcessMonitoringComponent', () => {
  
  // 3. CORREÇÃO AQUI: Usar o nome correto para o 'fixture'
  let component: ProcessMonitoringComponent;
  let fixture: ComponentFixture<ProcessMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 4. CORREÇÃO AQUI: Importar o componente
      imports: [ProcessMonitoringComponent]
    })
    .compileComponents();
    
    // 5. CORREÇÃO AQUI: Criar o fixture com o nome correto
    fixture = TestBed.createComponent(ProcessMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});