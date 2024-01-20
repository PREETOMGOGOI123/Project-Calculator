const mod =  document.getElementById('modulus');
const clearText = document.getElementById('clear');
const allClearText = document.getElementById('all-clear');
const opsList = document.querySelectorAll('.operations');
const numbers = document.querySelectorAll('.numbers');
const result = document.getElementById('equates');
const displayScreen = document.querySelector('.display');

let letsCalculate = true;
let clickCount = 0
let num = '';
let opsValues = '';
let displayEquation = []
let displayVariable = '';
let resultCalc = [];

    function clearString(){
        num = '';
        opsValues = '';
        displayEquation = [];
        displayVariable = '';
        resultCalc = [];
        clickCount = 0;
    }


    function displayText(){
        displayScreen.innerHTML += displayEquation[displayEquation.length-1];   
    }

    
    numbers.forEach(function(numClick){
    numClick.addEventListener('click',function(e){
            e.preventDefault();
            num += e.target.value;
            displayEquation.push(num);
            console.log(displayEquation);
            displayText();
            num = '';    
})
})
    opsList.forEach(function(ops){
        ops.addEventListener('click',function(e){
            e.preventDefault();
            if (displayEquation.length === 0){
                clearString();
            }
            else{
            clickCount++;
            if (clickCount > 1){            
            displayEquation.pop();
            opsValues += ` ${e.target.textContent} `;
            displayEquation.push(opsValues);
            opsValues = '';
            displayText();
            }
            else{
              opsValues += ` ${e.target.textContent} `;
              displayEquation.push(opsValues);
              opsValues='';
            displayText();
            }
        }})
     })
    
  
    result.addEventListener('click',function(e){
        e.preventDefault();
        
       for(let i =0; i<displayEquation.length; i++){
        displayVariable += displayEquation[i];
       }
       console.log(displayVariable);
       displayEquation.push(` = ${eval(displayVariable)}`);
       displayText();
    })

