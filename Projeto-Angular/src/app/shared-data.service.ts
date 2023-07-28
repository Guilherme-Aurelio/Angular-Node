import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private updatedPokemonSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  getUpdatedPokemonObservable(): Observable<any> {
    return this.updatedPokemonSubject.asObservable();
  }

  updatePokemon(pokemonId: number, updatedPokemon: any): void {
    this.updatedPokemonSubject.next({ id: pokemonId, pokemon: updatedPokemon });
  }
}