# PocNavaFrontend #

Este projeto foi gerado utilizando o Angular CLI. Abaixo estão as instruções para configurar e rodar o projeto localmente.

Pré-requisitos
Antes de rodar o projeto, você precisa ter o seguinte instalado:

- Node.js (versão 16 ou superior) – Baixe aqui: https://nodejs.org/
- Angular CLI (versão 19.0.6 ou superior) – Para instalar, execute: npm install -g @angular/cli

Este projeto depende do backend do POC-NAVA para funcionar corretamente. Certifique-se de que o backend esteja configurado e rodando antes de iniciar o frontend.

# Rodando o Projeto #
Instalar as Dependências
No diretório do projeto, instale todas as dependências necessárias:

npm install

# Configurar a URL da API #

O frontend está configurado para consumir a API no caminho https://localhost:4001/api/User. Caso o seu backend esteja rodando em uma URL diferente, você deve modificar os caminhos de API no código do componente app.component.ts.

No arquivo src/app/app.component.ts, as URLs de API estão definidas da seguinte forma:


this.http.get<User[]>('https://localhost:4001/api/User') // Altere se necessário


Procure por todas as instâncias de https://localhost:4001/api e altere para o caminho correto da sua API.


# Iniciar o Servidor de Desenvolvimento #

Agora você pode rodar o servidor de desenvolvimento com o comando:

ng serve



Isso vai iniciar o servidor localmente. Abra o navegador e acesse:

http://localhost:4200/