import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';


@NgModule({
  declarations: [
    BookComponent,
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
