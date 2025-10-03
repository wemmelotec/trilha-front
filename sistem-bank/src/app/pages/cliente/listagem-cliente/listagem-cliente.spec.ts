import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCliente } from './listagem-cliente';

describe('ListagemCliente', () => {
  let component: ListagemCliente;
  let fixture: ComponentFixture<ListagemCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
