import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { StringFormatService } from './services/string-format.service';
import { SessionService } from './services/session.service';
import { BookingStatusPipe } from './pipes/booking-status.pipe';


@NgModule({
  declarations: [ValidationMessageComponent, BookingStatusPipe],
  imports: [
    CommonModule
  ],
  exports: [ValidationMessageComponent, BookingStatusPipe],
  providers: [StringFormatService, SessionService]
})
export class SharedModule { }
