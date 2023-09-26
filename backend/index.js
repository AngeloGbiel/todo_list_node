import express from 'express'
import conn from './db/conn.js'
import cors from 'cors'

const app = express()
const port = 3000


app.use(express.json())
app.use(express.static('public'))
// Solve CORS - allows the API to access this route without issue
app.use(cors({
    credentials: true, origin: 'http://localhost:5173' //porta do front end
}))

conn.sync().then(()=>{
    app.listen(port,()=>{
        console.log(`App rodando na porta: ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})