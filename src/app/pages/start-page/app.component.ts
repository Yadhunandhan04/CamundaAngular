import { Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class StartPage {
  userInput: string = '';
  submittedText: string = '';

  firstButtonClick() {
    alert('First Button Clicked!');
  }

  handleSecondButtonClick() {
    this.submittedText = this.userInput;
  }
}
