import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { DetalhesListComponent } from './detalhes-list/detalhes-list.component';

import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import {AccordionModule} from 'primeng/accordion'; 
import {MenuItem} from 'primeng/api';  
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
// import { AuthGuardModule } from './auth-guard/auth-guard.module';
import { LoginComponent } from './login/login.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PokemonManagementComponent } from './pokemon-management/pokemon-management.component';
import { AuthInterceptor } from './auth.interceptor';
import { UsersManagementComponent } from './users-management/users-management.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    PokemonsListComponent,
    DetalhesListComponent,
    LoginComponent,
    PokemonManagementComponent,
    UsersManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    AccordionModule,
    FormsModule,
    InputTextModule,
    CardModule,
    PanelModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule
    // AuthGuardModule,
  ],
  providers: [ // Registre o AuthInterceptor como provedor
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
