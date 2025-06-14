const express=require('express')
const cors = require('cors')
const app=express()
const path = require('path')
const fs = require('fs')
app.use(express.json())
app.use(cors())
var listIdQui=""
const {Client}=require('pg')
const con=new Client({
    host:"localhost",
    user:"postgres",
    password:"fred",
    port:5432,
    database:"quiquoitekdb"
})


con.connect().then(()=> console.log("connected"))


app.get('/qui/:id',(req,res)=>{
    console.log(req.originalUrl);
    con.query("SELECT * FROM public.qui where id = " + req.params.id, (err, database) => {
        res.json(database)
    });
})

app.get('/suivant/:id',(req,res)=>{
    console.log(req.originalUrl);
    console.log('listIdQui='+listIdQui);
    const i =listIdQui.indexOf(';'+req.params.id.padStart(7, "0")+";")+9 //debut du suivant
    const sqlStatment="SELECT * FROM public.qui where id = "+listIdQui.substring(i,i+7)
    console.log("sqlStatment = "+sqlStatment)
    con.query(sqlStatment, (err, database) => {
        res.json(database)
    });
})

app.get('/quis', (req, res) => {
  console.log(req.originalUrl);
  con.query("SELECT * FROM public.qui where domaine < 'CINE'", (err, database) => {
    listIdQui=";"
    database.rows.forEach(qui => {
        listIdQui+=qui.id.toString().padStart(7, "0")+";";
    })
    res.json(database)
  });
})

app.get('/coucou',(req,res)=>{
    fs.readFile('coucou.png', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data) // Send the file data to the browser.
    })
})

app.get('/electro',(req,res)=>{
    //pour le chemin, on remonte d'un nveau: path.resolve
    fs.readFile(path.resolve("../electro.jpg"), function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data) // Send the file data to the browser.
    })
})

app.get('/imageQui/:id',(req,res)=>{
        console.log(req.originalUrl);

    //pour le chemin, on remonte d'un nveau: path.resolve
    const rep="../../QuoiQuiTek-4D_Folders/QuoiQuiTek-4D_Data/Photos/";
    const num=req.params.id;
    const nomFic="i"+num.toString().padStart(7, "0")+".png";
    const nomComplet=rep+nomFic;
    var imgPath=path.resolve(nomComplet);
    if (fs.existsSync(imgPath)) {
        console.log("img OK")
    }
    else {
        imgPath=path.resolve("../electro.jpg")
        console.log("img KO")
    }

    fs.readFile(imgPath, function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data) // Send the file data to the browser.
    })
})

app.get('/doudou',(req,res)=>{
    //pour le chemin, on descend d'un nveau: __dirname
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
