import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false  // <--- MUITO IMPORTANTE: Tem que ser false
})
export class AppComponent {
  title = 'PI_FORMULARIO_CONDUMAX';
}