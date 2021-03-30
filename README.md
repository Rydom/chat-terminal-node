# Introdução

Este é um projeto realizado na Semana js-expert 3.0, ele consiste em uma aplicação de chat com comunicação em tempo real que roda em terminal (Prompt de comando).

O projeto foi desonvolvido com o design pattern <b>Builder</b>,  <b>Web Socket nativo</b> (sem bibliotecas externas, vulgo socket.io)  através do protocolo http/https para realizar a comunicação em tempo real e o blessed para gerar a interface de terminal, além de é claro <b>Node.js</b>.

## Principais bibliotecas/frameworks
*  [NodeJS](https://nodejs.org/en/)
*  [Blessed](https://github.com/chjj/blessed)
*  Builder pattern


## O que é necessário
Para rodar esse projeto você precisa ter a versão do Node 15. 

## Instalação
Após instalar o node, rode o seguinte comando dentro da pasta client e depois na pasta server:
`npm install`

## Como rodar o projeto

### Servidor
Esse projeto consiste em duas aplicações, client e server. Para inicializar o servidor, entre na raiz da pasta server dentro do seu terminal e digite 

`npm run start`

Caso queira fazer modificações sugiro que utilize o comando: `npm run dev`.  Com esse comando o servidor irá utilizar a biblioteca [Nodemon](https://nodemon.io/) que atualiza a aplicação sempre que houver modificações nos arquivos do projeto.

### Cliente
Para usar o cliente e se conectar ao chat, abra um novo terminal e entre na pasta client, após isso utilize o comando: `npm run user01`.
Você também pode utilizar alguns scripts definidos no package.json como user02, user03 e user04 para se conectar ao chat rodando em localhost.

#### Produção
Caso você tenha hospedado o servidor para produção existe 2 scripts que estão preparados pra isso: `npm run user05` e o `npm run user06`. 
Porém é necessário configurar a variável `PRODUCTION_URL`. 

Para definir essa variável, dentro do projeto client vá para "scr/cliConfig.js", nesse arquivo vc irá encontrar na primeira linha o seguinte trecho:

 `const PRODUCTION_URL = '<URL PRODUCTION>'`.

Agora basta trocar `<URL PRODUCTION>` pela url onde está hospedado o seu servidor.
