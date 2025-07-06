const path = require('path');
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

    var filePath=path.resolve("../csv/Qui.csv");
    if (fs.existsSync(filePath)) {
        console.log("csv trouvé : " + filePath)
    }
    else {
        console.log("!!! csv non trouvé : " + filePath)
    }
    const data = fs.readFileSync(filePath, 'utf8');

    fs.appendFile('logimportqui.txt', 'debut importqui'+'\r', function (err) {
        if (err) throw err;
    });     
//console.log(data);
    let myArray1 = data.split("\r");
    for (let i = 1; i < myArray1.length; i++) {
        if(myArray1[i].length>20) {
            let myArray2 = myArray1[i].split("\t");
            console.log(myArray2[0]+ "; "+myArray2[1]+ "; "+myArray2[2]+ "; "+myArray2[3]+ "; "+myArray2[4]+ "; "+myArray2[5]+ "; "+myArray2[6]+ "; "+myArray2[7]+ "; "+myArray2[8]+ "; "+myArray2[9]+ "; "+myArray2[10]+ "; "+myArray2[11]+ "; "+myArray2[12]);
            fs.appendFile('logimportqui.txt', myArray2[1]+'\r', function (err) {
                if (err) throw err;
            });     
            // if(myArray2[6].length>1000) {
            //     myArray2[6]=myArray2[6].substring(1, 1000);
            // }
            if (myArray2.length>13) {
                console.log("myArray2.length="+ myArray2.length);
                myArray2.splice(-1); //supprimer le dernier element du tableau
                console.log("myArray2.length="+ myArray2.length);
            }
            let insert_query="INSERT INTO public.qui (";
            insert_query+="id,fullname,genre,pays,domaine,style,remarque,creatts,modifts,nom,prenom,datenaiss,datedeces"
            //ID	FullName	Genre	Pays	Domaine	Style	Info	CreatTS	ModifTS	Nom	Prenom	DateNaiss	DateDeces

            insert_query+=") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)";
            con.query(insert_query,myArray2,(err,result)=>{
                if(err) {
                    console.log(err)
                } else{
                    console.log("insert ok " + i)
                    fs.appendFile('logimportqui.txt', "insert ok " + i+'\r', function (err) {
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
