import { Navigate } from "react-router-dom";
import Login from "../Login";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Navbar(props){
    const [isLoginForm,isLoginFormSet]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        var canvas = document.querySelector('canvas');
        console.log(canvas)
        let ctx = canvas.getContext('2d');
        let width=canvas.offsetWidth;
        let height=canvas.offsetHeight;
        console.log(height)        
        // ctx.fillText("Hello World", 10, 50); //Wykreślenie podanego tekstu na płótnie
        ctx.lineWidth=2/75*width;
        ctx.strokeStyle='#6c706e'
        //triangle
        ctx.beginPath()
        ctx.moveTo(1/30*width,1/3*height)
        ctx.lineTo(1/2*width,1/30*height)
        ctx.lineTo(29/30*width,1/3*height)
        ctx.closePath();
        ctx.stroke();

        //circle
        ctx.beginPath()
        ctx.arc(1/2*width,5.85/30*height,4/30*width,0,2*Math.PI)
        ctx.closePath();
        ctx.stroke();

        //square
        ctx.beginPath()
        ctx.moveTo(2/30*width,1/3*height)
        ctx.lineTo(2/30*width,25/30*height)
        ctx.lineTo(28/30*width,25/30*height)
        ctx.lineTo(28/30*width,1/3*height)
        ctx.closePath();
        ctx.stroke();

        //reactangle
        ctx.beginPath()
        ctx.moveTo(1/30*width,25/30*height)
        ctx.lineTo(1/30*width,35/36*height)
        ctx.lineTo(30/31*width,35/36*height)
        ctx.lineTo(30/31*width,25/30*height)
        ctx.closePath();
        ctx.stroke();

        //"ABC" text
        ctx.font=`bold ${width/3}px serif`
        ctx.fillText("ABC", 45/300*width, 210/300*height);

        //"BANK" text
        ctx.font=`${width/6}px serif`
        ctx.fillText("Bank", 1/3*width, 335/350*height);
    },[])
    return(
    <>
        <header className="container-fluid">
        <div className="row text-center">
                <h3 className="col"><i className="bi bi-telephone"></i>Telephone <a href="">+48543544</a></h3>
                <h3 className="col"><i className="bi bi-envelope"></i>E-mail <a href="">dsfdsfsd@gmail.com</a></h3>
        </div>
        </header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            {/* <a class="navbar-brand" href="#"><i class="bi bi-cash"></i></a> */}
            <a className="navbar-brand" href="#">
            <canvas width="50" height="50" onClick={()=>navigate('/')}></canvas>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={()=>navigate('/')}>Główna</a>
                </li>
                <li className="nav-item" onClick={()=>isLoginFormSet(!isLoginForm)}>
                    <a className="nav-link" href="#">Logowanie</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Oferta
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Placówki</a></li>
                        <li><a className="dropdown-item" href="#">Bankomaty</a></li>
                        <li><hr className="dropdown-divider"></hr></li>
                        <li><a className="dropdown-item" href="#">Notowania</a></li>
                    </ul>
                </li>
                <li style={{position:"absolute",right:"1rem"}}className="nav-item">
                    <a className="nav-link">Bank "ABC" S.A</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        {isLoginForm&&<Login/>}
    </>)
}

export default Navbar;