import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  standalone: false,

  templateUrl: './listar-pensamento.component.html',
  styleUrl: './listar-pensamento.component.css',
})
export class ListarPensamentoComponent {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  hasMaisPensamentos: boolean = true;
  filtro: string = '';
  isFavorito: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.isFavorito).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.isFavorito).subscribe((listaPensamentos) => {
      this.listaPensamentos.push(...listaPensamentos);

      if (!listaPensamentos.length) {
        this.hasMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamentos() {
    this.hasMaisPensamentos = true;
    this.paginaAtual = 1;

    this.service.listar(this.paginaAtual, this.filtro, this.isFavorito).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  listarFavoritos() {
    this.hasMaisPensamentos = true;
    this.paginaAtual = 1;
    this.isFavorito = true;
    this.titulo = 'Meus Favoritos'

    this.service.listar(this.paginaAtual, this.filtro, this.isFavorito)
      .subscribe((listaPensamentosFavoritos) => {
        this.listaPensamentos = listaPensamentosFavoritos;
        this.listaFavoritos = listaPensamentosFavoritos;
      });
  }

  recarregarComponente() {
    this.hasMaisPensamentos = true;
    this.paginaAtual = 1;
    this.isFavorito = false;

    this.router.navigate([this.router.url]);
  }
}
