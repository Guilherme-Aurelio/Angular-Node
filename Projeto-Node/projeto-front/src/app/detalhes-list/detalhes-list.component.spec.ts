import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesListComponent } from './detalhes-list.component';

describe('DetalhesListComponent', () => {
  let component: DetalhesListComponent;
  let fixture: ComponentFixture<DetalhesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
