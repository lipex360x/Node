<h1 align="center">API Rest Express Template</h1>

### E o que tem aqui dentro?
Este é um Template de API Rest Node utilizando o **Express** e **WebSocket**, configurada com suporte aos bancos de dados **Postgres**, **MongoDB** e **Redis** separados em containers **Docker**, contendo rotas de cadastro e edição de usuário com senha criptografada, controle de sessão utilizando **Token JWT** e envio de emails de arquivos através de **Background Jobs**, já no Start do Projeto.
Todos os campos sensíveis são validados.

Tudo isso com todo o ambiente de desenvolvimento devidamente configurado com ferramenta de monitoramento de erros, **linting** do código e snippets personalizados para ganho de produtividade.

___
### Tabela de Conteúdo
 
- [Start do Template (Leitura Obrigatória)](#start-do-template)
- [Bancos de Dados](#bancos-de-dados)
- [WebSocket](#websocket)
- [Rotas Iniciais](#rotas-iniciais)
- [VS Code Snippets](#vscode-snippets)

### Start do Projeto
Sim...
Você precisa ler e executar todos os passos para ter tudo funcionando direito :)
1. Para começar, instale as seguintes aplicações em seu sistema operacional:
* [NodeJS (via Package Manage)](https://nodejs.org/en/download/package-manager/)
* [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)
* [VS Code](https://code.visualstudio.com/download) 
* [Fonte FiraCode](https://github.com/tonsky/FiraCode) 
* [Docker](https://hub.docker.com/?overlay=onboarding)
* [Insomnia](https://insomnia.rest/download/)
* [Postbird](https://electronjs.org/apps/postbird)
* [MongoDB Compass](https://www.mongodb.com/download-center/compass)
* [Reactotron](https://github.com/infinitered/reactotron/releases)


2. Instale as seguintes extensões No **VS Code**:

```bash
Color Highlight
dotENV
Dracula Official
EditorConfig
ESLint
Git History
markdownlint
Material Icon Theme
Prettier
Rocketseat React Native
Rocketseat ReactJS
vscode-styled-components
```
3. Após instalado o *VS Code* com as extensões e a fonte *Fira Code*, acesse os Settings do **VS Code** em `settings.json (VS Code Preferences > settings.json)`apague tudo e cole o conteúdo contido no arquivo:
```bash
api_path
├── etc/
│....└── VSCodeSettings.json
```
4. Após instalado o **Insmonia**, importe o arquivo `InsomniaBaseAPI` disponível no diretório: 
```bash
api_path
├── etc/
│....└── InsomniaBaseAPI.json
```
5. Duplique o arquivo **.env.example** no diretório do template e renomeie-o para **.env**

6. Crie uma conta nos seguintes serviços:
* [Redsmin](https://www.redsmin.com): Essa é uma ferramenta de monitoramento de Bancos de Dados Redis.
Ao criar a conta, será gerada um comando ***Docker*** para gerar o container:
```bash

docker run -it --rm --name redsmin-proxy -e REDSMIN_KEY=YOUR_KEY -e REDIS_URI="redis://YOUR_REDIS_IP_ADDRESS:6379" redsmin/proxy
> OBS: no YOUR_REDIS_IP_ADDRESS, forneça o IP real da máquina e não o 127.0.0.1
```

* [Mailtrap](https://mailtrap.io/): Caixa de e-mail de Teste para a aplicação.
Copie os dados informados em **Integrations** > **Nodemailer** e substitua em **#MAIL SERVICE** no arquivo **.env** no diretório raiz do template

*  [Sentry](https://sentry.io/): Gerenciador de Erros da Aplicação.
Crie um projeto Express e copie o endereço DNS fornecido no script em ***Sentry.init*** e substitua em **#SENTRY** do arquivo **.env**

Pronto!
Agora é só configurar os bancos de dados...
___
### Bancos de Dados
Após criado o arquivo **.env**, as configurações iniciais dos Bancos de Dados devem ser alteradas no arquivo **Dockerfile** postgres localizado no diretório:

```bash
api_path
├── dockerfiles/
│....└── postgres.js > ENV POSTGRES
```
No diretório do template, via terminal execute:

```bash
docker-compose up -d
```
Este comando executará o arquivo **docker-compose.yml** localizado no path do template baixando as imagens docker do **Mongo**, **Postgres** e **Redis** caso estes já não estejam baixados, montando os containers com as configurações necessárias e iniciando-os em modo **daemon**.

Com os três containers em executação, ainda no diretório 
___
As configurações de carregamento do banco de dados Redis estão localizadas no arquivo **Queue.js** em:

```bash
api_path
├── src/
│....│── lib/
│....│....└── Queue.js > init(){}
```

___

### Rotas Iniciais
Depois de passar por todas as configurações, estamos prontos para subir os serviços da aplicação.

No diretório do Template, via **Terminal** execute os seguintes comandos:
```bash
> Inicia Servidor
yarn dev
```
```bash
> Executa as Migrations
yarn sequelize db:migrate
```
```bash
> Inicia Background Jobs
yarn queue

* Execute este comando em uma nova aba no terminal
```

**É necessário que os containers dos bancos de dados estejam em execução para que os serviços sejam iniciados sem falhas**

O Template já disponibiliza as seguintes rotas iniciais: 

http://localhost:3333
- ***/*** - Rota Inicial: Hello World
- ***/sendmail*** - Envio de email: Necessário ter cliente de envio configurado. Dado de envio é gravado no MongoDB
- ***/users*** - Cria usuário no banco Postgres
- ***/sessions*** - Cria token JWT com dados do usuário criado

As rotas abaixo necessitam de um Token JWT para serem acessadas.
Para configurá-la, execute a rota ***/sessions*** com os dados do usuário criado, copie o token gerado e altere a chave ***token_user*** no *Base Environment* no **Insomnia**
- ***/user/update*** Altera informações do usuário cadastrado
- ***/files*** - Envio de Arquivo: Dados são gravados no Postgres e arquivo salvo no diretório ***tmp***
___

### WebSocket
Todo o template tem acesso ao `socket.io` bastando para isso chamar dentro de uma function o `req.io`

Exemplo:

```bash
> backend: function em um controler
req.io.emit('mensagem', 'Hello World')

> frontend: 
socket.on('mensagem', data  => {
	console.log(data);
});
```
o **HelloController** dispara uma requisição Ws como exemplo ao ser enviado um get na rota "/"

Os parâmetros da conexão websocket estão configurados em:
```bash
api_path
├── src/
│....│── config/
│....│....└── websocket.js
```
___

### VSCode Snippets
Para agilizar a construção de ***models***, ***controllers***, ***migrations*** e afins, um arquivo de Snippets para ***VSCode*** está disponível em:
```bash
api_path
├── etc/
│....└── API.code-snippets
```
Crie um arquivo de Snippets no **VS Code** em **Preferences > User Snippets** e cole os dados do arquivo **API.code-snippets**

***### Lista de Snippets ###*** <br/><br/>
 **@ Sequelize Migrations @** 
```bash
api_path
├── src/
│....│── database/
│....│....│── migrations/
```
 *No diretório do template via terminal, execute os comandos abaixo para:*
```bash
> Criar Migration
yarn sequelize migration:create --name=MIGRATION-NAME
```
```bash
> Executar Migration no Banco de Dados
yarn sequelize db:migrate
```
```bash
> Desfazer execução da Migration
yarn sequelize db:migrate:undo[:all]
```
 - ***migTemplateTable*** - Template Migration para criar uma tabela no banco de dados
 - ***migTemplateColumn*** - Template Migration para adicionar coluna a uma tabela existente no banco de dados<br><br>
 
 **@ Models @** 
 
```bash
api_path
├── src/
│....│── app/
│....│....│── models/
```
- ***modelTemplate:*** Template Model
- ***modelAssociate:*** Static function para associação de tabelas
- ***virtualColumn:*** Coluna virtual desassociada do banco com método get()<br><br>

**@ Controllers @** 
 ```bash
api_path
├── src/
│....│── app/
│....│....│── controllers/
```
- ***controlTemplate:*** Template Controller;
- ***controlImport:*** Importação de um Controller no arquivo `api_path/routes.js`;
- ***asIndex:*** async index( ) function;
- ***asStore:*** async store( ) function;
- ***asUpdate:*** async update( ) function;
- ***asDelete:*** async delete( ) function;
- ***findByPk:*** await findByPk( );
- ***findOne:*** await findOne( );
- ***findAll:*** await findAll( { } );
- ***createValue:*** await Model.create( { } );<br><br>

**@ Mail @** 
 ```bash
api_path
├── src/
│....│── app/
│....│....│── views/
│....│....│....│── emails
│....│....│....│....│── layouts
│....│....│....│....│....└──default.hbs
```
- ***mailDefaultTemplate:*** ;
- ***mailTemplate:*** ;
- ***mailSend:*** ;<br><br>

**@ Bee Queue @** 
- ***jobTemplate:*** ;
- ***jobTemplateMail:*** ;
- ***jobCreate:*** ;<br><br>

**@ Middlewares @** 
- ***middleTemplate:*** ;
- ***middleImportLocal:*** ;
- ***middleImportGlobal:*** ;<br><br>

**@ Yup Validations @** 
- ***yupValidation:*** ;<br><br>

**@ Multer File Uploads @** 
- ***multerModel:*** ;
- ***multerControl:*** ;
- ***multerImport:*** ;<br><br>

**@ MongoDB @** 
- ***mongoSchemaTemplate:*** ;
- ***mongoCreate:*** ;
- ***mongoFind:*** ;
- ***mongoUpdate:*** ;<br><br>