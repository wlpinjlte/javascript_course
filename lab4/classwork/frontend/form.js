// import createSummary from "./db"
// let form = document.querySelector("textarea")
// console.log(form)

//download componets
let form=document.forms[0][0]
let button=document.forms[0][1]

// listener added to button
button.addEventListener("click",(event)=>{
    event.preventDefault()
    console.log(form.value)
    readCommand(form.value)
    form.value=''
})

function readCommand(command){
    let partsOfCommand=command.split(" ")
    // console.log(partsOfCommand)
    if(partsOfCommand[0]==="create"){
        if(partsOfCommand[1]==="client"){
            if(partsOfCommand.length!==5){
                console.error("invalid number of arguments need 3 parameters: firstname, lastname,photo link")
            }else{
                add_client(partsOfCommand[2],partsOfCommand[3],partsOfCommand[4])
            }
        }else if(partsOfCommand[1]==='account'){
            if(partsOfCommand.length!==4){
                console.error("invalid number of arguments need 2 parameters: client id, type of account")
            }else{
                if(isNaN(partsOfCommand[2])||parseInt(partsOfCommand[2])<0){
                    console.error("Parameter client id should be a non negative number")
                }else if(partsOfCommand[3]!=="Business"&&partsOfCommand[3]!=='Private'){
                    console.error("Parameter type of account should be Business or Private")
                }else{
                    add_account(parseInt(partsOfCommand[2]),partsOfCommand[3])
                }
            }
        }else if(partsOfCommand[1]==='subaccount'){
            if(partsOfCommand.length!==4){
                console.error("invalid number of arguments need 2 parameters: account id, type of subaccount")
            }else{
                if(isNaN(partsOfCommand[2])||parseInt(partsOfCommand[2])<0){
                    console.error("Parameter subaccount id should be a non negative number")
                }else if(partsOfCommand[3]!=="PLN"&&partsOfCommand[3]!=="EURO"&&partsOfCommand[3]!=='USD'){
                    console.error("parameter type of subaccount should be PLN,EURO or USD")
                }else{
                    add_subaccount(parseInt(partsOfCommand[2]),partsOfCommand[3])
                }
            } 
        }
    }else if(partsOfCommand[0]==='increase'){
        if(partsOfCommand.length!==3){
            console.error("invalid number of arguments need 2 parameters: subaccount id, amount")
        }else{
            if(isNaN(partsOfCommand[1])||parseInt(partsOfCommand[1])<0){
                console.error("Parameter subaccount id should be a non negative number")
            }else if(isNaN(partsOfCommand[2])||parseInt(partsOfCommand[2]<0)){
                console.error("Parameter amount should be a non negative number")
            }else{
                increasedBalance(parseInt(partsOfCommand[1]),parseInt(partsOfCommand[2]))
            }
        }
    }else if(partsOfCommand[0]==='decrease'){
        if(partsOfCommand.length!==3){
            console.error("invalid number of arguments need 2 parameters: subaccount id, amount")
        }else{
            if(isNaN(partsOfCommand[1])||parseInt(partsOfCommand[1])<0){
                console.error("Parameter subaccount id should be a non negative number")
            }else if(isNaN(partsOfCommand[2])||parseInt(partsOfCommand[2]<0)){
                console.error("Parameter amount should be a non negative number")
            }else{
                decreasedBalance(parseInt(partsOfCommand[1]),parseInt(partsOfCommand[2]))
            }
        }
    }else if(partsOfCommand[0]==='draw'){
        if(partsOfCommand.length!==2){
            console.error("invalid number of arguments need 1 parameters: client id")
        }else{
            if(isNaN(partsOfCommand[1])||parseInt(partsOfCommand[1])<0){
                console.error("Parameter client id should be a non negative number")
            }else{
                createSummary(parseInt(partsOfCommand[1]))
            }
        }
    }else{
        console.error(`${command} is invalid command`)
    }
}