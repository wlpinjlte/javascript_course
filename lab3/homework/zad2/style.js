let main=document.querySelector("main")
let aside=document.querySelector("aside")
let header=document.querySelector("header")
let nav=document.querySelector("nav")
let footer=document.querySelector("footer")
let h1=document.querySelectorAll("h1")
let h1_border=document.querySelector("header h1")

let text="Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi, cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął policzki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki, wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapas ducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę muzykę i podwaja echem. Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy. Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."
let cutText=text.split(/\.|;/)
cutText=cutText.map(a=>a+".")
cutText.pop()
console.log(cutText)

let giveStyle=()=>{
    main.classList.add("main")
    main.classList.add("border")
    main.classList.add("azure")
    aside.classList.add("aside")
    aside.classList.add("border")
    aside.classList.add("azure")
    header.classList.add("header")
    nav.classList.add("nav")
    nav.classList.add("border")
    nav.classList.add("azure")
    footer.classList.add("footer")
    footer.classList.add("border")
    footer.classList.add("azure")
    h1.forEach(h1=>{
        h1.classList.add("h1")
        h1.classList.add("animation")
    })
    h1_border.classList.add("border")
    h1_border.classList.add("azure")
}

let takeStyle=()=>{
    main.classList.remove("main")
    main.classList.remove("border")
    main.classList.remove("azure")
    aside.classList.remove("aside")
    aside.classList.remove("border")
    aside.classList.remove("azure")
    header.classList.remove("header")
    nav.classList.remove("nav")
    nav.classList.remove("border")
    nav.classList.remove("azure")
    footer.classList.remove("footer")
    footer.classList.remove("border")
    footer.classList.remove("azure")
    h1.forEach(h1=>{
        h1.classList.remove("h1")
        h1.classList.remove("animation")
    })
    h1_border.classList.remove("border")
    h1_border.classList.remove("azure")
}

let addButton=document.querySelector("#add")

let add=()=>{
    if(cutText.length!=0){
        let text=document.createTextNode(cutText.shift())
        main.appendChild(text)
        if(cutText.length===0){
            console.log("siema")
            addButton.disabled=true; 
        }
    }
}

let setButton=document.querySelector("#set")
setButton.addEventListener("click",giveStyle)

let deleteButton=document.querySelector("#delete")
deleteButton.addEventListener("click",takeStyle)

addButton.addEventListener("click",add)