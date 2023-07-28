import { TestBed } from '@angular/core/testing';

import { PokemonsApiService } from './pokemons-api.service';

describe('PokemonsApiService', () => {
  let service: PokemonsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
