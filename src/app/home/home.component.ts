import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Caderno {
  maquinas: string;
  mesAno: string;
  id: number; // ID para a rota de edição funcionar
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm: string = '';

  cadernos: Caderno[] = 
  [
    { maquinas: 'EXTRUSORA-04-025 ET', mesAno: '03/2025', id: 7 }, // Adicionei os seus exemplos também
    { maquinas: 'EXTRUSORA-04-029 EA', mesAno: '03/2025', id: 5 },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  get filteredCadernos(): Caderno[] {
    if (!this.searchTerm) {
      return this.cadernos;
    }
    const termo = this.searchTerm.toLowerCase();
    return this.cadernos.filter(c =>
      c.maquinas.toLowerCase().includes(termo) ||
      c.mesAno.toLowerCase().includes(termo)
    );
  }

  search(): void {
    // A busca é reativa por causa do getter 'filteredCadernos',
    // mas a função pode ser mantida para outras lógicas, como logs.
    console.log('Buscando por:', this.searchTerm);
  }

  goCadastrar(): void {
    // Leva para o formulário de CRIAÇÃO que configuramos
    this.router.navigate(['/caderno/novo']);
  }

  verDetalhes(caderno: Caderno): void {
    // Leva para a página de EDIÇÃO que configuramos, usando o ID
    this.router.navigate(['/caderno/editar', caderno.id]);
  }

  editar(caderno: Caderno): void {
    // Esta função agora faz o mesmo que verDetalhes, leva para a página de edição
    this.router.navigate(['/caderno/editar', caderno.id]);
  }

  sair(): void {
    this.auth.logout(); // Chama o serviço de autenticação
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  // Função para vizualização dos formulários.
  ver(caderno: Caderno): void {
    this.router.navigate(['/caderno/ver', caderno.id]);
  }
}
