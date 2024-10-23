// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { HttpClientModule } from '@angular/common/http';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule // Import HttpClientModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes'; // Import the routing module
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EditorComponent } from './pages/editor/editor.component';
import { DmnEditorComponent } from './pages/dmn-editor/dmn-editor.component';
import { StartPage } from './pages/start-page/app.component';


@NgModule({
  declarations: [
    AppComponent,
    StartPage,
    EditorComponent,
    DmnEditorComponent
  ],
  imports: [
    BrowserModule,
    StartPage,
    FormsModule,
    AppRoutingModule // Include routing module here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

