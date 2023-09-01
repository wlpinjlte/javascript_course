import { useRef } from "react"
function Login(){
    const user=useRef()
    const password=useRef()
    const login=async(event)=>{
        event.preventDefault()
        console.log(user.current.value)
        console.log(password.current.value)
    }
    return(
        <div className="col-12 justify-content-center d-flex my-4">
            <div className="card col-9">
                <h5 className="card-title bg-light border-bottom p-3">Logowanie</h5>
                <div className="card-body">
                    <label className="form-label">Email address</label>
                    <input className="form-control" ref={user}/>
                    <label className="form-label">Password</label>
                    <input className="form-control" ref={password}/>
                    <button className="btn btn-primary mt-3" onClick={login}>Zaloguj</button>
                </div>
            </div>
        </div>)
}

export default Login;