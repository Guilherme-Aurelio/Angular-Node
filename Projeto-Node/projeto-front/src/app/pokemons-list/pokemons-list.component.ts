import { Component, Input, OnInit } from '@angular/core';
import { PokemonsApiService } from '../pokemons-api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../login.service';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css']
})

export class PokemonsListComponent implements OnInit {
  searchTerm!: string;
  pokemons: any[] = [];
  pokemonsSelecionado?: any;

  constructor(
    private pokemonsApiService: PokemonsApiService, 
    private router: Router,
    private http: HttpClient,
    private LoginService: LoginService, private sharedDataService: SharedDataService) { }
  
   ngOnInit(): void {
    this.loadPokemonList();
  }
  
  loadPokemonList(): void {
    this.pokemonsApiService.getPokemonsList2().subscribe(
      (response) => {
        this.pokemons = response;
      },
      (error) => {
        console.error('Erro ao carregar a lista de Pokémon:', error);
      }
    );
  }

 /*   onListar(): void {
    this.pokemonsApiService.getPokemonsList().subscribe({
      next: (resultado: any) => (this.pokemons = resultado)
    });

  }  */

   onRowSelect(event: any): void {
    this.router.navigate(['/detalhes-list', event])
    ;
  }
  
  search() {
    this.pokemonsApiService.getPokemonsList2().subscribe(pokemons => {
      this.pokemons = pokemons.filter((pokemons: { pokemon_name: string; }) => pokemons.pokemon_name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    });
  }
  onLogoff(): void {
    this.LoginService.logoff();
    this.router.navigate(['/login']);
  }
  redirectToPokemonManagement(): void {
    this.router.navigate(['/pokemon-management']);
  }
  redirectToUsersList(): void {
    this.router.navigate(['/users-management']);
  }
}