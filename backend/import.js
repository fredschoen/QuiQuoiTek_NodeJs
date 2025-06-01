const fs = require('node:fs');
const { prependListener } = require('node:process');
const {Client}=require('pg')
const con=new Client({
    host:"localhost",
    user:"postgres",
    password:"fred",
    port:5432,
    database:"quiquoitekdb"
})

con.connect().then(()=> console.log("connected"))

let nberr=0;
try {
    const data = fs.readFileSync('import/qui.csv', 'utf8');

    fs.appendFile('import/importqui.txt', 'debut importqui'+'\r', function (err) {
        if (err) throw err;
    });     
//console.log(data);
    let myArray1 = data.split("\r");
    for (let i = 1; i < myArray1.length; i++) {
        if(myArray1[i].length>20) {
            let myArray2 = myArray1[i].split("\t");
            console.log(myArray2[1]);
            fs.appendFile('import/importqui.txt', myArray2[1]+'\r', function (err) {
                if (err) throw err;
            });     
            if(myArray2[6].length>1000) {
                myArray2[6]=myArray2[6].substring(1, 1000);
            }
            let insert_query="INSERT INTO public.qui (";
            insert_query+="id,fullname,genre,pays,domaine,style,remarque,creatts,modifts,nom,prenom,datenaiss,datedeces"
            insert_query+=") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)";
            con.query(insert_query,myArray2,(err,result)=>{
                if(err) {
                    console.log(err)
                } else{
                    console.log("insert ok " + i)
                    fs.appendFile('import/importqui.txt', "insert ok " + i+'\r', function (err) {
                        if (err) throw err;
                    });     
                    nberr+=1;
                }
            })
        }
    }
    console.log("nberr="+nberr);
} catch (err) {
    console.error(err);
}
