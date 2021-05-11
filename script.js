/**************
TO DO:

Not tested:
1. Get output display to scroll numbers right when exceed display length

**************/

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      clickInput: [0],
      calculatorOutput: [],
      calculatorResults: []
    }
  }
  
  handleNumberClick = event => {
      this.setState(
        {
            clickInput: [...this.state.clickInput, parseInt(event.target.innerText)]
        },
        () => {
            this.validateNumberInput()
        }
      );
  } 
  
  
  componentDidUpdate(prevProps, prevState) {      // reset the calculator after producing results - answer continues with new calculation
    if (prevState.calculatorResults !== this.state.calculatorResults) {
      this.setState(
        {
            clickInput: [this.state.calculatorResults], 
            calculatorOutput: [this.state.calculatorResults],
        });
    };
  }
  

 validateNumberInput = () => {
    if ((this.state.clickInput.indexOf(0) == 0) && (!this.state.clickInput.includes('.'))) { 
      const newArr = [...this.state.clickInput];
      newArr.shift();
      this.setState(
        {
          clickInput: newArr,
          calculatorOutput: [...this.state.calculatorOutput]   // just to confirm this happens
        },
        () => {
           this.fixOutputIssue();
        }
      );
    } else {
      this.setState(
        {
          calculatorOutput: [...this.state.calculatorOutput, parseInt(event.target.innerText)]
        }
      )
    } 
  }
  
  fixOutputIssue = () => {
    if (event.target.innerText == '0') {
      this.setState(
        {
          calculatorOutput: [...this.state.calculatorOutput]      // not strictly necessary just to prove this happens
        }
      )
    } else {
      this.setState(
      {
          calculatorOutput: [...this.state.calculatorOutput, parseInt(event.target.innerText)]  
      }
      )
    }
    
  }
   
  handleDecimalClick = event => {
    this.setState({
      clickInput: [...this.state.clickInput, '.'],
    },
      () => {
          this.validateDecimalInput();
    });
  }
  
  validateDecimalInput = () => {
    const newArr3 = [...this.state.clickInput];
    const newArr4 = newArr3.filter(item => item == '.');
    if (newArr4.length > 1) {
      const newArr2 = [...this.state.clickInput];
      newArr2.pop();
      this.setState({
         clickInput: newArr2,
         calculatorOutput: [...this.state.calculatorOutput]       // not strictly necessary
      })
    } else {
      this.setState({
        calculatorOutput: [...this.state.calculatorOutput, '.']
      })
    }
  }
 
  handleOperatorClick = event => {
    this.setState({
      clickInput: [0],
      calculatorOutput: [...this.state.calculatorOutput, event.target.innerText,]
    });
  }
  
  handleCalculateClick = event => {
    var finishedCalculation = [...this.state.calculatorOutput];
    let numberArray = [];
    var i;
    let numberOne = [];
    let numberTwo = [];
    let operator = '';
    let answer = [];
    var minus = false;
    var minusOne = false;
    for (i = 0; i < finishedCalculation.length; ++i) { // iterate over the final calculator input array
        if ((typeof finishedCalculation[i] == 'number') || finishedCalculation[i] == '.') { // if the element is a number add to number array
              numberArray += finishedCalculation[i];
        } else {    // if the element is an operator 
              if (numberOne == 0) { // if this is the first operator encountered
                  if (numberArray == 0 && finishedCalculation[i] == '-') { // initial operator is minus sign
                      minusOne = true;
                  } else {
                      numberOne = numberArray;
                      numberArray = [];
                      operator = finishedCalculation[i];  
                  }
              } else { // if you already have an operator
                  if (numberArray == 0) { // if this operator directly follows another operator
                      if (finishedCalculation[i] == '-') {
                            minus = true;
                      }
                      else {
                            operator = finishedCalculation[i];
                            minus = false;
                      }
                  }
                  else {   // if there is already a "second number"
                      if (minus == true) {
                            numberArray = numberArray * -1;
                            minus = false;
                      };
                      if (minusOne == true) {
                            numberOne = numberArray * -1;
                            minusOne = false;
                      };
                      numberTwo = numberArray;
                      numberArray = [];
                      switch (operator) {
                            case '+':
                                numberOne = Number(numberOne) + Number(numberTwo);
                                numberTwo = [];
                                operator = finishedCalculation[i];
                                break;
                            case '-':
                                numberOne = Number(numberOne) - Number(numberTwo);
                                numberTwo = [];
                                operator = finishedCalculation[i];
                                break;
                            case '/':
                                numberOne = Number(numberOne) / Number(numberTwo);
                                numberTwo = [];
                                operator = finishedCalculation[i];
                                break;
                            case '*':
                                numberOne = Number(numberOne) * Number(numberTwo);
                                numberTwo = [];
                                operator = finishedCalculation[i];
                                break;
                      }
                     
                   }
                  }
              } 
        }
    
      if (numberArray != [] && numberOne != 0) { // peform the last operation - aka "final if"
        numberTwo = numberArray;
        numberArray = [];
        if (minus == true) {
             numberTwo = numberTwo * -1;
             minus = false;
        };
        if (minusOne == true) {
             numberOne = numberOne * -1;
             minusOne = false;
        }
        switch (operator) {
                    case '+':
                      answer = Number(numberOne) + Number(numberTwo);
                      break;
                    case '-':
                      answer = Number(numberOne) - Number(numberTwo);
                      break;
                    case '/':
                      answer = Number(numberOne) / Number(numberTwo);
                      break;
                    case '*':
                      answer = Number(numberOne) * Number(numberTwo);
                      break;
        }
      } else  if (numberArray != [] && numberOne == 0) { // post numbers without operators directly to the answer without calculating anything
        answer = numberArray;
        numberArray = [];
      }
    this.setState({
        clickInput: answer,
        calculatorOutput: [...this.state.calculatorOutput, '=', answer],
        calculatorResults: answer
    });
}

handleResetClick = event => {
    this.setState({
      clickInput: [0],
      calculatorOutput: []
    });
  }
  
  render() {
    return (
      <div id="calculator">
        <h1>Javascript Calculator</h1>
        <div id="output-display">{this.state.calculatorOutput}</div>
        <div id="display">{this.state.clickInput}</div>
        <div id="button-box">
          <div class="calc-column" id="column-1">
            <div class="calc-row" id="row-1">
              <button class="calc-button" id="clear" onClick={this.handleResetClick}>AC</button>
              <button class="calc-button calc-operator" id="divide" onClick={this.handleOperatorClick}>/</button>
            </div>
            <div class="calc-row" id="row-2">
              <button class="calc-button" id="seven" onClick={this.handleNumberClick}>7</button>
              <button class="calc-button" id="eight" onClick={this.handleNumberClick}>8</button>
              <button class="calc-button" id="nine" onClick={this.handleNumberClick}>9</button>
            </div>
            <div class="calc-row" id="row-3">
              <button class="calc-button" id="four" onClick={this.handleNumberClick}>4</button>
              <button class="calc-button" id="five" onClick={this.handleNumberClick}>5</button>
              <button class="calc-button" id="six" onClick={this.handleNumberClick}>6</button>
            </div>
            <div class="calc-row" id="row-4">
              <button class="calc-button" id="one" onClick={this.handleNumberClick}>1</button>
              <button class="calc-button" id="two" onClick={this.handleNumberClick}>2</button>
              <button class="calc-button" id="three" onClick={this.handleNumberClick}>3</button>
            </div>
            <div class="calc-row" id="row-5">
              <button class="calc-button" id="zero" onClick={this.handleNumberClick}>0</button>
              <button class="calc-button" id="decimal" onClick={this.handleDecimalClick}>.</button>
            </div>
          </div>
          <div class="calc-column" id="column-2">
            <button class="calc-button calc-operator" id="multiply" onClick={this.handleOperatorClick}>*</button>
            <button class="calc-button calc-operator" id="subtract" onClick={this.handleOperatorClick}>-</button>
            <button class="calc-button calc-operator" id="add" onClick={this.handleOperatorClick}>+</button>
            <button class="calc-button" id="equals" onClick={this.handleCalculateClick}>=</button>
          </div>
          
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
