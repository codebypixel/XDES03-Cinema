
<h1 align="center">
🎬🍿<br>CineNTT - Projeto de Catálogo de Filmes
</h1>

Bem-vindo ao repositório do projeto *CineNTT*, um catálogo de filmes desenvolvido com Angular. Este projeto tem como objetivo proporcionar uma experiência de busca e navegação de filmes populares, com sistema de favoritos e uma simulação de um ambiente de autenticação para o usuário.

<p align="center">
<img src="/public/bannerCineNTT.png">
<p>

---

## Sumário  
1. [Introdução](#introdução)
2. [Como executar](#como-executar)
3. [Páginas da Aplicação](#páginas-da-aplicação)  
4. [Bibliotecas e Dependências Utilizadas](#bibliotecas-e-dependências-utilizadas)  

## Introdução 

Este projeto foi desenvolvido como parte de um desafio técnico. O objetivo principal é permitir que o usuário explore um catálogo de filmes, crie sua conta, salve favoritos e pesquise por títulos específicos, com acessibilidade e uma boa experiência ao usuário. Apesar de ter sido pedido apenas uma aplicação SPA, a frase "Junto com este material você deve ter recebido um wireframe para usar como norte do seu layout,
porém sinta-se livre para ir além" me motivou a ir bem mais além da proposta inicial!

## Como executar

Para iniciar, execute o comando ```npm install```, depois abra a pasta backend e execute ```npm install```.
Volte para origem e execute o comando ```npm start``` para iniciar o front e ```npm run server``` para executar o backend com express.

## Páginas da Aplicação

### Login

Página para autenticação do usuário. Permite acesso ao sistema com um e-mail registrado anteriormente.

### Signup

Página de cadastro, onde novos usuários podem criar sua conta no sistema utilizando suas credenciais de nome, email e foto.

### Populares

Página inicial que exibe os filmes mais populares no momento. Os dados são carregados da API TMDB.

### Search

Página de busca que permite ao usuário procurar por títulos específicos. Exibe uma lista de filmes relacionados à pesquisa realizada, os dados são carregados da API OMDB.

### Favoritos

Página onde o usuário pode visualizar e gerenciar os filmes que foram marcados como favoritos.

### Movie/:title

Página onde o usuário vê os dados detalhados do filme escolhido por busca ou por listagem de populares, o detalhamento é feito usando os dados da API OMDB.

## Bibliotecas e Dependências Utilizadas

- @angular/core: ```^18.2.0```
- @angular/router: ```^18.2.0```
- angular-toastify: ```^2.0.0```
- bootstrap: ```^5.3.3```
- rxjs: ```~7.8.0```
- express: ```^4.21.1```,
- nodemon: ```^3.1.7```
