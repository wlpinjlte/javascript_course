var animation;
var i = 0;
let startButton=document.querySelector("#start")
let stopButton=document.querySelector("#stop")

function calculatePrimes() {
  const iterations = document.querySelector("#iterations_main").value || 50;
  // Source: https://udn.realityripple.com/docs/Tools/Performance/Scenarios/Intensive_JavaScript
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (1000000000 * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

function startAnimation() {
  startButton.disabled = true;
  stopButton.disabled = false;
  animation = window.requestAnimationFrame(step);
}

function step() {
  document.querySelector("#counter").value = i++;
  animation = window.requestAnimationFrame(step);
}

function stopAnimation() {
  startButton.disabled = false;
  stopButton.disabled = true;
  window.cancelAnimationFrame(animation)
}

let worker=new Worker("worker.js")
let button=document.querySelector("#worker_button")

button.addEventListener("click",()=>{
  let iterations=document.querySelector("#iterations_worker").value
  worker.postMessage(iterations)
})

worker.addEventListener("message",(message)=>{
  let wynik=document.querySelector("#result_worker")
  // let text= document.createTextNode(message.data)
  // wynik.appendChild(text)
  wynik.innerText=message.data
})

let calculationButton1=document.querySelector("#calculation")
let result=document.querySelector("#result_main")
calculationButton1.addEventListener("click",()=>{
  // console.log("click")
  let wyniki=calculatePrimes()
  result.innerHTML=wyniki
})


startButton.addEventListener("click",startAnimation)
stopButton.addEventListener("click",stopAnimation)

document.querySelector("form").addEventListener("submit",(e)=>e.preventDefault())