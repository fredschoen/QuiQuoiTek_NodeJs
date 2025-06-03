const express=require('express')
const cors = require('cors')
const app=express()
app.use(express.json())
app.use(cors())

const {Client}=require('pg')
const con=new Client({
    host:"localhost",
    user:"postgres",
    password:"fred",
    port:5432,
    database:"quiquoitekdb"
})


con.connect().then(()=> console.log("connected"))

app.get('/coucou',(req,res)=>{
    console.log("/coucou")
    res.send("get coucou")
})

app.get('/img1.jpg',(req,res)=>{
    console.log("/img1")
    res.sendFile(path.join(__dirname, "./doudou/img1.jpg"));})

app.post('/postData',(req,res)=>{
    console.log("/postData")
    const {nom,id}=req.body
    const insert_query="INSERT INTO public.qui (nom,id) VALUES ($1,$2)"
    con.query(insert_query,[nom,id],(err,result)=>{
        if(err) {
            res.end(err)
        } else{
            console.log(result)
            res.send("POSTED DATA")
        }

    })
})

app.listen(3000,()=>{
console.log("server is running...")
})
