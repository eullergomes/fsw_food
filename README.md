# Sistema de delivery de comida

![App](./public//fsw-food_img.png)

## 📖 Sobre

Este é um projeto de um sistema de delivery de comida que permite aos usuários fazerem pedidos de comidas em qualquer restaurante disponível no app. Todos os restaurantes, categorias e comidas são pegos do banco de dados Postgres usando Prisma como ORM.

## Funcionalidades
- Cadastro de clientes: os usuários podem realizar login no sistema através de sua conta Google ou Github.

- Carrinho de compras: carrinho de compras acessível em toda a aplicação com Context API.

- Pesquisa de restaurantes: os usuários podem realizar pesquisas a partir do nome do restaurante.

- Favoritar restaurantes: cada usuário pode favoritar e desfavoritar restaurantes, e visualizar seus restaurantes favoritados.

- Visualização de histórico de pedidos: cada usuário pode visualizar o seu histórico de pedidos de maneira individual e refazer qualquer pedido que já esteja concluído.

## Tecnologias utilizadas
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)


## Pré-requisitos
- Next.js (versão 14.2.3)
- Node.js

## Instalação
- Clone o repositório.
- Instale as dependências: npm install
- Configure as env: DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_ID, GITHUB_SECRET e NEXT_AUTH_SECRET
- Execute o aplicativo: npm run dev


## 🏆 Contribuição
* Sinta-se à vontade para contribuir, reportar problemas ou sugerir melhorias.
* Crie um fork do repositório, faça suas modificações e envie um pull request.