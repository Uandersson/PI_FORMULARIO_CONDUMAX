import { Injectable } from '@angular/core';

export interface Usuario {
  user?: string;  // Mudamos de 'nome' para 'user' para corrigir o erro do HTML
  senha?: string;
  role?: string;
  email?: string; // Adicionado caso precise
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarios: Usuario[] = [];

  constructor() { }

  // Retorna a lista de usuários
  listarUsuarios(): Usuario[] {
    return this.usuarios;
  }

  // Cria um novo usuário
  criarUsuario(user: string, pass: string, role: string): boolean {
    const novoUsuario: Usuario = { user: user, senha: pass, role: role };
    this.usuarios.push(novoUsuario);
    console.log('Usuário criado:', novoUsuario);
    return true; 
  }

  // Simula o Login (retorna uma Promise para funcionar o .catch que está no seu código)
  async login(email: string, pass: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Aqui você colocaria a lógica real. Por enquanto, vamos aprovar tudo.
      console.log('Login tentado com:', email);
      resolve({ message: 'Login realizado com sucesso', user: email });
      
      // Se quiser testar erro, descomente a linha abaixo:
      // reject({ message: 'Erro ao logar' });
    });
  }

  // Função de Logout
  logout(): void {
    console.log('Logout efetuado');
    // Aqui você limparia o token ou sessão
  }
}