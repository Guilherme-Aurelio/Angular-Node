import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonsApiService } from '../pokemons-api.service';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { SharedDataService } from '../shared-data.service';
import { UsersApiService } from '../users-api.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-management',
  templateUrl: './pokemon-management.component.html',
  styleUrls: ['./pokemon-management.component.css']
})
export class PokemonManagementComponent implements OnInit {
  pokemonName: string = '';
  baseAttack: number = 0;
  baseDefense: number = 0;
  baseStamina: number = 0;
  form: string = '';
  pokemonId: number = 0;
  usuarioId: number = 0;
  selectedPokemon: any = {};
  @ViewChild('pokemonForm') editPokemonForm: any;
  isEditing: boolean = false;
  pokemonList: any[] = [];
  userList: any[] = [];
  selectedUserId: number = 0;
  searchPokemon: number = 0;
  searchPokemonId: number = 0;
  showPokemonList: boolean = true;
  constructor(private pokemonsApiService: PokemonsApiService, private router: Router, private LoginService: LoginService, private sharedDataService: SharedDataService, private usersApiService: UsersApiService) { }

  ngOnInit(): void {
    // Carregar a lista de Pokémon ao inicializar o componente
    this.loadPokemonList();
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
  getUserNomeById(usuarioId: number): string {
    const user = this.userList.find(user => user.codigo === usuarioId);
    return user ? user.nome : '';
  }
  searchPokemonById(): void {
    const foundPokemon = this.pokemonList.find(pokemon => pokemon.id === this.searchPokemonId);
    if (foundPokemon) {
      this.selectedPokemon = foundPokemon;
      this.showPokemonList = false;
    } else {
      alert('Pokémon não encontrado. Por favor, insira um ID válido.');
    }
  }

  // Novo método para limpar a pesquisa e mostrar a lista completa novamente
  clearSearch(): void {
    this.showPokemonList = true;
  }
  

  // Método para adicionar um novo Pokémon
  onSubmit(): void {
    if (this.isEditing) {
      this.onSubmitEdit();
    } else {
      this.addPokemon();
    }
  }
  addPokemon(): void {
    const newPokemon = {
      pokemon_name: this.pokemonName,
      base_attack: this.baseAttack,
      base_defense: this.baseDefense,
      base_stamina: this.baseStamina,
      form: this.form,
      pokemon_id: this.pokemonId,
      usuario_id: this.selectedUserId
    };

    this.pokemonsApiService.addPokemon(newPokemon).subscribe(
      (response) => {
        this.loadPokemonList();
        this.clearForm();
        alert('Pokémon criado com sucesso!');
      },
      (error) => {
        console.error('Erro ao adicionar Pokémon:', error);
        alert('Erro ao criar Pokémon. Por favor, tente novamente.');
      }
    );
  }

  // Método para carregar a lista de Pokémon existentes
  loadPokemonList(): void {
    this.pokemonsApiService.getPokemonsList2().subscribe(
      (response) => {
        this.pokemonList = response;
      },
      (error) => {
        console.error('Erro ao carregar a lista de Pokémon:', error);
      }
    );
  }

  // Método para editar um Pokémon existente
  editPokemon(pokemon: any): void {
    console.log('Editando Pokémon:', pokemon);
    this.isEditing = true;
    // Define o Pokémon selecionado para edição
    this.selectedPokemon = JSON.parse(JSON.stringify(pokemon));
    console.log('Selected Pokemon:', this.selectedPokemon);
      // Preenche o formulário com os valores do Pokémon selecionado
    this.pokemonName = this.selectedPokemon.pokemon_name;
    this.baseAttack = this.selectedPokemon.base_attack;
    this.baseDefense = this.selectedPokemon.base_defense;
    this.baseStamina = this.selectedPokemon.base_stamina;
    this.form = this.selectedPokemon.form;
    this.pokemonId = this.selectedPokemon.pokemon_id;
    this.selectedUserId = this.selectedPokemon.usuario_id;
  }

  onSubmitEdit(): void {
    const updatedPokemon = {
      pokemon_name: this.pokemonName,
      base_attack: this.baseAttack,
      base_defense: this.baseDefense,
      base_stamina: this.baseStamina,
      form: this.form,
      pokemon_id: this.selectedPokemon.id,
      usuario_id: this.selectedUserId
    };
    if (!this.selectedPokemon) {
      console.error('Nenhum Pokémon selecionado para edição.');
      return;
    }
    console.log('Valor de this.selectedPokemon:', this.selectedPokemon);
    console.log('updatedPokemon:', updatedPokemon);
    console.log('Valor de updatedPokemon.pokemon_id:', updatedPokemon.pokemon_id);
    if (!updatedPokemon.pokemon_id) {
      throw new Error('O campo pokemon_id não pode estar vazio.');
    }
    if (this.selectedPokemon) {
      updatedPokemon.pokemon_id = this.selectedPokemon.pokemon_id;
    } else {
      throw new Error('The selectedPokemon object is null.');
    }
    console.log('Valor de this.selectedPokemon.id antes de chamar editPokemon:', this.selectedPokemon.id);
    
    this.pokemonsApiService.editPokemon(this.selectedPokemon.id, updatedPokemon).subscribe(
      (response) => {
        console.log(response);
        this.loadPokemonList();
        this.sharedDataService.updatePokemon(this.selectedPokemon.id, updatedPokemon);
        this.clearForm();
        alert('Pokémon atualizado com sucesso!');
      },
      (error) => {
        console.error('Erro ao editar Pokémon:', error);
        alert('Erro ao atualizar Pokémon. Por favor, tente novamente.');
      }
    );
  }

  cancelEdit(): void {
    if (this.selectedPokemon) {
      this.isEditing = false;
      this.clearForm();
    }
  }

  // Método para excluir um Pokémon existente
  deletePokemon(pokemon: any): void {
    console.log('Excluir Pokémon:', pokemon);
    if (confirm(`Deseja excluir o Pokémon ${pokemon.pokemon_name}?`)) {
      this.pokemonsApiService.deletePokemon(pokemon.id).subscribe(
        (response) => {
          this.pokemonList = this.pokemonList.filter(p => p.id !== pokemon.id);
          this.loadPokemonList();
          alert('Pokémon excluído com sucesso!');
        },
        (error) => {
          console.error('Erro ao excluir Pokémon:', error);
          alert('Erro ao excluir Pokémon. Por favor, tente novamente.');
        }
      );
    }
  }

  redirectToPokemonsList(): void {
    this.router.navigate(['/pokemons-list']);
  }
  redirectToUsersList(): void {
    this.router.navigate(['/users-management']);
  }
  onLogoff(): void {
    this.LoginService.logoff();
    this.router.navigate(['/login']);
  }
    // Método para limpar os campos do formulário após adicionar
    clearForm(): void {
      this.pokemonName = '';
      this.baseAttack = 0;
      this.baseDefense = 0;
      this.baseStamina = 0;
      this.form = '';
      this.pokemonId = 0;
      this.usuarioId = 0;
      this.editPokemonForm.resetForm();
    }
}