// const http = require('node:http');
// const { URL } = require('node:url');

import http from 'node:http';
import { URL } from 'node:url';
import fs from 'fs-extra';
import { argv } from 'node:process';
import { exec } from 'node:child_process';
/**
     * Handles incoming requests.
     *
     * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
     * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
     * The answer sent by this stream must consist of two parts: the header and the body.
     * <ul>
     *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
     *  <li>The body contains the correct data, e.g. a form definition.
     * </ul>
     * @author Stanisław Polak <polak@agh.edu.pl>
*/

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
    if (url.pathname === '/' && request.method === 'GET') {
        // Generating the form if the relative URL is '/', and the GET method was used to send data to the server'
        /* ************************************************** */
        // Creating an answer header — we inform the browser that the returned data is HTML
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        /* ************************************************** */
        // Setting a response body
        response.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vanilla Node.js application</title>
  </head>
  <body>
    <main>
      <h1>Vanilla Node.js application</h1>
      <form method="GET" action="/submit">
        <label>Select method</label>
        <select name="method">
            <option value="--">--</option>
            <option value="sync">sync</option>
            <option value="async">async</option>
        </select>
        <br>
        <textarea name="command"></textarea>
        <br>
        <button type="submit">submit</button>
      </form>
    </main>
  </body>
</html>`);
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browser
    }

    /* ---------------------- */
    /* Route "GET('/submit')" */
    /* ---------------------- */
    else if (url.pathname === '/submit' && request.method === 'GET') {
        // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
        /* ************************************************** */
        // Creating an answer header — we inform the browser that the returned data is plain text
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        /* ************************************************** */
        // Place given data (here: 'Hello <name>') in the body of the answer
         // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
        /* ************************************************** */
        
        let method=url.searchParams.get("method")
        let command=url.searchParams.get("command")
        console.log(method)
        console.log(command)
        if(method==='async'){
            let readPromise=new Promise((resolve)=>{fs.readFile("src/counterFile.json", (err, data) => {
                if (err) throw err;
                resolve(JSON.parse(data.toString())['counter'])
            })})
            readPromise.then(res=>{
                response.write(`<h4>skrypt uruchomiony async counter:${res}</h4>`)
                let writePromise=new Promise((resolve)=>{
                    fs.writeFile("src/counterFile.json",JSON.stringify({counter:res+1}),err=>{
                        if(err) throw err;
                        resolve(null)
                    })
                })
                writePromise.then(()=>{
                    response.end()
                })
            })
        }else if(method==='sync'){
            try{
                let data = fs.readFileSync("src/counterFile.json");
                let counter=JSON.parse(data.toString())['counter']
                console.log(`skryt uruchomiony sync counter:${counter}`)
                response.write(`<h4>Liczba uruchomień: ${counter}</h4>`);
                try{
                    fs.writeFileSync("src/counterFile.json",JSON.stringify({counter:counter+1}))
                }catch(err){
                    throw err;
                }
            }catch(err){
                throw err;
            }
            response.end(); // The end of the response — send it to the browser
        }else{
            let commands=command.split("\r\n")
            console.log(commands)
            let i=0
            commands.forEach(com=>{
                let promise=new Promise((resolve)=>{
                    exec(com,(err,data)=>{
                        if(err)throw err;
                        resolve(data)
                    })
                })
                promise.then(res=>{
                    response.write(`<h4>${res}</h4>`)
                    i+=1
                })
                if(i===commands.length){
                    response.end(); // The end of the response — send it to the browser
                }
            })
            
        }
        
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