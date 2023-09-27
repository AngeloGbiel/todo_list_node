# Todo List

## Objetivo Principal

O usuário terá uma **home** falando um pouco sobre o site, e duas possibilidades: se registrar ou efetuar o login. Após efetuar o login, o **header** irá mudar, e vai mostrar: **home, todo, logout**. A opção (rota) todo só ficará disponível após o usuário se cadastrar (rota privada), pois, dentro dessa rota, ficará as informações da lista de tarefa de cada usuário

# Backend

## Estrutura de pasta do backend:
- **helpers**: para funcões sem locais de uso fixo (para ajudar)
- **controllers**: intermediario entre o Model e a View (parecido com os das rotas)
- **db**: conexão com o banco de dados
- **models**: interação com o banco de dados e com o controllers
  - **User.js**: interação com o banco de dados do usuário (tabela **Users**)
  - **Todo.js**: interação com o banco de dados da lista de tarefas
- **routes**: conjunto de rotas com base do Controllers
  - **UserRouter.js:** rotas para manipulação dos usuários dentro do banco
- **public:** Diretório para salvar imagens
  - **images:** images dos usuários

## Dependências instaladas

```sh
npm i bcrypt cookie-parser cors express jsonwebtoken mysql2 sequelize multer nodemon dotenv express-async-errors
```
- **bcrypt:** É uma biblioteca para criptografar senhas. É comumente usada para armazenar senhas de forma segura em bancos de dados.
- **cookie-parser:** é uma biblioteca que facilita a manipulação de cookies HTTP em aplicativos Node.js. Os cookies são pequenos pedaços de dados armazenados no lado do cliente (navegador) e são frequentemente usados para manter o estado da sessão, lembrar preferências do usuário e realizar a autenticação do usuário.
- **cors:** O CORS é uma sigla para Cross-Origin Resource Sharing, que se refere a uma política de segurança implementada pelos navegadores da web. Essa política restringe solicitações feitas a um domínio diferente do domínio da página que está fazendo a solicitação. 
- **jsonwebtoken:** JSON Web Tokens (JWTs) são uma forma de representar informações de maneira segura entre duas partes. Eles são frequentemente usados para autenticação e autorização em aplicativos web e APIs. O jsonwebtoken permite criar tokens com informações específicas, assiná-los com uma chave secreta e verificá-los posteriormente para garantir sua integridade.
- **mysql2:** É um driver para interagir com bancos de dados MySQL a partir de aplicativos Node.js. Ele permite que você execute consultas SQL em um banco de dados MySQL.
- **sequelize:** Uma biblioteca ORM (Object-Relational Mapping) que simplifica a interação com bancos de dados relacionais, como MySQL, PostgreSQL, SQLite e outros, através de modelos JavaScript.
- **multer:** Facilita o upload de arquivos, como imagens e documentos, em seu aplicativo Node.js.
- **dotenv**: permite ler facilmente variaveis de ambiente 
- **express-async-errors**: O express-async-errors é um pacote Node.js que facilita o tratamento de erros assíncronos em aplicativos Express. Ele permite que você capture exceções assíncronas lançadas em rotas ou middleware e as direcione para o manipulador de erros do Express, em vez de deixá-las serem propagadas e potencialmente quebrarem seu aplicativo.

## Criando conexão com o banco de dados

Primeiro, vamos instalar o mysql-server

```sh
sudo apt install -y mysql-server #instala o mysql
sudo mysql_secure_installation # inicia os protocolos de segurança para a instalação do mysql
systemctl status mysql.service # Visualiza se o serviço está mesmo ativo
sudo mysql -u root # Estabelece uma conexão com o MySql

# Uma vez logado
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ab12345*';
CREATE DATABASE nodeapp;
SHOW DATABASES
```

Depois, vamos criar um banco de dados chamado **todolist**
```sh
create database todolist;
```
Agora estamos pronto para fazer a integração com o sequelize dentro do banco de dados

## Criando Variáveis de ambiente
- Primeiro, vamos criar um arquivo **.env** na raiz do projeto (pasta backend).
- Depois, vamos instalar o dotenv
- Depois vamos executar o comando **source .env**
- Depois, vamos importar para dentro do **conn.js** e inicializa-lo
