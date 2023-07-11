"use strict";

var expect = chai.expect;

function sum(x,y) {
    return x+y;
}

let sumNumbers=0

let cyfry=(a)=>{
    let oddNumbers=0
    let evenNumbers=0
    for (const i of a){
        if(i>='0' && i<='9'){
            if(parseInt(i)%2==0){
                evenNumbers+=parseInt(i)
            }else{
                oddNumbers+=parseInt(i)
            }
        }
    }
    return [oddNumbers,evenNumbers]
}

let litery=(a)=>{
    let upperLetters=0
    let lowerLetters=0
    for (const i of a){
        if(i>='A' && i<='z'){
            if(i>='A' && i<='Z'){
                upperLetters+=1
            }else{
                lowerLetters+=1
            }
        }
    }
    return [lowerLetters,upperLetters]
}

let suma=(a)=>{
    let toAdd='0'
    for(const i of a){
        if(i>='0' && i<='9'){
            toAdd+=i
        }else{
            break;
        }
    }
    sumNumbers+=parseInt(toAdd)
    // console.log(toAdd)
    return sumNumbers
}

let run=()=>{
    let a=window.prompt()
    while(a!=null){
        console.log("["+cyfry(a)+"] ["+litery(a)+"] "+suma(a))
        a=window.prompt()
    }
}

run()

describe('The sum() function', function() {
    it('Returns 4 for 2+2', function() {
        expect(sum(2,2)).to.equal(4);
    });
    it('Returns 0 for -2+2', function() {
        expect(sum(-2,2)).to.equal(0);
    });
});

describe('The cyfry() function', function() {
    it('Returns [25,20] for 123456789', function() {
        expect(cyfry("123456789")).to.deep.equal([25,20]);
    });
    it('Returns [0,0] for abcABC', function() {
        expect(cyfry("abcABC")).to.deep.equal([0,0]);
    });
    it('Returns [9,12] for abcABC123456', function() {
        expect(cyfry("abcABC123456")).to.deep.equal([9,12]);
    });
    it('Returns [4,2] for 123ABCdabcD', function() {
        expect(cyfry("123ABCdabcD")).to.deep.equal([4,2]);
    });
    it('Returns [0,0] for ""', function() {
        expect(cyfry("")).to.deep.equal([0,0]);
    });
});

describe('The litery() function', function() {
    it('Returns [0,0] for 123456789', function() {
        expect(litery("123456789")).to.deep.equal([0,0]);
    });
    it('Returns [3,3] for abcABC', function() {
        expect(litery("abcABC")).to.deep.equal([3,3]);
    });
    it('Returns [3,3] for abcABC123456', function() {
        expect(litery("abcABC123456")).to.deep.equal([3,3]);
    });
    it('Returns [4,4] for 123ABCdabcD', function() {
        expect(litery("123ABCdabcD")).to.deep.equal([4,4]);
    });
    it('Returns [0,0] for ""', function() {
        expect(litery("")).to.deep.equal([0,0]);
    });
});

sumNumbers=0

describe('The suma() function', function() {
    it('Returns 123456789 for 123456789', function() {
        expect(suma("123456789")).to.equal(123456789);
    });
    it('Returns 123456789 for abcABC', function() {
        expect(suma("abcABC")).to.equal(123456789);
    });
    it('Returns 123456789 for abcABC123456', function() {
        expect(suma("abcABC123456")).to.equal(123456789);
    });
    it('Returns 123456912 for 123ABCdabcD', function() {
        expect(suma("123ABCdabcD")).to.equal(123456912);
    });
    it('Returns 123456912 for ""', function() {
        expect(suma("")).to.equal(123456912);
    });
});