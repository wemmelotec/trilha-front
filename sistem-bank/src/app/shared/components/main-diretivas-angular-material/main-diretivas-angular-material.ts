import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-main-diretivas-angular-material',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatBadgeModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './main-diretivas-angular-material.html',
  styleUrl: './main-diretivas-angular-material.scss'
})
export class MainDiretivasAngularMaterial {
  // Dados mockados para a tabela
  mockData = [
    { nome: 'João', email: 'joao@email.com' },
    { nome: 'Maria', email: 'maria@email.com' },
    { nome: 'Pedro', email: 'pedro@email.com' }
  ];

  // Método chamado ao clicar em Editar
  editar(element: any) {
    alert('Editar: ' + element.nome);
  }

  // Método chamado ao clicar em Excluir
  excluir(element: any) {
    alert('Excluir: ' + element.nome);
  }
}
