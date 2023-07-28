import { Component, OnInit } from '@angular/core';
import { PokemonsApiService } from '../pokemons-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../login.service';


@Component({
  selector: 'app-detalhes-list',
  templateUrl: './detalhes-list.component.html',
  styleUrls: ['./detalhes-list.component.css']
})
export class DetalhesListComponent implements OnInit {
  id= 0;
  nome = '';
  forma = '';
  ataque = '';
  defesa = '';
  stamina = '';
  
  constructor(
    private activaRoute: ActivatedRoute,
    private pokemonsApiService: PokemonsApiService,
    private router: Router,
    private LoginService: LoginService) { }

  ngOnInit(): void {
    this.activaRoute.paramMap.subscribe({
      next: (rota: any) => {
        this.id = rota.params.id;
        this.pokemonsApiService.listarUsuarioPeloID(this.id).subscribe({
          next: (retorno: any) => {
            this.nome = retorno.pokemon_name;
            this.forma = retorno.form;
            this.ataque = retorno.base_attack;
            this.defesa = retorno.base_defense;
            this.stamina = retorno.base_stamina;
          },
          });
      },
    });
  }
  voltar(): void {
    this.router.navigateByUrl('/pokemons-list');
  }
  onLogoff(): void {
    this.LoginService.logoff();
    this.router.navigate(['/login']);
  }
}
