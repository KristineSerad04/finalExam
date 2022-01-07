import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title=  " Calculator Using Angular";
  data = '';
  display: string = '';


  Number(num: string) {

    //Do Not Allow . more than once
    if (num == ".") {
      if (this.data != "") {

        const lastNum = this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }

    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num == "0") {
      if (this.data == "") {
        return;
      }
      const PrevKey = this.data[this.data.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }

    this.data = this.data + num
    this.cal();
  }


  getLastOperand() {
    let  row : number;
    console.log(this.data)
    row = this.data.toString().lastIndexOf("+")
    if (this.data.toString().lastIndexOf("-") > row )  row  = this.data.lastIndexOf("-")
    if (this.data.toString().lastIndexOf("*") > row )  row  = this.data.lastIndexOf("*")
    if (this.data.toString().lastIndexOf("/") >  row )  row  = this.data.lastIndexOf("/")
    console.log('Last ' + this.data.substr( row  + 1))
    return this.data.substr( row  + 1)
  }


  KeyOperator(Operator: string) {

   
    const lastKey = this.data[this.data.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
      return;
    }

    this.data = this.data + Operator
    this.cal();
  }


  

  allClear() {
    this.display= '';
    this.data = '';
  }
  calclear() {
    if (this.data != "") {
      this.data = this.data.substr(0, this.data.length - 1)
    }
  }
  cal() {
    let formula = this.data;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log("Formula " + formula);
    this.display = eval(formula);
  }

  calinput() {
    this.cal();
    this.data = this.display;
    if (this.data == "0") this.data = "";
  }



}
