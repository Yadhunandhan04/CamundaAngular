import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';
import { DmnEditorComponent } from './pages/dmn-editor/dmn-editor.component';
import { StartPage } from './pages/start-page/app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartPage, EditorComponent, DmnEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CamundaAngular - Angular -> @GET Method';
  userInput: string = '';
  submittedText: string = '';
  firstButtonClick() {
    alert('First Button Clicked!');
  }

  handleSecondButtonClick() {
    this.submittedText = this.userInput;
  }
}
