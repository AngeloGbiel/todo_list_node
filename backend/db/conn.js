import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()


//definindo as variáveis de ambiente
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;

// instânciando o banco de dados
const conn = new Sequelize(name, 'root', password, {
    host: "localhost",
    dialect: "mysql"
})

export default conn;
