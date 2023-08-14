let liLast=document.querySelector(".navbar-nav .nav-item:nth-child(4)")
let ulNavbar=document.querySelector(".navbar-nav")
ulNavbar.removeChild(liLast)
let navbar=document.querySelector("#navbarNav")
let span=document.createElement("span")
let textNode=document.createTextNode(`Bank "ABC" S.A.`)
span.appendChild(textNode)
navbar.appendChild(span)
let loginForm=document.querySelector("#loginForm")
let cards=document.querySelectorAll(".card")
let cardsLength=cards.length
let loginButton=document.querySelectorAll("ul>li")[1]
let randomCard=0
// console.log(loginButton)
let isForm=false
loginButton.addEventListener("click",()=>{
    if(isForm){
        isForm=!isForm
        loginForm.style.display="none"
    }else{
        isForm=!isForm
        loginForm.style.display="block"
    }
})

let watcher=()=>{
    let secoundSinceLastActivity=0
    let maxInactivity=2

    setInterval(()=>{
        if(secoundSinceLastActivity>maxInactivity){
            cards[randomCard].style.backgroundColor="white"
            randomCard=Math.floor(Math.random()*cardsLength)
            cards[randomCard].style.backgroundColor="red"
        }
        secoundSinceLastActivity+=1
    },1000)

    let activity=["mousedown","keydown","mousemove","scroll","touchstart"]
    activity.forEach(a=>document.addEventListener(a,()=>secoundSinceLastActivity=0))
}
watcher()


let divFlex=document.createElement("div")
divFlex.classList.add("col-12")
divFlex.classList.add("justify-content-center")
divFlex.classList.add("d-flex")
divFlex.classList.add("my-4")
let divCard=document.createElement("form")
divCard.classList.add("card")
divCard.classList.add("col-9")
divCard.method="POST"
divCard.action="/client"
let title=document.createElement("h5")
title.classList.add("card-title")
title.classList.add("bg-light")
title.classList.add("border-bottom")
title.classList.add("p-3")
let textNodeTitle=document.createTextNode("Logowanie")
title.appendChild(textNodeTitle)
let divCardBody=document.createElement("div")
divCardBody.classList.add("card-body")
let emailLabel=document.createElement("label")
let textNodeEmail=document.createTextNode("Email address")
emailLabel.appendChild(textNodeEmail)
emailLabel.classList.add("form-label")
let emailInput=document.createElement("input")
emailInput.classList.add("form-control")
emailInput.type="email"
emailInput.name="email"
let passwordLabel=document.createElement("label")
let textNodePassword=document.createTextNode("Password")
passwordLabel.appendChild(textNodePassword)
passwordLabel.classList.add("form-label")
let passwordInput=document.createElement("input")
passwordInput.type="password"
passwordInput.name="password"
passwordInput.classList.add("form-control")
let formButton=document.createElement("button")
let textNodeButton=document.createTextNode("Zaloguj")
formButton.appendChild(textNodeButton)
formButton.classList.add("btn")
formButton.classList.add("btn-primary")
formButton.classList.add("mt-3")
formButton.type="submit"
formButton.name="action"
formButton.value="login"
divFlex.appendChild(divCard)
divCard.append(title)
divCard.appendChild(divCardBody)
divCardBody.appendChild(emailLabel)
divCardBody.appendChild(emailInput)
divCardBody.appendChild(passwordLabel)
divCardBody.appendChild(passwordInput)
divCardBody.appendChild(formButton)
// loginForm.innerHTML=""
loginForm.appendChild(divFlex)
loginForm.style.display="none"

let footer=document.querySelector("footer")
footer.style.position="fixed"
footer.style.bottom="0"
footer.style.width="100%"
footer.style.textAlign="end"
footer.style.fontSize="1rem"
// footer.style.padding="0.3rem"
footer.style.paddingRight="1rem"
footer.classList.add("bg-light")
let textNodeFooter=document.createTextNode("©Informatyka AGH templates")
footer.appendChild(textNodeFooter)