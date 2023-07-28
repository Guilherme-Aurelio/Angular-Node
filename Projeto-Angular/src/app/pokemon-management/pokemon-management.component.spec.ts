import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonManagementComponent } from './pokemon-management.component';

describe('PokemonManagementComponent', () => {
  let component: PokemonManagementComponent;
  let fixture: ComponentFixture<PokemonManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
