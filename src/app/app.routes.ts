// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';
import { DmnEditorComponent } from './pages/dmn-editor/dmn-editor.component';
import { StartPage } from './pages/start-page/app.component';

export const routes: Routes = [  // <-- Make sure 'routes' is exported
  { path: '', component: StartPage },
  { path: 'editor', component: EditorComponent },        // Route for <app-editor>
  { path: 'dmn-editor', component: DmnEditorComponent }, // Route for <app-dmn-editor>
  { path: '', redirectTo: '/editor', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
