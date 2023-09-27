import express from 'express'
import conn from './db/conn.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/UserRoute.js'
import "express-async-errors"

const app = express()
const port = 3000


app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser()) // Use o cookie-parser como middleware
app.use(cors({ // Solve CORS - allows the API to access this route without issue
    credentials: true, origin: 'http://localhost:5173' //porta do front end
}))
app.use(router)
app.use( //lida com tratamentos de erros
    (err,req,res,next) =>{
        return res.json({
            message: err.message,
            status: "Error"
        })
    }
)
conn
// .sync({force:true})
.sync()
.then(()=>{
    app.listen(port,()=>{
        console.log(`App rodando na porta: ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})