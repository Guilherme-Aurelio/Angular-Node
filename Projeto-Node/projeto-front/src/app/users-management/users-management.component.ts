import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  userList: any[] = [];
  isEditing: boolean = false;
  nome: string = '';
  email: string = '';
  senha: string = '';
  selectedUser: any;

  constructor(private usersApiService: UsersApiService, private router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.loadUserList();
  }

  loadUserList(): void {
    this.usersApiService.getUsersList().subscribe(
      (response) => {
        this.userList = response;
      },
      (error) => {
        console.error('Erro ao carregar a lista de usuários:', error);
      }
    );
  }

  addNewUser(): void {
    this.isEditing = true;
    this.nome = '';
    this.email = '';
    this.senha = '';
  }

  editUser(user: any): void {
    this.isEditing = true;
    this.selectedUser = user;
    this.nome = user.nome;
    this.email = user.email;
    this.senha = '';
  }

  onSubmit(): void {
      const newUser = {
        nome: this.nome,
        email: this.email,
        senha: this.senha
      };
  
      if (this.selectedUser) {
        this.editExistingUser();
      } else {
        this.usersApiService.addUser(newUser).subscribe(
          (response) => {
            this.loadUserList();
            this.cancelEdit();
            alert('Usuário criado com sucesso!');
          },
          (error) => {
            console.error('Erro ao adicionar usuário:', error);
            alert('Erro ao adicionar usuário!');
          }
        );
      }
    }

  addUser(): void {
    const newUser = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.usersApiService.addUser(newUser).subscribe(
      (response) => {
        if (response && response.codigo) {
          this.loadUserList();
          this.cancelEdit();
          alert('Usuário criado com sucesso!');
        } else {
          console.error('Erro ao adicionar usuário: resposta inválida do servidor');
        }
      },
      (error) => {
        console.error('Erro ao adicionar usuário:', error);
        alert('Erro ao adicionar usuário!');
      }
    );
  }

  editExistingUser(): void {
    const updatedUser = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.usersApiService.editUser(this.selectedUser.codigo, updatedUser).subscribe(
      (response) => {
        this.loadUserList();
        this.cancelEdit();
        alert('Usuário alterado com sucesso!');
      },
      (error) => {
        console.error('Erro ao editar usuário:', error);
        alert('Erro ao editar usuário.');
      }
    );
  }

  deleteUser(user: any): void {
    if (confirm(`Deseja excluir o usuário ${user.nome}?`)) {
      this.usersApiService.deleteUser(user.codigo).subscribe(
        (response) => {
          this.loadUserList();
          alert('Usuário excluido com sucesso!');
        },
        (error) => {
          console.error('Erro ao excluir usuário:', error);
          alert('Erro ao excluir usuário.');
        }
      );
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedUser = null;
    this.nome = '';
    this.email = '';
    this.senha = '';
  }
  redirectToPokemonsList(): void {
    this.router.navigate(['/pokemons-list']);
  }
  redirectToPokemonsManagement(): void {
    this.router.navigate(['/pokemon-management']);
  }
  onLogoff(): void {
    this.LoginService.logoff();
    this.router.navigate(['/login']);
  }
}
