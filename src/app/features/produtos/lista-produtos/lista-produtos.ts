import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import {computed} from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { UpperCasePipe } from '@angular/common';
import {effect} from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //! remover a lista de produtos, dados carregados via API fakestoreapi
 produtos = signal <{
  nome: string ; preco: number }[]> ([]);
//? criar estado de carregamento
//** true: requisição em andamento, exibir indicador no template
//! false: esconder indicador e exibir a
  carregando = signal(true);

  //! cria o método para a requisição dos produtos
  carregarProdutos(){
    //! iniciar loadging 
    this.carregando.set(true);
    this.http.get<{title: string; price: number }[]>
    ('https://fakestoreapi.com/products')
    .subscribe({
      next: (dados) => {

        //!adapta a api para nosso projeto 
        const produtosFormatados = dados.map(p =>({
nome: p.title,
preco:p.price
        }));
        this.produtos.set(produtosFormatados);
        this.carregando.set(false);
      },
      //?Finaliza loagding
      error: (erro) =>{
        console.error('Erro ao carregar produtos: ', erro);
        this.carregando.set(false);
      }
      });
    }

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
//! injetar httpClient dentro de construct, restruturar construct!
constructor( private http: HttpClient ){

  //! carregar a API
  
  this.carregarProdutos();
 
  //! effects continuam iguais 
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
