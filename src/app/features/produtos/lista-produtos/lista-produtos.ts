import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import {computed} from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
 produtos = signal([
    { 
      nome: 'Teclado Gamer', 
      preco:149.00
    },
    {
      nome: 'Mouse Gamer', 
      preco:299.99
    },
    {
      nome: 'Monitor Gamer', 
      preco:1599.99
    },
    {
      nome: 'Desktop Gamer', 
      preco:4999.99
    },
    {
      nome: 'Headset Gamer', 
      preco:699.99
    }
  ]);
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome); 
  }
     adicionarProduto(){
      this.produtos.update(listaAtual => [
        ...listaAtual, {nome:'Sony Playstation 5', preco:646}
      ]);
  }
  totalProdutos = computed (() => this.produtos().length);
  
  valorTotal = computed(()=> { return this.produtos().reduce((total, item) => total + item.preco,0)});
  
  substituirProdutos (){
    this.produtos.set([
      {nome: 'Arroz Fazenda', preco: 5}, 
    ]);
}
}
