let chartCanvas=document.querySelector("#chartCanvas")
let chart=null

let drawChart=(balnaces,types,clientId)=>{
    if(chart===null){
        chartCanvas.style.display="block"
        chart=new Chart(chartCanvas,{
            type:"bar",
            data:{
                labels:types,
                datasets:[{label:`wykres subkont dla klienta o id ${clientId}`,data:balnaces,borderWidth:2}]
            },
            options:{
                scales:{y:{beginAtZero:true}}
            }
        })
    }else{
        chart.data={
            labels:types,
            datasets:[{label:`wykres subkont dla klienta o id ${clientId}`,data:balnaces,borderWidth:2}]
        }
        
        chart.update()
    }
}