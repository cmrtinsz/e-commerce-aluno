import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { usuarioLogado, login, logout } from './core/auth';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce-aluno');
  nomeLoja = 'Lua Goods'; //Nome do e-commerce
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
}
