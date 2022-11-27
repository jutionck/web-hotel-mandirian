import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'form',
    component: BookFormComponent
  },
  {
    path: 'form/:id',
    component: BookFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule { }
