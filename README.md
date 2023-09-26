# Todo List

## Objetivo Principal

O usuário terá uma **home** falando um pouco sobre o site, e duas possibilidades: se registrar ou efetuar o login. Após efetuar o login, o **header** irá mudar, e vai mostrar: **home, todo, logout**. A opção (rota) todo só ficará disponível após o usuário se cadastrar (rota privada), pois, dentro dessa rota, ficará as informações da lista de tarefa de cada usuário

# Backend

## Estrutura de pasta do backend:
- **helpers**: para funcões sem locais de uso fixo (para ajudar)
- **controllers**: intermediario entre o Model e a View (parecido com os das rotas)
- **db**: conexão com o banco de dados
- **models**: interação com o banco de dados e com o controllers
  - **User.js**: interação com o banco de dados do usuário
  - **Todo.js**: interação com o banco de dados da lista de tarefas
- **routes**: conjunto de rotas com base do Controllers
  - **UserRouter.js:** rotas para manipulação dos usuários dentro do banco:

## Dependências instaladas

```sh
npm i bcrypt cookie-parser cors express jsonwebtoken mysql2 sequelize multer nodemon 
```
- **bcrypt:** É uma biblioteca para criptografar senhas. É comumente usada para armazenar senhas de forma segura em bancos de dados.
- **cookie-parser:** é uma biblioteca que facilita a manipulação de cookies HTTP em aplicativos Node.js. Os cookies são pequenos pedaços de dados armazenados no lado do cliente (navegador) e são frequentemente usados para manter o estado da sessão, lembrar preferências do usuário e realizar a autenticação do usuário.
- **cors:** O CORS é uma sigla para Cross-Origin Resource Sharing, que se refere a uma política de segurança implementada pelos navegadores da web. Essa política restringe solicitações feitas a um domínio diferente do domínio da página que está fazendo a solicitação. 
- **jsonwebtoken:** JSON Web Tokens (JWTs) são uma forma de representar informações de maneira segura entre duas partes. Eles são frequentemente usados para autenticação e autorização em aplicativos web e APIs. O jsonwebtoken permite criar tokens com informações específicas, assiná-los com uma chave secreta e verificá-los posteriormente para garantir sua integridade.
- **mysql2:** É um driver para interagir com bancos de dados MySQL a partir de aplicativos Node.js. Ele permite que você execute consultas SQL em um banco de dados MySQL.
- **sequelize:** Uma biblioteca ORM (Object-Relational Mapping) que simplifica a interação com bancos de dados relacionais, como MySQL, PostgreSQL, SQLite e outros, através de modelos JavaScript.
- **multer:** Facilita o upload de arquivos, como imagens e documentos, em seu aplicativo Node.js.

