import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb'
/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const adminRouter=express.Router()
const clientRouter=express.Router()

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); 
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.redirect('/client')
})

clientRouter.get("/",(req,res)=>{
    res.sendFile(__dirname+'/public'+'/clientPanel.html')
})

adminRouter.get("/",(req,res)=>{
    res.sendFile(__dirname+'/public'+'/adminPanel.html')
})

clientRouter.post("/",(req,res)=>{
    let message=null;

    if(req.body.action==="login"){
        message=login(req.body)
    }else if(req.body.action==='decrease'){
        message=decrease(req.body)
    }else if(req.body.action==="increase"){
        message=increase(req.body)
    }
    // console.log(message)
    res.send(message)
})

adminRouter.post("/",(req,res)=>{
    let message=createAccount(req.body);
    res.send(message)
})


let login=(data)=>{
    if(data.password===usersData[0].password&&data.email===usersData[0].email){
        return `Klient ${data.email} zostal zalogowany pomyslnie`
    }
    return `Klient ${data.email} nie zostal zalogowany`
}

let increase=(data)=>{
    if(usersData[0]["accounts"][data.accountType]===undefined || usersData[0]["accounts"][data.accountType][data.subaccountType]===undefined){
        return `Nie ma takiego konta lub subkonta`
    }
    if(!isNaN(parseInt(data.amount))){
        usersData[0]["accounts"][data.accountType][data.subaccountType]+=parseInt(data.amount)
        collection.updateOne({id:0},{$set:{accounts:usersData[0]["accounts"]}})
        return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} powiodla sie`
    }
    return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} nie powiodla sie`
}

let decrease=(data)=>{
    if(usersData[0]["accounts"][data.accountType]===undefined || usersData[0]["accounts"][data.accountType][data.subaccountType]===undefined){
        return `Nie ma takiego konta lub subkonta`
    }
    if(!isNaN(parseInt(data.amount))&&usersData[0]["accounts"][data.accountType][data.subaccountType]-parseInt(data.amount)>=0){
        usersData[0]["accounts"][data.accountType][data.subaccountType]-=parseInt(data.amount)
        collection.updateOne({id:0},{$set:{accounts:usersData[0]["accounts"]}})
        return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} powiodla sie`
    }
    return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} nie powiodla sie`
}

let createAccount=(data)=>{
    // console.log(usersData[0])
    if(!usersData[0]['accounts'][data.accountType]){
        usersData[0]['accounts']={...usersData[0]['accounts'],[data.accountType]:{[data.subaccountType]:0}}
        collection.updateOne({id:0},{$set:{accounts:usersData[0]['accounts']}})
        return `Subkonto i konto zostało utworzone poprawnie`
    }
    else if(usersData[0]['accounts'][data.accountType][data.subaccountType]===undefined){
        usersData[0]['accounts']={...usersData[0]['accounts'],[data.accountType]:{...usersData[0]['accounts'][data.accountType],[data.subaccountType]:0}}
        collection.updateOne({id:0},{$set:{accounts:usersData[0]['accounts']}})
        return `Subkonto zostało utowrzone poprawnie`
    }else{
        return `Subkonto juz istniej`
    }
}

app.use('/admin',adminRouter)
app.use('/client',clientRouter)
const MongoClient = mongodb.MongoClient ;
const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();
const db = client.db('AGH');
const collection = db.collection('Bank');
const usersData = await collection.find ({}).toArray();

app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});