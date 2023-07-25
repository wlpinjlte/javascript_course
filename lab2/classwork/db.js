// import drawChart from "./chart";
const request = indexedDB.open('BankDb', 1);
let dataBase=null;

request.onsuccess=(event)=>{
    dataBase=event.target.result
}

request.onerror=(event)=>{
    console.error(`Error indexedDb ${event}`)
}

request.onupgradeneeded = (event) => {
    dataBase = event.target.result;
    objectStoreClients = dataBase.createObjectStore('clients', { keyPath: 'id'});
    objectStoreAccounts=dataBase.createObjectStore('accounts', { keyPath: 'id'});
    objectStoreSubaccounts=dataBase.createObjectStore('subaccounts', { keyPath: 'id'});
}

let add_client=(firstname,lastname,photo)=>{
    let max_id=-1
    const request = dataBase.transaction('clients', 'readwrite');

    request.onerror=(event)=>{
        console.error("cannot open dataBase")
    }

    const objectStore=request.objectStore('clients')
    objectStore.onerror=()=>{
        console.error("objectStore error")
    }
    objectStore.openCursor().onsuccess=(event)=>{
        const cursor=event.target.result
        if(cursor){
            if(max_id < parseInt(cursor.key)){
                max_id = parseInt(cursor.key);
            }
            cursor.continue()
        }else{
            const addClient=objectStore.add({id:max_id+1,firstname:firstname,lastname:lastname,photo:photo});
            addClient.onerror=(event)=>{
                console.error("cannot create client")
            }
            addClient.onsuccess=(event)=>{
                console.log("client added successful")
            }          
        }
    }
}

let add_account=(client_id,account_type)=>{
    const request = dataBase.transaction('clients', 'readwrite');

    request.onerror=(event)=>{
        console.error("cannot open dataBase")
    }

    const objectStore=request.objectStore('clients')
    let flag=false

    objectStore.openCursor().onsuccess=(event)=>{
        const cursor=event.target.result
        if(cursor&&!flag){
            if(client_id === parseInt(cursor.key)){
                flag=true
            }
            cursor.continue()
        }else if(!flag){
            console.error(`client with id ${client_id} doesn't exist`)
        }else{
            const request2 = dataBase.transaction('accounts', 'readwrite');
            let max_id=-1
            request2.onerror=(event)=>{
                console.error("cannot open dataBase")
            }
            const objectStore2=request2.objectStore("accounts")
            objectStore2.onerror=()=>{
                console.error("objectStore error")
            }
            objectStore2.openCursor().onsuccess=(event)=>{
                const cursor=event.target.result
                if(cursor){
                    if(max_id<parseInt(cursor.key)){
                        max_id=parseInt(cursor.key)
                    }
                    cursor.continue()
                }else{
                    const add_account=objectStore2.add({id:max_id+1,clientId:client_id,accountType:account_type})
                    add_account.onerror=()=>{
                        console.error("cannot added account")
                    }
                    add_account.onsuccess=()=>{
                        console.log("account added")
                    }
                }
            }
        }
    }
}

let add_subaccount=(accountId,subaccountType)=>{
    const request=dataBase.transaction("accounts","readwrite")
    request.onerror=()=>{
        console.error("cannot open database")
    }

    const request2=request.objectStore("accounts","readwrite")
    let flag=false
    let clientId=null;
    request2.openCursor().onsuccess=(event)=>{
        const cursor=event.target.result
        if(cursor&&!flag){
            if(accountId===parseInt(cursor.key)){
                flag=true
                clientId=parseInt(cursor.value.clientId)
            }
            cursor.continue()
        }else if(!flag){
            console.error(`account with id ${accountId} doesn't exist`)
        }else{
            const request3=dataBase.transaction("subaccounts","readwrite")
            request3.onerror=()=>{
                console.error("cannot open database")
            }
            const objectStore=request3.objectStore("subaccounts")
            objectStore.onerror=()=>{
                console.error("objectStore issue")
            }
            let max_id=-1
            objectStore.openCursor().onsuccess=(event)=>{
                const cursor=event.target.result
                if(cursor){
                    if(max_id<parseInt(cursor.key)){
                        max_id=parseInt(cursor.key)
                    }
                    cursor.continue()
                }else{
                    const add_subaccount=objectStore.add({id:max_id+1,accountId:accountId,subaccountType:subaccountType,clientId:clientId,balance:0})
                    add_subaccount.onerror=()=>{
                        console.error("cannot added subaccount")
                    }
                    add_subaccount.onsuccess=()=>{
                        console.log("subaccount added successful")
                    }    
                }
            }
        }
    }
}


let increasedBalance=(subaccountId,amount)=>{
    const request=dataBase.transaction("subaccounts","readwrite")

    request.onerror=()=>{
        console.error("cannot open database")
    }

    const objectStore=request.objectStore("subaccounts")
    objectStore.openCursor().onsuccess=(event)=>{
        const cursor=event.target.result
        if(cursor){
            if(parseInt(cursor.key)===subaccountId){
                const addBalance=objectStore.put({...cursor.value,balance:parseInt(cursor.value.balance)+amount})
                addBalance.onsuccess=()=>{
                    console.log("balance update successful")
                }
                addBalance.onerror=()=>{
                    console.error("balance update failed")
                }
            }else{
                cursor.continue()
            }
        }else{
            console.error(`subaccount with ${subaccountId} doesn't exsist `)
        }
    }
}

let decreasedBalance=(subaccountId,amount)=>{
    const request=dataBase.transaction("subaccounts","readwrite")

    request.onerror=()=>{
        console.error("cannot open database")
    }

    const objectStore=request.objectStore("subaccounts")
    objectStore.openCursor().onsuccess=(event)=>{
        const cursor=event.target.result
        if(cursor){
            if(parseInt(cursor.key)===subaccountId){
                const addBalance=objectStore.put({...cursor.value,balance:parseInt(cursor.value.balance)-amount})
                addBalance.onsuccess=()=>{
                    console.log("balance update successful")
                }
                addBalance.onerror=()=>{
                    console.error("balance update failed")
                }
            }else{
                cursor.continue()
            }
        }else{
            console.error(`subaccount with ${subaccountId} doesn't exsist `)
        }
    }
}

let createSummary=(clientId)=>{
    const request=dataBase.transaction("subaccounts","readwrite")

    request.onerror=()=>{
        console.error("cannot open database")
    }

    const objectStore=request.objectStore("subaccounts")

    let flag=false
    let balances=[]
    let types=[]

    objectStore.openCursor().onsuccess=(event)=>{
        const cursor=event.target.result
        if(cursor){
            if(clientId===parseInt(cursor.value.clientId)){
                flag=true
                balances.push(parseInt(cursor.value.balance))
                types.push(cursor.value.subaccountType)
            }
            cursor.continue()
        }else{
            if(!flag){
                console.error(`no client with ${clientId} id`)
            }else{
                drawChart(balances,types,clientId)
                console.log(`Plot for client with ${clientId} id`)
            }
        }
    }

}


let button2=document.querySelector("#test")
button2.addEventListener("click",(event)=>{
    event.preventDefault()
    add_client("Mateusz","Waga","Photo")
})

setTimeout(()=>{
    // add_account(0,"Business")
    // add_subaccount(0,"USD")
    // decreasedBalance(0,10)
},1000)