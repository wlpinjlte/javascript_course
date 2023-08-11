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

app.set('views',__dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug'); // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

// /* ************************************************ */

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); 
app.use(express.urlencoded({extended:false}))
/* ******** */
/* "Routes" */
/* ******** */

app.get('/', function (request, response) {
    response.render('index'); // Render the 'index' view
});

// /* ************************************************ */
app.get('/submit',(req,res)=>{
    res.render('hello',{message:req.query.name})
})

app.get('/students',async(req,res)=>{
    const MongoClient = mongodb.MongoClient ;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('AGH');
    const collection = db.collection('students');
    const docs = await collection.find ({}).toArray();
    res.render('table', {students:docs}) ;
    client.close() ;
})

app.post('/',(req,res)=>{
    res.render('hello',{message:req.body.name})
})


app.get('/:department',async (req,res)=>{
    const MongoClient = mongodb.MongoClient ;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('AGH');
    const collection = db.collection('students');
    const docs = await collection.find ({department:req.params.department}).toArray();
    res.render('table', {students:docs});
    client.close() ;
})

app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});          