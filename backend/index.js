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


app.get('/qui', (req, res) => {
  console.log("get qui");
  con.query("SELECT * FROM public.qui where id = 589", (err, database) => {
    res.json(database)
  });
})

app.get('/quis', (req, res) => {
  console.log("get quis");
  con.query("SELECT * FROM public.qui where nom < 'B'", (err, database) => {
    res.json(database)
  });
})

app.get('/coucou',(req,res)=>{
    console.log("/coucou");
    fs.readFile('coucou.png', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data) // Send the file data to the browser.
    })
})

app.get('/electro',(req,res)=>{
    console.log("/electro");
    //pour le chemin, on remonte d'un nveau: path.resolve
    fs.readFile(path.resolve("../electro.jpg"), function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data) // Send the file data to the browser.
    })
})

app.get('/doudou',(req,res)=>{
    //pour le chemin, on descend d'un nveau: __dirname
    console.log("/doudou");
    res.sendFile(path.join(__dirname, "images/doudou.jpg"));
})

app.post('/postData',(req,res)=>{
    console.log("/postData");
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
