import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 🔹 necessário para ngModel

interface Caderno {
  codigo: string;
  mesAno: string;
  qtdRMPs: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule], // 🔹 importa FormsModule para ngModel
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm = '';
  cadernos: Caderno[] = [
    { codigo: 'EB 023-03-2025', mesAno: '03/2025', qtdRMPs: 50 },
    { codigo: 'EB 024-03-2025', mesAno: '03/2025', qtdRMPs: 40 },
    // adicione mais cadernos aqui
  ];

  constructor(private auth: AuthService, private router: Router) {}

  get filteredCadernos() {
    if (!this.searchTerm) return this.cadernos;
    return this.cadernos.filter(c =>
      c.codigo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.mesAno.includes(this.searchTerm)
    );
  }

  search() {
    // filtro já aplicado pelo getter filteredCadernos
  }

  goCadastrar() {
    this.router.navigate(['/cadastro']);
  }

  verDetalhes(caderno: Caderno) {
    this.router.navigate(['/caderno', caderno.codigo]);
  }

  editar(caderno: Caderno) {
    this.router.navigate(['/caderno/editar', caderno.codigo]);
  }

  sair() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
