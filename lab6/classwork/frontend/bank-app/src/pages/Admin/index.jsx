import { useState } from "react";

function Admin(){
    const [userData,userDataSet]=useState([{"id":0,"firstname":"Jan","lastname":"Kowalski","photo":"photo","email":"kowalskiJan@gmail.com","password":"haslo123","accounts":{"Private":{"EURO":0,"PLN":0,"USD":0},"Business":{"EURO":0,"PLN":0,"USD":7}}}])
    return(
    <main class="d-flex justify-content-center">
        <form class="col-6 my-4">
            <label class="form-label" for="accountTypeSelect">Wybierz Klienta</label>
            <select class="form-control" name="accountType" id="accountTypeSelect">
                <option disabled selected>Klienci</option>
                {userData.map(user=>(
                    <option>{user.firstname+" "+user.lastname}</option>
                ))}
            </select>
            <label class="form-label" for="accountTypeSelect">Wybierz typ konta</label>
            <select class="form-control" name="accountType" id="accountTypeSelect">
                <option disabled selected>Typ konta</option>
                <option value="Private">Prywatne</option>
                <option value="Business">Biznesowe</option>
                <option value="Economic">Ekonomiczne</option>
            </select>
            <label class="form-label mt-2" for="subaccountTypeSelect">Wybierz typ subkonta</label>
            <select class="form-control" name="subaccountType" id="subaccountTypeSelect">
                <option disabled selected>Typ subkonta</option>
                <option>USD</option>
                <option>EURO</option>
                <option>PLN</option>
                <option>SEK</option>
                <option>HUF</option>
            </select>
            <button class="btn-primary btn mt-3">Załóż</button>
        </form>
    </main>)
}

export default Admin;