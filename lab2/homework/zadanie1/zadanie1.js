let a=window.prompt("Podaj wartość 1");
console.log(a+":"+typeof(a))

let onClick=()=>{
    console.log(document.forms[0].elements[0].value)
    console.log(document.forms[0].elements[1].value)
}