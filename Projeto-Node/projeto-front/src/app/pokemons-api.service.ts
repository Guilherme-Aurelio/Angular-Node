import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonsApiService {
  private apiUrl = 'http://localhost:3000/pokemons';
  
  constructor(private http: HttpClient) { }
  
  getPokemonsList(): Observable<any>{
    return this.http.get(
      'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json?rapidapi-key=19d7f85771msh205b0954ee20b54p1610dcjsna360290140be');
      }
  

  listarUsuarioPeloID(pokemon_id: number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(map((value: any) => value[pokemon_id]));
  }

/*   listarUsuarioPeloID(pokemon_id: number): Observable<any> {
    return this.http
      .get(
        'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json?rapidapi-key=19d7f85771msh205b0954ee20b54p1610dcjsna360290140be'
      ).pipe(map((value: any) => value[pokemon_id]));
  } */
  
  
  getPokemonsList2(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) => {
        // Faz uma cópia profunda dos dados antes de retorná-los
        return JSON.parse(JSON.stringify(data));
      })
    );
  }

  addPokemon(newPokemon: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newPokemon);
  }

  editPokemon(pokemonId: number, updatedPokemon: any): Observable<any> {
     // Verificar se o objeto updatedPokemon possui todas as propriedades necessárias
  const requiredProperties = ['base_attack', 'base_defense', 'base_stamina', 'form', 'pokemon_name', 'pokemon_id', 'usuario_id'];

  for (const prop of requiredProperties) {
    if (!updatedPokemon.hasOwnProperty(prop)) {
      throw new Error(`Objeto updatedPokemon não possui a propriedade '${prop}' necessária para a edição.`);
    }
  } 
    const url = `${this.apiUrl}/${pokemonId}`;
    return this.http.put<any>(url, updatedPokemon);
  }

  deletePokemon(pokemonId: number): Observable<any> {
    const url = `${this.apiUrl}/${pokemonId}`;
    return this.http.delete<any>(url);
  }
}
