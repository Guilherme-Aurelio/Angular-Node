import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { DetalhesListComponent } from './detalhes-list/detalhes-list.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { PokemonManagementComponent } from './pokemon-management/pokemon-management.component';
import { UsersManagementComponent } from './users-management/users-management.component'; // Importe o novo componente

const routes: Routes = [
  { path: 'pokemons-list', component: PokemonsListComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-list/:id', component: DetalhesListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'pokemon-management', component: PokemonManagementComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users-management', component: UsersManagementComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
