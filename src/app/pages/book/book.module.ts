import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { HotelService } from './service/hotel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BookComponent,
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HotelService]
})
export class BookModule { }
