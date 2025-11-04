import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.css']
})
export class FormLayoutComponent {
  // Cabeçalho
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() code!: string;
  @Input() revision!: string;
  @Input() date!: string;

  // Rodapé
  @Input() author!: string;
  @Input() approver!: string;
  @Input() attention!: string;
}
