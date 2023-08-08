import http from 'node:http';
import { URL } from 'node:url';
import { parse } from 'querystring';
import fs from 'fs-extra';
let usersData=null

let loadPage=()=>{
    let page=fs.readFileSync("frontend/index.html",(err,response)=>{
        if(err)throw err;
        return response;
    })
    return page;
}

let loadFile=(path)=>{
    let file=fs.readFileSync(path,(err,response)=>{
        if(err)throw err;
        return response;
    })
    return file;
}

let loadDatabase=()=>{
    let data=fs.readFileSync("src/db.json",(err,fileData)=>{
        console.log("siema")
        if(err)throw err;
        return fileData;
    })
    return JSON.parse(data.toString());
}

let updateDatabase=()=>{
    try{
        fs.writeFileSync("src/db.json",JSON.stringify(usersData))
    }catch(err){
        throw err;
    }
}

let login=(data)=>{
    if(data.password===usersData[0].password&&data.email===usersData[0].email){
        return `Klient ${data.email} zostal zalogowany pomyslnie`
    }
    return `Klient ${data.email} nie zostal zalogowany`
}

let increase=(data)=>{
    if(!isNaN(parseInt(data.amount))){
        usersData[0]["accounts"][data.accountType][data.subaccountType]+=parseInt(data.amount)
        updateDatabase()
        return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} powiodla sie`
    }
    return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} nie powiodla sie`
}

let decrease=(data)=>{
    if(!isNaN(parseInt(data.amount))&&usersData[0]["accounts"][data.accountType][data.subaccountType]-parseInt(data.amount)>=0){
        usersData[0]["accounts"][data.accountType][data.subaccountType]-=parseInt(data.amount)
        updateDatabase()
        return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} powiodla sie`
    }
    return `Wplata ${data.amount} na konto ${data.accountType} na subkonto ${data.subaccountType} nie powiodla sie`
}
function requestListener(request, response) {
    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log('--------------------------------------');
    // Create the URL object
    const url = new URL(request.url, `http://${request.headers.host}`);
    /* ************************************************** */
    if (!request.headers['user-agent'])
        console.log(url);  
        
    /* ******** */
    /* "Routes" */
    /* ******** */

    /* ---------------- */
    /* Route "GET('/')" */
    /* ---------------- */
    if(url.pathname==="/"&&request.method==="POST"){
        let data=""
        request.on("data",char=>{
            data+=char
        })
        request.on("end",()=>{
            data=parse(data)
            console.log(data)
            let message=null
            if(data.action==="login"){
                message=login(data)
            }else if(data.action==="increase"){
                message=increase(data)
            }else if(data.action==="decrease"){
                message=decrease(data)
            }
            response.writeHead(200,{'Content-Type':"text/plain"})
            response.write(message)
            response.end()
        })
    }
    else if (url.pathname === '/' && request.method === 'GET') {
        // Generating the form if the relative URL is '/', and the GET method was used to send data to the server'
        /* ************************************************** */
        // Creating an answer header — we inform the browser that the returned data is HTML
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadPage());
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/images/bank.jpeg"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/images/bank.jpeg'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/images/acountant.jpeg"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/images/acountant.jpeg'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/images/entrepreneur.jpg"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'image/jpg' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/images/entrepreneur.jpg'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/images/money.jpeg"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/images/money.jpeg'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/images/pln.jpeg"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/images/pln.jpeg'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/script.js"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'text/js' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/script.js'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/form.js"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'text/js' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/form.js'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/logoScript.js"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'text/js' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/logoScript.js'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }else if(url.pathname==="/chart.js"&& request.method === 'GET'){
        response.writeHead(200, { 'Content-Type': 'text/js' });
        /* ************************************************** */
        // Setting a response body
        response.write(loadFile('frontend/chart.js'));
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browsers
    }

    /* ---------------------- */
    /* Route "GET('/submit')" */
    /* ---------------------- */
    else if (url.pathname === '/submit' && request.method === 'GET') {
        // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
        /* ************************************************** */
        // Creating an answer header — we inform the browser that the returned data is plain text
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        /* ************************************************** */
        // Place given data (here: 'Hello <name>') in the body of the answer
        response.write(`Hello ${url.searchParams.get('name')}`); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browser
    }
    else if(url.pathname === '/' && request.method === 'POST'){
      let name=""
      request.on("data",char=>{
        name+=char
      })
      request.on("end",()=>{
        console.log()
        response.write(`Hello ${parse(name).name}`)
        response.end()
      })
    }

    /* -------------------------- */
    /* If no route is implemented */
    /* -------------------------- */
    else {
        response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write('Error 501: Not implemented');
        response.end();
    }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');

usersData=loadDatabase();
console.log(usersData)