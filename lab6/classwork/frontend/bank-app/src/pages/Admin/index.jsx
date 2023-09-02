import { useEffect, useState } from "react";

function Admin(){
    const [userData,userDataSet]=useState([{"id":0,"firstname":"Jan","lastname":"Kowalski","photo":"photo","email":"kowalskiJan@gmail.com","password":"haslo123","accounts":{"Private":{"EURO":0,"PLN":0,"USD":0},"Business":{"EURO":0,"PLN":0,"USD":7}}}])
    const [formData,formDataSet]=useState({})

    let handleOnChange=(event)=>{
        formDataSet(prev=>({...prev,[event.target.name]:event.target.value}))
        console.log(formData)
    }

    let downloadData=async()=>{
        const response=await fetch('http://localhost:8000/clients')
        userDataSet(await response.json())
    }

    let createAccount=async(event)=>{
        event.preventDefault()
        const response=await fetch("http://localhost:8000/clients/createAccount",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(formData)
        })

        if(response.status===200){
            let result=await response.json()
            window.alert(result.message)
        }else{
            window.alert(await response.text())
        }
    }

    useEffect(()=>{
        downloadData()
    },[])
    return(
    <main class="d-flex justify-content-center">
        <form class="col-6 my-4">
            <label class="form-label" for="accountTypeSelect">Wybierz Klienta</label>
            <select class="form-control" name="userId" id="accountTypeSelect" onChange={handleOnChange}>
                <option disabled selected>Klienci</option>
                {userData.map(user=>(
                    <option value={user.id}>{user.firstname+" "+user.lastname}</option>
                ))}
            </select>
            <label class="form-label" for="accountTypeSelect">Wybierz typ konta</label>
            <select class="form-control" name="accountType" id="accountTypeSelect" onChange={handleOnChange}>
                <option disabled selected>Typ konta</option>
                <option value="Private">Prywatne</option>
                <option value="Business">Biznesowe</option>
                <option value="Economic">Ekonomiczne</option>
            </select>
            <label class="form-label mt-2" for="subaccountTypeSelect">Wybierz typ subkonta</label>
            <select class="form-control" name="subaccountType" id="subaccountTypeSelect" onChange={handleOnChange}>
                <option disabled selected>Typ subkonta</option>
                <option>USD</option>
                <option>EURO</option>
                <option>PLN</option>
                <option>SEK</option>
                <option>HUF</option>
            </select>
            <button class="btn-primary btn mt-3" onClick={createAccount}>Załóż</button>
        </form>
    </main>)
}

export default Admin;