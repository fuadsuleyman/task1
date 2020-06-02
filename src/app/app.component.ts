import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private formBuilder: FormBuilder){}

  task1Form: FormGroup;

  // what value user enter via input
  enteredNumArray: string;

  // we clean non numbers and add here only numbers but number format
  numArrayString;

  // we convert string number array to this number(integer) array
  numArray = [];

  // value of this variable is our final result
  result;

  // getter, we use this in our app.component.html file
  get numbers (){
    return this.task1Form.get('numbers');
  }

  // here i get form value
  ngOnInit(){
    this.task1Form = this.formBuilder.group({
      numbers: ['',[Validators.required]]
    })
  }
  
  // all my solution in this here
  onAddArray(){
    this.result = null;

    // assing value which we get from input
    this.enteredNumArray = this.task1Form.value.numbers;

    // always reset our input
    this.task1Form.reset();

    // this step important too, for next tests we should have empty array
    this.numArrayString = [];

    // with regex we clean non number values
    this.numArrayString = this.enteredNumArray.match(/-?\d+/g);

    // this step important too, for next tests we should have empty array
    this.numArray = [];

    // get our integer array
    for (const num of this.numArrayString) {
      this.numArray.push(+num);
    }
    
    // sort our integer array
    this.numArray.sort(function(a,b){return a - b});

    // here we pass to our new countNumsofRepeated array only count of repeated number in arr
    let counterOfRepeatNums = 0;
    let countNumsofRepeated = [];
    let currentArrValue = null;

        // check for constraints
    if(this.numArray.length > 1000){
      this.result = "You are out of constraints"
    }else{
      for(let i = 0; this.numArray.length > i; i++){
        if(this.numArray[i] < -1000 || this.numArray[i] > 1000){
          this.result = "You are out of constraints"
        }else{
          if(this.numArray[i] !== currentArrValue){
            if(counterOfRepeatNums > 0){
              countNumsofRepeated.push(counterOfRepeatNums);
            }
            currentArrValue = this.numArray[i];
            counterOfRepeatNums = 1;
          }else{
            counterOfRepeatNums++;
          }
        }
      }
      if(counterOfRepeatNums > 0){
        countNumsofRepeated.push(counterOfRepeatNums);
      }
    }
    
    // last part set help as
    const uniqueValues = [...new Set(countNumsofRepeated)];
    // again we check for constraints
    if(this.result === null){
      console.log(`result value ${this.result}`);
      
      // is in 'set-ed' array length equal to our old array this mean all number count is uniq!
      if(countNumsofRepeated.length === uniqueValues.length){
        this.result = true;
      }else {
        this.result = false;
      }
    }
  }
}


