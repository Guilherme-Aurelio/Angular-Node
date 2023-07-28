import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { faEye as farEye } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { NgForm } from '@angular/forms';

library.add(faEye, farEye, faEyeSlash);
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private loginService: LoginService, private router: Router) {}
  email = '';
  hide = false;
  senha = '';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  mensagemErro = '';

  isPasswordVisible = false;

  get buttonText(): string {
    return this.hide ? 'Esconder a senha' : 'Exibir a senha';
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  onLogin(): void {
    this.mensagemErro = '';
    this.loginService.login(this.email, this.senha).subscribe(
      (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token armazenado no localStorage:', response.token);
          this.router.navigate(['/pokemon-management']);
        } else {
          this.mensagemErro = 'Login ou senha inválidos.';
        }
      },
      (error) => {
        console.error('Erro ao realizar o login:', error);
        this.mensagemErro = 'Ocorreu um erro ao processar o login. Por favor, tente novamente.';
      }
    );
  }
}

  /* onLogin(): void {
    this.mensagemErro = '';
    this.loginService.login(this.usuario, this.senha).subscribe(
      (response) => {
        if (response && response.token) {
          localStorage.setItem('autenticado', 'sim');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/pokemons-list']);
        } else {
          this.mensagemErro = 'Login ou senha inválidos.';
        }
      },
      (error) => {
        console.error('Erro ao realizar o login:', error);
        this.mensagemErro = 'Ocorreu um erro ao processar o login. Por favor, tente novamente.';
      }
    );
  }
} */
  /* onLogin(): void {
    this.mensagemErro = '';
    if (this.loginService.login(this.usuario, this.senha)) {
      this.router.navigate(['/pokemons-list']);
    }
    else {
      this.mensagemErro = 'Login ou senha inválidos.';
    }
  }
} */
