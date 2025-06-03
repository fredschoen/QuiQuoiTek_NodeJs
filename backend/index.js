const express=require('express')
const cors = require('cors')
const app=express()
const path = require('path')
var fs = require('fs')
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
    fs.readFile('image.png', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data) // Send the file data to the browser.
    })
})

app.get('/electro',(req,res)=>{
    console.log("/electro")
    fs.readFile(path.resolve("../electro.jpg"), function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data) // Send the file data to the browser.
    })
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
console.log('Server running at http://localhost:3000/')
})
