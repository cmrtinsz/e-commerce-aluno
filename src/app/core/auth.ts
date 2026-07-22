import {signal} from "@angular/core";

//! Define valor inicial do Signal usuarioLogado com (false)
export const usuarioLogado = signal (false);

//! Define Signal usuarioLogado com (true), permite acesso as rotas
export function login(){
    usuarioLogado.set(true);
}


//! Define Signal usuarioLogado com (False), bloqueia acesso imediatamente
export function logout(){
    usuarioLogado.set(false);
}