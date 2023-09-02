import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb'
import { log } from 'console';
import bodyParser from 'body-parser'
import cors from 'cors';
/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router=express.Router()

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); 
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
router.get("/clients",(req,res)=>{
    res.status=200
    res.json(usersData)
})

router.post("/clients/createAccount",(req,res)=>{
    let message=createAccount(req.body)
    res.status=200
    res.json({message:message})
})

router.post('/clients/balanceChange',(req,res)=>{
    let message;
    if(req.body.action==='increase'){
        message=increase(req.body)
    }else if(req.body.action==='decrease'){
        message=decrease(req.body)
    }
    res.status=200
    res.json({message:message})
})

router.post('/clients/transfer',(req,res)=>{
    let message=transfer(req.body)
    res.status=200
    res.json({message:message})
})

router.post('/login',(req,res)=>{
    // console.log(req)
    console.log(req.body)
    let message=login(req.body)
    res.status=200
    res.json({message:message})
})


let login=(data)=>{
    console.log(data.password,data.email)
    for(const user of usersData){
        if(user.password===data.password&&user.email===data.email){
            console.log("siema")
            return `Klient ${data.email} zostal zalogowany pomyslnie`
        }
    } 
    return `Klient ${data.email} nie zostal zalogowany`
}

let increase=(data)=>{
    if(usersData[data.userId]["accounts"][data.accountType]===undefined || usersData[data.userId]["accounts"][data.accountType][data.subaccountType]===undefined){
        return `Nie ma takiego konta lub subkonta`
    }
    if(!isNaN(parseInt(data.amount))){
        usersData[data.userId]["accounts"][data.accountType][data.subaccountType]+=parseInt(data.amount)
        collection.updateOne({id:data.userId},{$set:{accounts:usersData[0]["accounts"]}})
        return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} powiodla sie`
    }
    return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} nie powiodla sie`
}

let decrease=(data)=>{
    if(usersData[data.userId]["accounts"][data.accountType]===undefined || usersData[0]["accounts"][data.accountType][data.subaccountType]===undefined){
        return `Nie ma takiego konta lub subkonta`
    }
    if(!isNaN(parseInt(data.amount))&&usersData[data.userId]["accounts"][data.accountType][data.subaccountType]-parseInt(data.amount)>=0){
        usersData[data.userId]["accounts"][data.accountType][data.subaccountType]-=parseInt(data.amount)
        collection.updateOne({id:data.userId},{$set:{accounts:usersData[0]["accounts"]}})
        return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} powiodla sie`
    }
    return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} nie powiodla sie`
}

let createAccount=(data)=>{
    // console.log(usersData[0])
    if(!usersData[data.userId]['accounts'][data.accountType]){
        usersData[data.userId]['accounts']={...usersData[data.userId]['accounts'],[data.accountType]:{[data.subaccountType]:0}}
        collection.updateOne({id:data.userId},{$set:{accounts:usersData[data.userId]['accounts']}})
        return `Subkonto i konto zostało utworzone poprawnie`
    }
    else if(usersData[data.userId]['accounts'][data.accountType][data.subaccountType]===undefined){
        usersData[data.userId]['accounts']={...usersData[data.userId]['accounts'],[data.accountType]:{...usersData[data.userId]['accounts'][data.accountType],[data.subaccountType]:0}}
        collection.updateOne({id:data.userId},{$set:{accounts:usersData[data.userId]['accounts']}})
        return `Subkonto zostało utowrzone poprawnie`
    }else{
        return `Subkonto juz istniej`
    }
}

let transfer=(data)=>{
    if(data.clientFromId===data.clientToId&&data.accountFromType===data.accountToType&&data.subaccountFromType===data.subaccountToType){
        return 'przelewa na to samo subkonto nie ma sensu'
    }
    let fromBalance=usersData[data.clientFromId]['accounts'][data.accountFromType][data.subaccountFromType]
    if(fromBalance>0){
        usersData[data.clientFromId]['accounts'][data.accountFromType][data.subaccountFromType]=0
        usersData[data.clientToId]['accounts'][data.accountToType][data.subaccountToType]+=fromBalance

        collection.updateOne({id:data.clientFromId},{$set:{accounts:usersData[data.clientFromId]['accounts']}})
        collection.updateOne({id:data.clientToId},{$set:{accounts:usersData[data.clientToId]['accounts']}})
        return 'transfer przebiegł pomyślnie'
    }
    return 'transfer się nie powiódł za mało środków'
}

app.use('/',router)
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