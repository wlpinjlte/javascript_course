// Logika komponentu
class Counter extends React.Component {
    constructor(props){
        super(props)
        this.state={counter:0,flag:false}
        this.interval=null
        this.setIntervalFunction=this.setIntervalFunction.bind(this)
        this.clearIntervalFunction=this.clearIntervalFunction.bind(this)
    }
    setIntervalFunction(event){
        this.interval=setInterval(()=>{
            this.setState({counter:this.state.counter+=1})
        },1000)
        this.setState({...this.state,flag:true})
    }
    clearIntervalFunction(event){
        clearInterval(this.interval)
        this.interval=null
        this.setState({...this.state,flag:false})
        console.log(this.interval)
    }
    render() {
        return (
            <div style={{padding:"2rem",backgroundColor:"#81B08C",borderRadius:"10px"}}>
                <div>Counter→<span style={{color:"red",fontSize:"2rem"}}>{this.state.counter}</span></div>
                <div style={{display:"flex"}}>
                    <button style={{marginRight:"0.2rem"}} onClick={this.setIntervalFunction} disabled={this.state.flag}>start</button>
                    <button onClick={this.clearIntervalFunction} disabled={!this.state.flag}>stop</button>
                </div>
            </div>
        );
    }
}

class Result extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return<div style={{overflow:"auto",padding:"1rem",backgroundColor:"#DADA5E",borderRadius:"10px"}}>Result:{this.props.result}</div> 
    }
}

class Input extends React.Component {
    constructor(props){
        super(props)
        this.state={iterations:50}
        this.changeHandle=this.changeHandle.bind(this)   
    }
    changeHandle=(e)=>{
        this.setState({iterations:parseInt(e.target.value)})
        this.props.changeIterations(this.state.iterations)
        console.log(this.state)
    }
    render(){
        return <div style={{display:"flex",padding:"1rem",backgroundColor:"#D23838",borderRadius:"10px",marginTop:"1rem"}}>
            <span>Number of iterations</span>
            <input onChange={this.changeHandle} value={this.state.iterations}></input>
            <button onClick={this.props.calculate}>Run calculations</button>
        </div>
    }
}

class Container extends React.Component{
    constructor(props){
        super(props)
        this.state={result:"",iterations:50}
        this.changeIterations=this.changeIterations.bind(this)
        this.calculate=this.calculate.bind(this)
    }

    calculate=()=>{
        this.setState({...this.state,result:calculatePrimes(this.state.iterations)})
    }

    changeIterations=(iterationsToChange)=>{
        console.log(this.state)
        this.setState({...this.state,iterations:iterationsToChange})
    }

    render(){
        return <div style={{display:"flex",marginTop:"1rem",flexDirection:"column",padding:"1rem",backgroundColor:"grey",borderRadius:"10px"}}>
            <Result result={this.state.result}/>
            <Input changeIterations={this.changeIterations} calculate={this.calculate}/>
        </div>
    }
}


const container1 = document.getElementById('root1'); // Pobieranie referencji na kontener
const root1 = ReactDOM.createRoot(container1);       // Tworzenie korzenia React-a dla podanego kontenera
root1.render(<Counter/>);         // Renderowanie komponentu
const container2 = document.getElementById('root2'); // Pobieranie referencji na kontener
const root2 = ReactDOM.createRoot(container2);       // Tworzenie korzenia React-a dla podanego kontenera
root2.render(<Container/>);

function calculatePrimes(iterations) {
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