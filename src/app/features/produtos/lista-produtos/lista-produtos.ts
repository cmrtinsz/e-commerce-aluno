import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import {computed} from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { UpperCasePipe } from '@angular/common';
import {effect} from '@angular/core'

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
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
    //console.log ('Produto Selecionado: ', nome); 
    this.produtoSelecionado.set(nome);
  }
     adicionarProduto(){
      this.produtos.update(listaAtual => [
        ...listaAtual, {nome:'Processador Intel Core i5 ', preco:646}
      ]);
  }
  totalProdutos = computed (() => this.produtos().length);
  
  valorTotal = computed(()=> { return this.produtos().reduce((total, item) => total + item.preco,0)});
  
  substituirProdutos (){
    this.produtos.set([
      {nome: 'Teclado', preco: 40},
       {nome: 'Mouse', preco: 10},
       {nome: 'Monitor', preco: 100},
       {nome: 'Desktop', preco: 500},
       {nome: 'Headset', preco: 25},
    ]);
}
constructor(){
  effect(() =>{
    console.log('Lista de Produtos Alterados: ', this.produtos())
  });
  effect(() => {
console.log('Valor Total atualizado: ', this.valorTotal());
  });
  effect(() => {
if (typeof document !== 'undefined') {
  document.title = `(${this.totalProdutos()}) Minha Loja`;
    }
   });
  }
  produtoSelecionado = signal<string | null> (null);
  carrinho = signal<{ nome: string; preco: number}[]>([]);
  adicionarAocarrinho(produto:{nome: string; preco: number}){
    this.carrinho.update(listaAtual => [
      ...listaAtual,produto])};
      quantidadeCarrinho = computed (() => this.carrinho().length);
      totalCarrinho = computed(() => {
        return this.carrinho().reduce((total, item) =>
          total + item.preco,0);
      });
}
