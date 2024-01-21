const mod =  document.getElementById('modulus');
const clearText = document.getElementById('clear');
const allClearText = document.getElementById('all-clear');
const opsList = document.querySelectorAll('.operations');
const numbers = document.querySelectorAll('.numbers');
const result = document.getElementById('equates');
const displayScreen = document.querySelector('.display');

let letsCalculate = true;
let displayResult;
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
            displayScreen.innerHTML = `<h1> ${displayEquation.join('')}</h1>`;
    }
    
    function inputNumbers(){
                clickCount = 0;
                num += e.target.value;
                displayEquation.push(num);
                console.log(displayEquation);
                num = ''
    }

    //store operators when clicked...
  
    opsList.forEach(function(operators){
        operators.addEventListener('click',function(e){
            e.preventDefault;
            if (letsCalculate==false){

            }
            inputOperators(e);
        })
    })


    function inputOperators(e){
        if(displayEquation.length == 0){
        }
        else if(clickCount == 0){
            if (letsCalculate == false){
                clearString();
                displayEquation.push(`${displayResult}`);
                clickCount++;
                displayEquation.push(` ${e.target.textContent} `);
                displayText();
                letsCalculate = true;
            }
            else{
            clickCount++;
            displayEquation.push(` ${e.target.textContent} `);
             displayText();
        }
    }

        else if(clickCount >= 1){
            displayEquation.pop();
            displayEquation.push(` ${e.target.textContent} `);
            displayText();
            clickCount++;
        }
    }


    /// store the numbers when clicked

    numbers.forEach(function(numClick){
        numClick.addEventListener('click',function(e){
                e.preventDefault();
                inputNum(e);
                
    })
    })

    function inputNum(e){
        if (letsCalculate == false){
            clearString();
            letsCalculate = true;
            clickCount = 0;
            num += e.target.value;
            displayEquation.push(num);
            num = '';
            displayText();
        }
         else{
            clickCount = 0;
            num += e.target.value;
            displayEquation.push(num);
            num = '';
            displayText(); 
    }
    }

    

    clearText.addEventListener('click',function(e){
        e.preventDefault();
        displayEquation.pop();
        displayText();
    })

    allClearText.addEventListener('click',function(e){
        displayEquation = [];
        displayText();
    })

    result.addEventListener('click',function(e){
        let finalResult ='';
        for(let i=0; i<displayEquation.length; i++){
            finalResult +=displayEquation[i];
        }
        displayResult = eval(finalResult);
        displayEquation.push(` = ${displayResult}`);
        displayText();
        letsCalculate = false;
    })