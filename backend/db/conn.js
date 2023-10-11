import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

//definindo as variáveis de ambiente
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;
console.log(password)

// instânciando o banco de dados
const conn = new Sequelize(name, 'root', password, {
    host: "db", //db - nome do serviço dentro do docker-compose
    dialect: "mysql"
})

export default conn;
