import { useEffect, useState,useRef } from "react";
import "./style.css"
function Client(){
    const [randomIndex,randomIndexSet]=useState(-1)
    const [userData,userDataSet]=useState([{"id":0,"firstname":"Jan","lastname":"Kowalski","photo":"photo","email":"kowalskiJan@gmail.com","password":"haslo123","accounts":{"Private":{"EURO":0,"PLN":0,"USD":0},"Business":{"EURO":0,"PLN":0,"USD":7}}}])
    const [formData,formDataSet]=useState({})
    const dragStartItem=useRef()
    const dragEnterItem=useRef() 
    // const [secoundSinceLastActivity,secoundSinceLastActivitySet]=useState(0) 
    let watcher=()=>{
        let secoundSinceLastActivity=0
        const maxInactivity=2
        const cardsLength=5
        setInterval(()=>{
            if(secoundSinceLastActivity>maxInactivity){
                randomIndexSet(Math.floor(Math.random()*cardsLength))
            }
            secoundSinceLastActivity+=1
            // console.log(secoundSinceLastActivity)
        },1000)

        let activity=["mousedown","keydown","mousemove","scroll","touchstart"]
        activity.forEach(a=>document.addEventListener(a,()=>secoundSinceLastActivity=0))
    }

    let downloadData=async ()=>{
        const response=await fetch("http://localhost:8000/clients")
        userDataSet(await response.json())
    }

    let doChangeBalance=async(event,action)=>{
        event.preventDefault()
        const response=await fetch("http://localhost:8000/clients/balanceChange",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                ...formData,
                action:action
            })
        })

        if(response.status===200){
            let result=await response.json()
            window.alert(result.message)
            downloadData()
        }else{
            window.alert(await response.text())
        }
    }

    let transfer=async(from,to)=>{
        console.log(from,to)
        const response=await fetch("http://localhost:8000/clients/transfer",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                clientFromId:from.userId,
                accountFromType:from.accountType,
                subaccountFromType:from.subaccountType,
                clientToId:to.userId,
                accountToType:to.accountType,
                subaccountToType:to.subaccountType,
            })
        })
        if(response.status===200){
            let message=await response.json()
            window.alert(message.message)
            downloadData()
        }else{
            window.alert(await response.text())
        }
    }


    let handelOnChange=(event)=>{
        formDataSet(prev=>({...prev,[event.target.name]:event.target.value}))
        console.log(formData)
    }

    let dragStart=(event,userId,accountType,subaccountType)=>{
        console.log("start")
        dragStartItem.current={userId,accountType,subaccountType}
    }

    let dragEnter=(event,userId,accountType,subaccountType)=>{
        console.log("enter")
        dragEnterItem.current={userId,accountType,subaccountType}
    }

    let drop=()=>{
        console.log("drop")
        transfer(dragStartItem.current,dragEnterItem.current)
    }

    useEffect(()=>{
        // console.log(userData)
        watcher()
        downloadData()
    },[])
    return(<main className="container mt-3">
    <div className="row justify-content-center">
          <div className="col-12 col-sm-3">
                <div className="card ani1" style={{backgroundColor: randomIndex===0? "#FF3333":"white"}}>
                      <img src="http://localhost:8000/images/bank.jpeg" className="card-img-top" alt="..."/>
                      <h5 className="card-title bg-light border-bottom p-2">Dane Adresowe</h5>
                      <div className="card-body pt-0">
                            <h6 className="card-title">Siedziba główna</h6>
                            <p className="card-text">ul.kawiory 21A, Kraków</p>
                            <h6 className="card-title">Oddział Warszawa</h6>
                            <p className="card-text">ul. Wiejska 4B, Warszawa</p>
                      </div>
                </div>
          </div>
          <div className="col-12 col-sm-3">
                <div className="card ani3" style={{backgroundColor: randomIndex===1? "#FF3333":"white"}}>
                      <img src="http://localhost:8000/images/acountant.jpeg" className="card-img-top" alt="..."/>
                      <h5 className="card-title bg-light border-bottom p-2">Klient biznesowy</h5>
                      <div className="card-body">
                        <p className="card-text">Prowadzisz firme?</p>
                        <a href="#" className="btn btn-primary">Załóż konto firmowe</a>
                      </div>
                </div>
          </div>
          <div className="col-sm-6">
                <div className="card ani2" style={{backgroundColor: randomIndex===2? "#FF3333":"white"}}>
                      <img src="http://localhost:8000/images/entrepreneur.jpg" className="card-img-top" alt="..."/>
                      <h5 className="card-title bg-light border-bottom p-2">Oferta specjalna</h5>
                      <div className="card-body">
                        <ul>
                            <li>Jesteś absolwetnem informatyki AGH?</li>
                            <li>Pracujesz jako programista?</li>
                        </ul>
                        <a href="#" className="btn btn-primary">Załóż konto specjalne</a>
                      </div>
                </div>
          </div>
    </div>
    <div className="row justify-content-between">
          <div className="col-4">
                <div className="card" style={{backgroundColor: randomIndex===3? "#FF3333":"white"}}>
                      <img src="http://localhost:8000/images/pln.jpeg" className="card-img-top" alt="..."/>
                      <h5 className="card-title bg-light border-bottom p-2">Title</h5>
                      <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go someWhere</a>
                      </div>
                </div>
          </div>
          <div className="col-4">
                <div className="card" style={{backgroundColor: randomIndex===4? "#FF3333":"white"}}>
                      <img src="http://localhost:8000/images/money.jpeg" className="card-img-top" alt="..."/>
                      <h5 className="card-title bg-light border-bottom p-2">Title</h5>
                      <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary" id="test">Go someWhere</a>
                      </div>
                </div>
          </div>
    </div>
    <div className="d-flex">
        {userData.map(el=>{
            // console.log(el)
            return(
            <div className="col-4 mt-2 mx-1" >
                <div className="card">
                    <h5 className="card-title bg-light border-bottom p-2">{el.firstname+" "+el.lastname}</h5>
                    <div className="p-2">
                        {Object.entries(el.accounts).map((accountType)=>(Object.entries(accountType[1]).map(accounts=>(
                            <div className="p-2 border mt-1" style={{backgroundColor: accounts[1]===0? "#FF3333":"white",borderRadius:"15px",fontSize:"1.2rem",textAlign:"start"}} draggable onDragStart={(event)=>dragStart(event,el.id,accountType[0],accounts[0])} onDragEnter={(event)=>dragEnter(event,el.id,accountType[0],accounts[0])} onDragEnd={drop}>
                                {accountType[0]+" "+accounts[0]+": "+accounts[1]}
                            </div>
                        ))))}
                    </div>
                </div>
            </div>)
        })}
    </div>
    <form className="justify-content-center my-5 d-flex col-9 mx-auto flex-column">
        <label className="form-label">Wybierz Klienta</label>
        <select className="form-control" name="userId" onChange={handelOnChange}>
            <option disabled selected>Klienci</option>
            {userData.map(el=>(<option value={el.id}>
                {el.firstname+" "+el.lastname}
            </option>))}
        </select>
        <label className="form-label">Wprowadz kwotę</label>
        <input type="number" className="form-control" placeholder="Kwota" name="amount" onChange={handelOnChange}/>
        <label className="form-label">Wybierz typ konta</label>
        <select className="form-control" name="accountType" onChange={handelOnChange}>
            <option disabled selected>Typ konta</option>
            <option value="Private">Prywatne</option>
            <option value="Business">Biznesowe</option>
            <option value="Economic">Ekonomiczne</option>
        </select>
        <label className="form-label">Wybierz typ subkonta</label>
        <select className="form-control" name="subaccountType" onChange={handelOnChange}>
            <option disabled selected>Typ konta</option>
            <option>USD</option>
            <option>EURO</option>
            <option>PLN</option>
            <option>SEK</option>
            <option>HUF</option>
        </select>
        <div className="d-flex p-0 mt-3">
            <button className="btn btn-primary" onClick={(event)=>doChangeBalance(event,"increase")}>wpłać</button>
            <button className="btn btn-primary mx-2" onClick={(event)=>doChangeBalance(event,"decrease")}>wypłać</button>
        </div>
   </form>
  </main>)
}


export default Client;