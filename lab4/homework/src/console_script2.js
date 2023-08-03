"use strict"
/* ********* */
/* CommonsJS */
/* ********* */
// const fs = require('fs-extra')
// const { argv } = require('node:process');

/* **** */
/* ES6  */
/* **** */
import fs from 'fs-extra';
import { argv,stdin,stdout } from 'node:process';
import { exec } from "node:child_process"
import * as readline from 'node:readline/promises';
// import {readline}
/************************* */
/***Handles the counter file with sync functions  */
function read_sync() {
    // console.log(`\x1B[32mWykonano pierwszą linię funkcji "read_sync()"\x1B[0m`);
    try{
        let data = fs.readFileSync("src/counterFile.json");
        let counter=JSON.parse(data.toString())['counter']
        console.log(`skryt uruchomiony sync counter:${counter}`)
        try{
            fs.writeFileSync("src/counterFile.json",JSON.stringify({counter:counter+1}))
        }catch(err){
            throw err;
        }
    }catch(err){
        throw err;
    }

    // console.log('\x1B[33mZakończono wczytywanie zawartości pliku — zawartość jest dostępna w zmiennej \'data\'\x1B[0m');
    // console.log(`\x1B[32mWykonano ostatnią linię funkcji "read_sync()"\x1B[0m`);
}
/***Handles the counter file with async functions  */
function read_async() {
    // console.log(`\x1B[32mWykonano pierwszą linię funkcji "read_async()"\x1B[0m`);
    let counter=null
    fs.readFile("src/counterFile.json", (err, data) => {
        if (err) throw err;
        counter=JSON.parse(data.toString())['counter']
        console.log(`skryt uruchomiony async counter:${counter}`)
        if(!counter){
            fs.writeFile("src/counterFile.json",JSON.stringify({counter:counter+1}),err=>{
                if(err) throw err;
            })
        }
    });
    
    // console.log(`\x1B[32mWykonano ostatnią linię funkcji "read_async()"\x1B[0m`);
}
/**
 * Handles the commands given by userr  */
let commandHandler=async()=>{
    const readLine = readline.createInterface({
        input: stdin,
        output: stdout,
      });
    let command=null
    while((command=await readLine.question("",(res)=>res))){
        // console.log(command)
        exec(command,(err,output)=>{
            if(err) throw err
            console.log(output)
        })
    }
}

// console.clear()
// // console.log(`\x1B[31mSynchroniczny odczyt pliku "${argv[1]}"\x1B[0m`);
// read_sync();
// console.log('------------------');
// // console.log(`\x1B[31mAsynchroniczny odczyt pliku "${argv[1]}"\x1B[0m`);
// read_async();
// console.log('\x1B[34mWykonano ostatnią linię skryptu\x1B[0m');    
/**
 * Handles the method given by user
 * @param {string} method - The method given by the user 
 */
let messageHandler=(method)=>{
    if(method=='--async'){
        read_async()
    }else if(method=='--sync'){
        read_sync()
    }else{
        commandHandler()
    }
}

messageHandler()

