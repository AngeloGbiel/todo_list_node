import express from 'express'
import conn from './db/conn.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import UserRouter from './routes/UserRoute.js'
import TodoRouter from './routes/TodoRoutes.js'
import "express-async-errors"

const app = express()
const port = 3000


app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser()) // Use o cookie-parser como middleware
app.use(cors({ // Solve CORS - allows the API to access this route without issue
    credentials: true, origin: 'http://localhost' //porta do front end
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost'); // Permitir solicitações do domínio http://localhost
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(UserRouter)
app.use('/todo', TodoRouter)

app.use( //lida com tratamentos de erros
    (err,req,res,next) =>{
        return res.json({
            message: err.message,
            status: "Error"
        })
    }
)
conn
//.sync({force:true})
.sync()
.then(()=>{
    app.listen(port,()=>{
        console.log(`App rodando na porta: ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})